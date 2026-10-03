"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Braces, Code2, Eye, TerminalSquare } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const tabs = [
  { id: "code", label: "Code", icon: Code2 },
  { id: "preview", label: "Preview", icon: Eye },
  { id: "terminal", label: "Terminal", icon: TerminalSquare },
] as const;

type WorkspaceTab = (typeof tabs)[number]["id"];

export default function DeveloperWorkspace() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const inView = useInView(workspaceRef, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("code");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { damping: 32, stiffness: 70, mass: 0.6 });
  const y = useSpring(pointerY, { damping: 32, stiffness: 70, mass: 0.6 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 3);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={workspaceRef}
      initial={reduceMotion ? false : { opacity: 0, y: 12, clipPath: "inset(5% 0 0 0)" }}
      animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
      transition={{ duration: reduceMotion ? 0 : 0.64, delay: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="hero-workspace-wrap relative min-w-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="workspace-caption mb-2 flex items-center justify-between px-1 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
        <span>Không gian phát triển / 01</span>
        <span className="inline-flex items-center gap-2"><i aria-hidden="true" className="workspace-caption-dot" />Bản mô phỏng tương tác</span>
      </div>

      <motion.div className="dev-workspace" style={reduceMotion ? undefined : { x, y }}>
        <div className="dev-workspace-titlebar">
          <div className="dev-brand-mark" aria-hidden="true">B</div>
          <div className="dev-title-copy">
            <span className="dev-studio-name">Banana Studio</span>
            <span className="dev-project-name">banana-project</span>
          </div>
          <span className="dev-environment"><i aria-hidden="true" />Development</span>
          <button type="button" className="dev-window-control" aria-label="Tùy chọn cửa sổ">···</button>
        </div>

        <div className="dev-workspace-tabs" role="tablist" aria-label="Chế độ xem không gian phát triển">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`workspace-tab-${id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              aria-controls="workspace-panel"
              onClick={() => setActiveTab(id)}
              className={`dev-workspace-tab ${activeTab === id ? "is-active" : ""}`}
            >
              <Icon size={12} strokeWidth={1.7} />{label}
            </button>
          ))}
          <span className="dev-workspace-tabs-spacer" />
          <span className="dev-workspace-file"><Braces size={11} />TypeScript</span>
        </div>

        <div
          id="workspace-panel"
          role="tabpanel"
          aria-labelledby={`workspace-tab-${activeTab}`}
          className={`dev-workspace-main is-${activeTab}`}
        >
          {activeTab === "code" && <CodeAndPreview />}
          {activeTab === "preview" && <ProductPreview expanded />}
          {activeTab === "terminal" && <TerminalPanel expanded />}
        </div>

        {activeTab !== "terminal" && <TerminalPanel />}

        <div className="dev-workspace-statusbar">
          <span className="dev-status-ready"><i aria-hidden="true" />Giao diện minh họa</span>
          <span className="dev-status-detail">Không kết nối máy chủ</span>
          <span className="dev-status-branch">banana-project / main</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CodeAndPreview() {
  return (
    <div className="dev-workspace-split">
      <section className="dev-code-editor" aria-label="Đoạn mã React minh họa">
        <div className="dev-file-tab"><span className="dev-file-dot" />Product.tsx <span className="dev-file-close">×</span></div>
        <pre className="dev-code"><code>
          <span className="dev-code-line"><i>01</i><span><b>export default function</b> Product() {'{'}</span></span>
          <span className="dev-code-line"><i>02</i><span>  <b>return</b> (</span></span>
          <span className="dev-code-line"><i>03</i><span>    &lt;<em>main</em> className=<strong>&quot;product&quot;</strong>&gt;</span></span>
          <span className="dev-code-line"><i>04</i><span>      &lt;<em>h1</em>&gt;Your idea, realized.&lt;/<em>h1</em>&gt;</span></span>
          <span className="dev-code-line"><i>05</i><span>      &lt;<em>p</em>&gt;Meaningful digital products.&lt;/<em>p</em>&gt;</span></span>
          <span className="dev-code-line"><i>06</i><span>      &lt;<em>button</em>&gt;Get started&lt;/<em>button</em>&gt;</span></span>
          <span className="dev-code-line"><i>07</i><span>    &lt;/<em>main</em>&gt;</span></span>
          <span className="dev-code-line"><i>08</i><span>  );</span></span>
          <span className="dev-code-line"><i>09</i><span>{'}'}</span></span>
        </code></pre>
      </section>
      <ProductPreview />
    </div>
  );
}

function ProductPreview({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className={`dev-product-preview ${expanded ? "is-expanded" : ""}`} aria-label="Bản xem trước sản phẩm minh họa">
      <div className="dev-preview-topbar">
        <span className="dev-preview-mark">B.</span>
        <span className="dev-preview-nav"><i />Tổng quan <i />Dự án <i />Lộ trình</span>
        <span className="dev-preview-user">A</span>
      </div>
      <div className="dev-preview-content">
        <div className="dev-preview-heading">
          <span className="dev-preview-eyebrow">KHÔNG GIAN Ý TƯỞNG / BẢN XEM TRƯỚC</span>
          <h3>Mỗi ý tưởng<br />đều có lộ trình.</h3>
          <p>Một nơi để biến suy nghĩ ban đầu thành điều có thể bắt đầu.</p>
          <button type="button" tabIndex={-1}>Khám phá dự án <span aria-hidden="true">↗</span></button>
        </div>
        <div className="dev-preview-board" aria-hidden="true">
          <div className="dev-preview-board-head"><span>HÀNH TRÌNH SẢN PHẨM</span><span>01 — 03</span></div>
          <svg viewBox="0 0 220 104" role="presentation">
            <path className="dev-chart-grid" d="M0 25H220M0 52H220M0 79H220M44 0V104M88 0V104M132 0V104M176 0V104" />
            <path className="dev-chart-line" d="M5 83 C34 78 35 61 60 65 S89 40 112 47 S147 24 164 35 S194 15 215 13" />
            <circle className="dev-chart-point" cx="164" cy="35" r="3" />
          </svg>
          <div className="dev-preview-steps"><span>Ý tưởng</span><span>Thiết kế</span><span>Sản phẩm</span></div>
        </div>
      </div>
      <div className="dev-preview-cards">
        <div><span>01 / KHÁM PHÁ</span><b>Hiểu vấn đề</b><i>Định hình hướng đi</i></div>
        <div><span>02 / THIẾT KẾ</span><b>Tạo trải nghiệm</b><i>Thử nghiệm luồng dùng</i></div>
        <div><span>03 / PHÁT TRIỂN</span><b>Ra mắt sản phẩm</b><i>Hoàn thiện từng bước</i></div>
      </div>
    </section>
  );
}

function TerminalPanel({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className={`dev-terminal ${expanded ? "is-expanded" : ""}`} aria-label="Terminal minh họa">
      <div className="dev-terminal-heading"><TerminalSquare size={11} /><span>Terminal</span><i>MINH HỌA · KHÔNG PHẢI KẾT QUẢ BUILD THẬT</i></div>
      <div className="dev-terminal-lines">
        <p><b>$</b> npm run build</p>
        <p><span>›</span> Biên dịch thành công <i>·</i> Tối ưu bản dựng <i>·</i> Sẵn sàng triển khai</p>
      </div>
    </section>
  );
}
