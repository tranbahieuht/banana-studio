import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryChapter from "@/components/CaseStudyClientInteractive";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((item) => item.id === id);

  if (!project) return { title: "Không tìm thấy concept" };

  return {
    title: `${project.title} — Concept sản phẩm`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) notFound();

  const nextProject = PROJECTS.find((item) => item.id === project.nextProjectId) ?? PROJECTS[0];

  return (
    <div className="product-site min-h-screen overflow-hidden bg-[#fafaf7] text-[#171814]">
      <Navbar />
      <main>
        <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-36 sm:px-10 lg:min-h-[88svh] lg:px-16 lg:pb-24">
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <Link
              href="/#work"
              className="mb-12 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#8e8a83] transition-colors hover:text-[#f3efe6]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Trở lại các concept
            </Link>
            <div className="mb-5 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em]">
              <span className="text-[#d4af37]">{project.number}</span>
              <span className="text-white/20">/</span>
              <span className="text-[#8e8a83]">Bản concept</span>
              <span className="text-white/20">/</span>
              <span className="text-[#8e8a83]">{project.category}</span>
            </div>
            <h1 className="max-w-5xl text-display text-[#f3efe6]">{project.title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#8e8a83] sm:text-lg">
              {project.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16 lg:pb-36">
          <StoryChapter
            number="01"
            eyebrow="BÀI TOÁN"
            title="Mọi trải nghiệm đều bắt đầu bằng một câu hỏi."
            body={`${project.prompt} ${project.friction}`}
            index={0}
          />
          <StoryChapter
            number="02"
            eyebrow="Ý TƯỞNG"
            title="Tìm một cách tiếp cận vừa đủ rõ."
            body={project.idea}
            index={1}
          />
          <StoryChapter
            number="03"
            eyebrow="TRẢI NGHIỆM"
            title="Để mỗi bước tiếp theo trở nên tự nhiên."
            body={project.experience}
            index={2}
          />
          <section className="border-t border-white/[0.08] py-16 lg:py-24" aria-labelledby="system-title">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37]">
                  04 / CẤU TRÚC
                </p>
                <h2 id="system-title" className="text-3xl font-medium tracking-tight sm:text-4xl">
                  Từ một ý tưởng thành một hệ thống.
                </h2>
              </div>
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {project.system.map((layer, index) => (
                  <div key={layer.layer} className="grid grid-cols-[3rem_1fr] gap-4 py-5 sm:grid-cols-[4rem_1fr]">
                    <span className="font-mono text-xs text-[#d4af37]">0{index + 1}</span>
                    <div>
                      <h3 className="text-base font-medium text-[#f3efe6]">{layer.layer}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#8e8a83]">{layer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-col justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#8e8a83]">
                Tiếp tục khám phá
              </p>
              <h2 className="text-2xl font-medium text-[#f3efe6]">{nextProject.title}</h2>
            </div>
            <Link
              href={`/work/${nextProject.id}`}
              className="group inline-flex items-center gap-2 border-b border-[#d4af37]/40 pb-2 text-xs font-mono uppercase tracking-[0.12em] text-[#d4af37] transition-colors hover:border-[#d4af37] hover:text-[#f3efe6]"
            >
              Xem concept tiếp theo
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
