import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DEFAULT_CONTACT_EMAIL = "bananagroup3108@gmail.com";

const BUDGET_OPTIONS = new Set([
  "Đã có ngân sách",
  "Đang xác định",
  "Muốn trao đổi thêm",
]);

const TIMELINE_OPTIONS = new Set([
  "Muốn bắt đầu sớm",
  "Trong vài tháng tới",
  "Đang tìm hiểu",
  "Linh hoạt",
]);

type ContactInput = {
  name: string;
  email: string;
  organization: string;
  message: string;
  budget: string;
  timeline: string;
};

type RateEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateEntry>();

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return jsonError("unsupported_media_type", "Yêu cầu cần được gửi ở định dạng JSON.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonError("payload_too_large", "Nội dung gửi vượt quá giới hạn cho phép.", 413);
  }

  const bodyResult = await readLimitedBody(request, MAX_BODY_BYTES);
  if (bodyResult === "too-large") {
    return jsonError("payload_too_large", "Nội dung gửi vượt quá giới hạn cho phép.", 413);
  }
  if (bodyResult === null) {
    return jsonError("invalid_request", "Không thể đọc nội dung yêu cầu.", 400);
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyResult);
  } catch {
    return jsonError("invalid_json", "Nội dung yêu cầu không hợp lệ.", 400);
  }

  if (!isRecord(body)) {
    return jsonError("invalid_request", "Nội dung yêu cầu không hợp lệ.", 400);
  }

  const honeypot = body.website;
  if (honeypot) {
    return jsonError("invalid_submission", "Yêu cầu không hợp lệ.", 400);
  }

  const inputResult = parseContactInput(body);
  if ("error" in inputResult) {
    return jsonError("invalid_request", "Vui lòng kiểm tra lại các trường đã nhập.", 400);
  }

  const ip = getClientIp(request);
  const rate = consumeRateLimit(ip, Date.now());
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: "rate_limited", message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
  if (!apiKey || !from) {
    return jsonError("email_service_unavailable", "Dịch vụ email chưa được cấu hình.", 503);
  }

  const receivedAt = new Date();
  const safeNameForSubject = inputResult.name.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  const email = buildEmail(inputResult, receivedAt);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inputResult.email,
        subject: `[Banana Studio] Yêu cầu dự án mới từ ${safeNameForSubject}`,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Resend rejected an email request", response.status);
      return jsonError("email_send_failed", "Chưa thể gửi lời nhắn lúc này.", 502);
    }

    return NextResponse.json({ success: true, message: "Lời nhắn đã được gửi." }, { status: 200 });
  } catch {
    console.error("[contact] Resend request failed");
    return jsonError("email_send_failed", "Chưa thể gửi lời nhắn lúc này.", 502);
  }
}

async function readLimitedBody(request: Request, maxBytes: number): Promise<string | "too-large" | null> {
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return "too-large";
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

function parseContactInput(body: Record<string, unknown>): ContactInput | { error: true } {
  const name = optionalText(body.name, 120);
  const email = optionalText(body.email, 254)?.toLowerCase();
  const organization = optionalText(body.organization, 160) ?? "";
  const message = optionalText(body.message, 5_000);
  const budget = optionalText(body.budget, 80) ?? "Chưa xác định";
  const timeline = optionalText(body.timeline, 80) ?? "Linh hoạt";

  if (!name || !email || !message) return { error: true };
  if (!isEmail(email)) return { error: true };
  if (typeof body.name !== "string" || body.name.trim().length > 120) return { error: true };
  if (typeof body.email !== "string" || body.email.trim().length > 254) return { error: true };
  if (body.organization !== undefined && typeof body.organization !== "string") return { error: true };
  if (typeof body.organization === "string" && body.organization.trim().length > 160) return { error: true };
  if (typeof body.message !== "string" || body.message.trim().length > 5_000) return { error: true };
  if (body.budget !== undefined && typeof body.budget !== "string") return { error: true };
  if (typeof body.budget === "string" && body.budget.trim() && !BUDGET_OPTIONS.has(body.budget.trim())) return { error: true };
  if (body.timeline !== undefined && typeof body.timeline !== "string") return { error: true };
  if (typeof body.timeline === "string" && body.timeline.trim() && !TIMELINE_OPTIONS.has(body.timeline.trim())) return { error: true };

  return { name, email, organization, message, budget, timeline };
}

function optionalText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) return undefined;
  return normalized;
}

function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getClientIp(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 80);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded?.slice(0, 80) || "unknown";
}

function consumeRateLimit(ip: string, now: number) {
  let entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  entry.count += 1;
  rateLimitStore.set(ip, entry);

  if (rateLimitStore.size > 5_000) {
    for (const [key, value] of rateLimitStore) {
      if (value.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  return {
    allowed: entry.count <= RATE_LIMIT_MAX,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1_000)),
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function buildEmail(input: ContactInput, receivedAt: Date) {
  const formatValue = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");
  const receivedAtText = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(receivedAt);
  const rows = [
    ["Tên khách hàng", input.name],
    ["Email khách hàng", input.email],
    ["Tổ chức / thương hiệu", input.organization || "Chưa cung cấp"],
    ["Nội dung dự án", input.message],
    ["Ngân sách dự kiến", input.budget],
    ["Thời điểm triển khai", input.timeline],
    ["Thời điểm gửi yêu cầu", receivedAtText],
  ];

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="width:190px;padding:14px 16px;border-bottom:1px solid #e8e8e2;color:#6b6c64;font:600 12px Arial,sans-serif;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #e8e8e2;color:#171814;font:14px/1.65 Arial,sans-serif;vertical-align:top;overflow-wrap:anywhere">${formatValue(value)}</td>
    </tr>`).join("");

  const text = rows.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  const html = `<!doctype html>
  <html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:32px 12px;background:#f4f4ef;color:#171814;font-family:Arial,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:720px;margin:0 auto;border:1px solid #e2e2da;background:#fff;border-collapse:collapse">
      <tr><td style="padding:26px 28px;background:#171814;color:#f7f7f3">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#f0db3b">Banana Studio · Contact</div>
        <h1 style="margin:12px 0 0;font-size:24px;line-height:1.2;font-weight:600">Yêu cầu dự án mới</h1>
      </td></tr>
      <tr><td style="padding:22px 28px 8px;color:#64655e;font-size:13px;line-height:1.6">Bạn vừa nhận được lời nhắn mới từ biểu mẫu liên hệ.</td></tr>
      <tr><td style="padding:8px 16px 24px">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${htmlRows}</table>
      </td></tr>
      <tr><td style="padding:16px 28px;border-top:1px solid #e8e8e2;color:#85867d;font-size:11px">Banana Studio · bananagroup3108@gmail.com</td></tr>
    </table>
  </body></html>`;

  return { html, text };
}

function jsonError(error: string, message: string, status: number) {
  return NextResponse.json({ success: false, error, message }, { status });
}
