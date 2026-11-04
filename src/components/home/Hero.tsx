import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 border-b border-zinc-900 overflow-hidden">
      {/* Subtle Atmospheric Red Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.14),transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Top Tagline Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"></span>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              CURATED ARCHIVE <span className="text-[#e50914]">{"//"}</span> DIGITAL LIBRARY
            </p>
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            TIMELESS STORIES. ZERO NOISE. FREE LENDING.
          </p>
        </div>

        {/* Big Lumora Display Headline */}
        <div className="max-w-5xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#e50914] mb-3">
            BOOKNOOK LITERARY EDITIONS
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] font-sans">
            MISTER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-500">
              BOOKNOOK
            </span>
          </h1>

          <p className="mt-8 text-base md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
            An uncompromising digital sanctuary for avid readers. Explore rare editions, borrow timeless titles, and catalog your literary journey in cinematic clarity.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/books"
              className="px-8 py-4 bg-[#e50914] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c90812] transition-all duration-300 shadow-[0_0_30px_rgba(229,9,20,0.45)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] hover:scale-105"
            >
              Explore All Books
            </Link>
            <Link
              href="/add-book"
              className="px-8 py-4 bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-all duration-300"
            >
              Contribute a Book
            </Link>
          </div>
        </div>

        {/* Publishers / Heritage Brand Ticker */}
        <div className="mt-20 pt-10 border-t border-zinc-900">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-6 font-mono">
            CURATING EDITIONS FROM RENOWNED HOUSES
          </p>
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-60 grayscale hover:grayscale-0 transition-opacity">
            <span className="text-lg md:text-xl font-serif font-black tracking-widest text-zinc-400">PENGUIN CLASSICS</span>
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-400">HARPERCOLLINS</span>
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-400">OXFORD PRESS</span>
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-400">SIMON &amp; SCHUSTER</span>
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-400">VINTAGE BOOKS</span>
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-400">MACMILLAN</span>
          </div>
        </div>

        {/* Metrics & Critic Quote Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-zinc-900 pt-10">
          <div className="border-l border-zinc-900 pl-6">
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">50<span className="text-[#e50914]">+</span></p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-mono">Archived Editions</p>
          </div>
          <div className="border-l border-zinc-900 pl-6">
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">08<span className="text-[#e50914]">+</span></p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-mono">Literary Genres</p>
          </div>
          <div className="border-l border-zinc-900 pl-6">
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">14<span className="text-[#e50914]">D</span></p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-mono">Lending Window</p>
          </div>
          <div className="border-l border-zinc-900 pl-6 flex flex-col justify-between">
            <p className="text-xs text-zinc-400 italic leading-relaxed">
              &ldquo;BookNook elevates reading into a high-art, distraction-free sensory experience.&rdquo;
            </p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-3 font-mono">
              — MARCUS R. CHEN, CURATOR
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

