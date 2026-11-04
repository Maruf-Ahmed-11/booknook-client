import Link from "next/link";

export default function CurationPhilosophy() {
  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#08080a]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914]">
            01 {"//"} CURATION PHILOSOPHY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Statement text with highlight words */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              WE PRESERVE <span className="text-zinc-600">STORIES THAT SPARK AUTHENTIC EMOTIONS, CRITICAL THINKING, AND VISIONARY THOUGHTS.</span>
              {" "}TIMELESS LITERATURE <span className="text-zinc-600">THAT AWAKENS THE BOUNDLESS DEPTH OF HUMAN IMAGINATION.</span>
            </h2>

            <p className="mt-8 text-zinc-400 font-light leading-relaxed max-w-xl text-sm md:text-base">
              Every title admitted into the BookNook index passes through strict criteria of depth, influence, and literary longevity. No commercial filler—only work that alters your perception.
            </p>

            <div className="mt-8">
              <Link
                href="/books"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-white hover:text-[#e50914] transition-colors group"
              >
                <span>Discover Curated Titles</span>
                <span className="text-base text-[#e50914] group-hover:translate-x-1.5 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Red Progress Bars (Lumora Skills/Stats Pattern) */}
          <div className="lg:col-span-5 space-y-6 bg-[#0d0d10] p-8 rounded-2xl border border-zinc-800/80">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 border-b border-zinc-800 pb-3">
              COLLECTION PURITY RATINGS
            </h3>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase mb-2">
                <span className="text-zinc-300">Literary Fiction &amp; Classics</span>
                <span className="text-[#e50914] font-bold">96%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#e50914] w-[96%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase mb-2">
                <span className="text-zinc-300">Philosophy &amp; Political Thought</span>
                <span className="text-[#e50914] font-bold">92%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#e50914] w-[92%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase mb-2">
                <span className="text-zinc-300">Sci-Fi &amp; Speculative Futures</span>
                <span className="text-[#e50914] font-bold">94%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#e50914] w-[94%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase mb-2">
                <span className="text-zinc-300">Historical Archives &amp; Biography</span>
                <span className="text-[#e50914] font-bold">89%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#e50914] w-[89%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase mb-2">
                <span className="text-zinc-300">Psychology &amp; Deep Narratives</span>
                <span className="text-[#e50914] font-bold">95%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#e50914] w-[95%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

