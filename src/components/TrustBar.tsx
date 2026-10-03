const CAPABILITIES = ["THIẾT KẾ", "CÔNG NGHỆ", "AI", "TRẢI NGHIỆM", "SẢN PHẨM"];

export default function TrustBar() {
  return (
    <section className="overflow-hidden border-y border-[#deded6] bg-[#fafaf7] py-5" aria-label="Các lĩnh vực">
      <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap text-[clamp(1.2rem,3vw,2rem)] font-medium tracking-[-0.04em] text-[#22231d]">
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} aria-hidden={copy > 0} className="flex items-center gap-6">
            {CAPABILITIES.map((capability) => (
              <span key={`${copy}-${capability}`} className="inline-flex items-center gap-6">
                {capability}
                <span className="h-2 w-2 rounded-full bg-[#e5cc00]" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
