"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Braces, Check, ChevronDown, Code2, Eye, FileCode2, GitBranch, GitCommitHorizontal, PanelsTopLeft, PenTool, TerminalSquare, Triangle } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const files = ["page.tsx", "Hero.tsx", "globals.css"] as const;
type OpenFile = (typeof files)[number];

export default function DeveloperWorkspace() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.06 });
  const reduceMotion = useReducedMotion();
  const [activeFile, setActiveFile] = useState<OpenFile>("Hero.tsx");
  const [previewMode, setPreviewMode] = useState("Preview");

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduceMotion ? 0 : 0.52, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div ref={stageRef} className="hero-workspace-wrap" aria-label="Không gian phát triển sản phẩm minh họa">
      <svg className="hero-system-lines" viewBox="0 0 1000 660" preserveAspectRatio="none" aria-hidden="true">
        <path className="hero-connector hero-connector-one" d="M22 174 H105 Q125 174 125 194 V226 H240" />
        <path className="hero-connector hero-connector-two" d="M490 80 H600 Q622 80 622 102 V142 H760" />
        <path className="hero-connector hero-connector-three" d="M102 460 H180 Q202 460 202 438 V399 H320" />
        <path className="hero-connector hero-connector-four" d="M710 514 H820 Q842 514 842 492 V455 H965" />
        <circle className="hero-connector-node node-one" cx="240" cy="226" r="3" />
        <circle className="hero-connector-node node-two" cx="760" cy="142" r="3" />
        <circle className="hero-connector-node node-three" cx="320" cy="399" r="3" />
        <circle className="hero-connector-node node-four" cx="965" cy="455" r="3" />
      </svg>

      <motion.div {...reveal(0.12)} className="hero-workflow-note" aria-label="Quy trình ý tưởng đến ra mắt">
        <span>Ý TƯỞNG <i>→</i> THIẾT KẾ</span>
        <span>PHÁT TRIỂN <i>→</i> RA MẮT</span>
        <b>04 CHẶNG / 01 SẢN PHẨM</b>
      </motion.div>

      <motion.section {...reveal(0.2)} className="studio-window ide-window" aria-label="Cửa sổ IDE minh họa">
        <header className="ide-titlebar">
          <div className="ide-window-lights" aria-hidden="true"><i /><i /><i /></div>
          <span className="ide-project-title"><span className="ide-banana-mark">B</span>BananaStudio <i>/</i> banana-project</span>
          <span className="ide-dev-status"><i />Development</span>
          <button className="ide-kebab" type="button" aria-label="Tùy chọn IDE">···</button>
        </header>

        <div className="ide-body">
          <aside className="ide-explorer" aria-label="Danh sách tệp">
            <div className="ide-explorer-heading">EXPLORER <span>···</span></div>
            <div className="ide-folder-root"><ChevronDown size={11} />BANANASTUDIO</div>
            <div className="ide-tree-indent"><div className="ide-tree-row"><ChevronDown size={10} /><span className="tree-folder">src</span></div>
              <div className="ide-tree-indent"><div className="ide-tree-row"><ChevronDown size={10} /><span className="tree-folder">app</span></div><div className="ide-tree-row is-muted"><FileCode2 size={10} /><span>page.tsx</span></div>
                <div className="ide-tree-row"><ChevronDown size={10} /><span className="tree-folder">components</span></div><div className="ide-tree-row is-selected"><FileCode2 size={10} /><span>Hero.tsx</span></div><div className="ide-tree-row is-muted"><FileCode2 size={10} /><span>ProjectCard.tsx</span></div><div className="ide-tree-row"><ChevronDown size={10} /><span className="tree-folder">ui</span></div>
              </div>
              <div className="ide-tree-row"><ChevronDown size={10} /><span className="tree-folder">lib</span></div>
            </div>
            <div className="ide-tree-row ide-root-file"><Braces size={10} /><span>next.config.ts</span></div><div className="ide-tree-row ide-root-file"><Braces size={10} /><span>package.json</span></div>
            <div className="ide-explorer-footer"><GitBranch size={10} /> main <span><GitCommitHorizontal size={10} /> 3</span></div>
          </aside>

          <div className="ide-editor">
            <div className="ide-file-tabs" role="tablist" aria-label="Tệp đang mở">
              {files.map((file) => (
                <button key={file} type="button" role="tab" aria-selected={activeFile === file} className={activeFile === file ? "is-active" : ""} onClick={() => setActiveFile(file)}>
                  {file.endsWith("css") ? <span className="file-css">#</span> : <FileCode2 size={11} />} {file}
                </button>
              ))}
            </div>
            <div className="ide-breadcrumb"><span>src</span><i>/</i><span>{activeFile === "page.tsx" ? "app" : "components"}</span><i>/</i><b>{activeFile}</b><span className="ide-language">TypeScript React</span></div>
            <pre className="ide-code" aria-label="Mã React minh họa"><code>
              <span className="ide-line"><i>01</i><span><em>export default function</em> <b>Hero</b>() {'{'}</span></span>
              <span className="ide-line"><i>02</i><span>  <strong>return</strong> (</span></span>
              <span className="ide-line"><i>03</i><span>    &lt;<b>main</b> className=<mark>&quot;product&quot;</mark>&gt;</span></span>
              <span className="ide-line is-current"><i>04</i><span>      &lt;<b>h1</b>&gt;Nơi hiện thực ý tưởng&lt;/<b>h1</b>&gt;<i className="ide-caret" /></span></span>
              <span className="ide-line"><i>05</i><span>      &lt;<b>Preview</b> project={'{'}project{'}'} /&gt;</span></span>
              <span className="ide-line"><i>06</i><span>      &lt;<b>ProjectCard</b> items={'{'}work{'}'} /&gt;</span></span>
              <span className="ide-line"><i>07</i><span>      &lt;<b>Action</b> href=<mark>&quot;#contact&quot;</mark> /&gt;</span></span>
              <span className="ide-line"><i>08</i><span>    &lt;/<b>main</b>&gt;</span></span>
              <span className="ide-line"><i>09</i><span>  );</span></span>
              <span className="ide-line"><i>10</i><span>{'}'}</span></span>
            </code></pre>
            <div className="ide-statusbar"><span><GitBranch size={10} /> main</span><span>Ln 04, Col 32</span><span>UTF-8</span><span>TypeScript JSX</span></div>
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal(0.34)} className={`studio-window live-preview-window preview-${previewMode.toLowerCase()}`} aria-label="Live Preview minh họa">
        <header className="preview-titlebar">
          <div className="preview-window-icon"><PanelsTopLeft size={13} /></div><strong>Live Preview</strong><span className="preview-url">bananastudio.vn</span><span className="preview-live"><i />LIVE</span>
        </header>
        <div className="preview-toolbar" role="tablist" aria-label="Chế độ preview">
          {["Preview", "Design", "Mobile"].map((mode) => <button key={mode} type="button" role="tab" aria-selected={previewMode === mode} className={previewMode === mode ? "is-active" : ""} onClick={() => setPreviewMode(mode)}>{mode}</button>)}
          <span><Eye size={11} /> 100%</span>
        </div>
        <div className="preview-page">
          <nav className="preview-nav"><span className="preview-logo">B<span>.</span></span><span>Dự án&nbsp;&nbsp;&nbsp; Studio&nbsp;&nbsp;&nbsp; Liên hệ</span><span className="preview-nav-cta">Bắt đầu <ArrowUpRight size={9} /></span></nav>
          <div className="preview-hero-content"><small>THIẾT KẾ · PHÁT TRIỂN · SẢN PHẨM</small><h3>Nơi hiện thực<br />ý tưởng của bạn<span>.</span></h3><p>Những sản phẩm số hữu ích, bắt đầu từ một ý tưởng tốt.</p><button type="button" tabIndex={-1}>Khám phá dự án <ArrowUpRight size={9} /></button></div>
          <div className="preview-project-art" aria-hidden="true"><div className="preview-art-orbit" /><div className="preview-art-frame"><span>01 / DIGITAL PRODUCT</span><b>Ý tưởng<br />thành hình.</b><i>PRODUCT SYSTEM&nbsp;&nbsp; 2026</i></div><div className="preview-art-index">BANANA STUDIO&nbsp; — &nbsp;001</div></div>
          <div className="preview-page-foot"><span>01 / 04</span><span>THIẾT KẾ CÓ CHỦ ĐÍCH</span></div>
        </div>
      </motion.section>

      <motion.section {...reveal(0.46)} className="studio-window terminal-window" aria-label="Terminal minh họa, không phải phiên chạy thật">
        <header className="floating-window-heading"><TerminalSquare size={13} /><strong>TERMINAL</strong><span>CHỈ LÀ BẢN MÔ PHỎNG</span></header>
        <div className="terminal-lines"><p><i>PS</i> D:\STARTUP\studio&gt; <b>npm run dev</b></p><p><span>&gt;</span> banana-studio@1.0.0 dev</p><p><span>&gt;</span> next dev</p><p className="terminal-ready"><Check size={11} /> Ready in 1.8s <span>Local: localhost:3000</span></p></div>
      </motion.section>

      <motion.section {...reveal(0.56)} className="studio-window deploy-window" aria-label="Trạng thái triển khai minh họa, không phải deployment thực tế">
        <header className="deploy-heading"><div><Triangle size={13} fill="currentColor" /><strong>Deploy to Vercel</strong></div><span>BẢN MÔ PHỎNG</span></header>
        <ul><li><Check size={11} />Build completed</li><li><Check size={11} />Deploying...</li><li><Check size={11} />Production ready</li></ul>
        <button type="button" disabled title="Chưa kết nối website production">View Live Site <ArrowUpRight size={11} /></button>
      </motion.section>

      <motion.div {...reveal(0.66)} className="hero-toolset" aria-label="Công cụ thiết kế và phát triển">
        <span className="toolset-label">CÔNG CỤ</span><span><PenTool size={12} />Figma</span><span><Code2 size={12} />Code</span><span><GitBranch size={12} />Git</span><span><Triangle size={11} />Vercel</span>
      </motion.div>

      <div className="hero-handnote handnote-one" aria-hidden="true">ý tưởng<br />→ sản phẩm</div>
      <div className="hero-handnote handnote-two" aria-hidden="true">từng chi tiết<br />đều có lý do</div>
    </div>
  );
}
