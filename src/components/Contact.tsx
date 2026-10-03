"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface FormData {
  name: string;
  email: string;
  organization: string;
  message: string;
  budget: string;
  timeline: string;
}

const BUDGET_OPTIONS = [
  "Đã có ngân sách",
  "Đang xác định",
  "Muốn trao đổi thêm",
];

const TIMELINE_OPTIONS = [
  "Muốn bắt đầu sớm",
  "Trong vài tháng tới",
  "Đang tìm hiểu",
  "Linh hoạt",
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [honeypot, setHoneypot] = useState("");
  const submittingRef = useRef(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên của bạn";
    else if (formData.name.trim().length > 120) newErrors.name = "Tên tối đa 120 ký tự";
    if (!formData.email.trim() || formData.email.trim().length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(formData.email.trim())) {
      newErrors.email = "Vui lòng nhập email hợp lệ";
    }
    if (formData.organization.trim().length > 160) newErrors.organization = "Tên tổ chức tối đa 160 ký tự";
    if (!formData.message.trim()) newErrors.message = "Hãy cho chúng tôi biết đôi chút về ý tưởng";
    else if (formData.message.trim().length > 5_000) newErrors.message = "Nội dung tối đa 5.000 ký tự";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      const data: unknown = await res.json();

      if (!res.ok || !isSuccessResponse(data)) throw new Error("Contact request failed");

      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) {
      setErrors((p) => ({ ...p, [field]: undefined }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      organization: "",
      message: "",
      budget: "",
      timeline: "",
    });
    setStatus("idle");
    setHoneypot("");
  };

  return (
    <section id="contact" className="section-divider py-24 lg:py-36" aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <motion.div
            ref={ref}
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.01 : 0.68, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#4a4845] mb-6 font-mono">
              CÙNG BẮT ĐẦU
            </p>
            <h2 id="contact-title" className="text-title text-[#f0ede8] mb-6">
              Cùng nói về
              <br />
              ý tưởng của bạn.
            </h2>
            <p className="text-[#888580] text-sm leading-relaxed mb-10 max-w-sm">
              Hãy kể điều bạn đang nghĩ tới — dù mới chỉ là một câu hỏi. Chúng tôi sẽ đọc và phản hồi
              qua email bạn cung cấp.
            </p>

            <div className="space-y-6">
              <div>
                <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4845]">EMAIL</p>
              <a
                  href="mailto:bananagroup3108@gmail.com"
                  className="text-sm text-[#f0ede8] hover:text-[#c9b99a] transition-colors duration-200 link-underline font-mono"
                >
                  bananagroup3108@gmail.com
                </a>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4845]">STUDIO</p>
                <p className="text-sm text-[#888580]">Việt Nam</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4845]">TRAO ĐỔI TRỰC TIẾP</p>
                <a
                  href="mailto:bananagroup3108@gmail.com"
                  className="text-xs font-mono text-[#8e8a83] transition-colors hover:text-[#c9b99a]"
                >
                  bananagroup3108@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reduceMotion ? 0.01 : 0.72, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === "success" ? (
              <SuccessState onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Tên"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tên của bạn"
                    value={formData.name}
                    onChange={(v) => handleChange("name", v)}
                    error={errors.name}
                    required
                    maxLength={120}
                  />
                  <FormField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ten@email.com"
                    value={formData.email}
                    onChange={(v) => handleChange("email", v)}
                    error={errors.email}
                    required
                    maxLength={254}
                  />
                </div>

                {/* Company */}
                <FormField
                  label="Tổ chức / thương hiệu"
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Không bắt buộc"
                  value={formData.organization}
                  onChange={(v) => handleChange("organization", v)}
                  error={errors.organization}
                  maxLength={160}
                />

                {/* Project */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-[0.15em] text-[#888580] mb-2 font-mono"
                  >
                    Bạn đang nghĩ tới điều gì? <span className="text-[#c9b99a]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={5_000}
                    required
                    placeholder="Kể về ý tưởng, người sẽ sử dụng hoặc điểm bạn muốn thay đổi..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 text-sm text-[#f0ede8] placeholder-[#4a4845] focus:outline-none focus:border-[#c9b99a]/50 resize-none transition-colors duration-200 ${
                      errors.message ? "border-red-500/50" : "border-white/[0.08]"
                    }`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#888580] mb-2 font-mono">
                    Ngân sách
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((option) => (
                          <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("budget", option)}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                          formData.budget === option
                            ? "border-[#c9b99a]/60 bg-[#c9b99a]/15 text-[#f0ede8]"
                            : "border-white/[0.08] text-[#888580] hover:border-white/[0.15] hover:text-[#f0ede8]"
                            }`}
                            aria-pressed={formData.budget === option}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#888580] mb-2 font-mono">
                    Thời điểm dự kiến
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("timeline", option)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                          formData.timeline === option
                            ? "border-[#c9b99a]/60 bg-[#c9b99a]/15 text-[#f0ede8]"
                            : "border-white/[0.08] text-[#888580] hover:border-white/[0.15] hover:text-[#f0ede8]"
                          }`}
                          aria-pressed={formData.timeline === option}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  data-contact-submit
                  disabled={status === "submitting"}
                  className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-medium text-[#0c0c0c] bg-[#f0ede8] rounded-full hover:bg-[#e8d9c4] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  aria-describedby="submit-status"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-[#0c0c0c]/30 border-t-[#0c0c0c] animate-spin" />
                      Đang gửi lời nhắn...
                    </>
                  ) : (
                    <>
                      Gửi lời nhắn
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p id="submit-status" className="text-xs text-red-400 text-center" role="alert">
                    Chưa thể gửi lời nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua{" "}
                    <a href="https://zalo.me/0967586587" target="_blank" rel="noreferrer" className="underline underline-offset-4">Zalo</a>.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  maxLength: number;
}

function isSuccessResponse(value: unknown): value is { success: true } {
  return typeof value === "object" && value !== null && "success" in value && value.success === true;
}

function FormField({ label, id, name, type, placeholder, value, onChange, error, required, maxLength }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.15em] text-[#888580] mb-2 font-mono"
      >
        {label}
        {required && <span className="text-[#c9b99a] ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 text-sm text-[#f0ede8] placeholder-[#4a4845] focus:outline-none focus:border-[#c9b99a]/50 transition-colors duration-200 ${
          error ? "border-red-500/50" : "border-white/[0.08]"
        }`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center h-full py-12 px-6 text-center border border-white/[0.08] rounded-2xl bg-[#111111]"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
        <CheckCircle size={22} className="text-emerald-400" />
      </div>

      <h3 className="text-2xl font-medium text-[#f0ede8] mb-2 tracking-tight">
        Đã gửi thành công!
      </h3>

      <p className="text-sm text-[#888580] max-w-sm leading-relaxed mb-6">
        Banana Studio sẽ liên hệ với bạn sớm nhất có thể.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#888580] hover:text-[#f0ede8] transition-colors"
      >
        <RotateCcw size={12} />
        <span>Gửi lời nhắn khác</span>
      </button>
    </motion.div>
  );
}
