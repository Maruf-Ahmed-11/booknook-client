import Link from "next/link";

export default function LiteraryPromise() {
  return (
    <section className="relative py-28 md:py-40 bg-[#08080a] border-b border-zinc-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 text-center">
        <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#e50914] mb-6">
          {"//"} THE LITERARY PROMISE
        </span>
        <blockquote className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight font-sans">
          &ldquo;A READER LIVES A THOUSAND LIVES BEFORE HE DIES. THE MAN WHO NEVER READS LIVES ONLY ONE.&rdquo;
        </blockquote>
        <p className="mt-6 text-xs md:text-sm uppercase tracking-widest text-zinc-400 font-mono">
          — GEORGE R.R. MARTIN {"//"} AUTHOR &amp; WORLD-BUILDER
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/books"
            className="px-8 py-3.5 bg-[#e50914] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c90812] transition-all shadow-[0_0_30px_rgba(229,9,20,0.5)] cursor-pointer"
          >
            Start Reading Now
          </Link>
        </div>
      </div>
    </section>
  );
}

//✓✓✓