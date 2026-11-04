import Link from "next/link";
import HeroSlider from "./HeroSlider";

interface BookItem {
  _id: string;
}

export default async function Hero() {
  let bookCount: number | null = null;

  try {
    const res = await fetch("http://localhost:8000/books", {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });
    if (res.ok) {
      const data: BookItem[] = await res.json();
      if (Array.isArray(data)) {
        bookCount = data.length;
      }
    }
  } catch {
    // Database offline fallback
  }

  return (
    <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 border-b border-zinc-900 overflow-hidden">
      {/* Subtle Atmospheric Red Radial Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.14),transparent_70%)] pointer-events-none blur-3xl"></div>

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

        {/* 2-Column Main Section: Text on Left, Swiper Slider on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Big Display Headline & CTAs */}
          <div className="lg:col-span-7">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#e50914] mb-3">
              BOOKNOOK LITERARY EDITIONS
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] font-sans">
              MISTER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-500">
                BOOKNOOK
              </span>
            </h1>

            <p className="mt-8 text-base md:text-lg text-zinc-400 max-w-xl font-light leading-relaxed">
              A neighbourhood online library for avid readers. Explore our curated archive, borrow books for your reading journey, and contribute titles from your personal shelf.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/books"
                className="px-8 py-4 bg-[#e50914] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c90812] transition-all duration-300 shadow-[0_0_30px_rgba(229,9,20,0.45)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] hover:scale-105 cursor-pointer"
              >
                Explore All Books
              </Link>
              <Link
                href="/add-book"
                className="px-8 py-4 bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              >
                Contribute a Book
              </Link>
            </div>
          </div>

          {/* Right Column: Swiper.js Carousel Slider */}
          <div className="lg:col-span-5 w-full">
            <HeroSlider />
          </div>

        </div>

        {/* Curated Genres Ribbon (Meaningful Library Categories) */}
        <div className="mt-20 pt-10 border-t border-zinc-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-bold">
              EXPLORE BY POPULAR GENRES &amp; DISCIPLINES
            </p>
            <Link
              href="/books"
              className="text-[11px] font-mono uppercase tracking-widest text-[#e50914] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Browse All Categories</span>
              <span>→</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-75 hover:opacity-100 transition-opacity">
            <Link href="/books" className="text-lg md:text-xl font-serif font-black tracking-widest text-zinc-300 hover:text-[#e50914] transition-colors">
              NOVELS &amp; FICTION
            </Link>
            <Link href="/books" className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-300 hover:text-[#e50914] transition-colors">
              PHILOSOPHY
            </Link>
            <Link href="/books" className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-300 hover:text-[#e50914] transition-colors">
              PSYCHOLOGY
            </Link>
            <Link href="/books" className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-300 hover:text-[#e50914] transition-colors">
              SCI-FI &amp; FUTURES
            </Link>
            <Link href="/books" className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-300 hover:text-[#e50914] transition-colors">
              MYSTERY &amp; THRILLERS
            </Link>
            <Link href="/books" className="text-lg md:text-xl font-serif font-bold tracking-widest text-zinc-300 hover:text-[#e50914] transition-colors">
              CLASSIC LITERATURE
            </Link>
          </div>
        </div>

        {/* Real Library Metrics & Community Pledge Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-zinc-900 pt-10">
          <div className="border-l border-zinc-900 pl-6">
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">
              {bookCount !== null ? bookCount : "20"}<span className="text-[#e50914]">{bookCount !== null ? "" : "+"}</span>
            </p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-mono">
              {bookCount !== null ? "Live Registered Books" : "Archived Volumes"}
            </p>
          </div>
          <div className="border-l border-zinc-900 pl-6">
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">12<span className="text-[#e50914]">+</span></p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-mono">Curated Genres</p>
          </div>
          <div className="border-l border-zinc-900 pl-6">
            <p className="text-4xl lg:text-5xl font-black text-white tracking-tight">100<span className="text-[#e50914]">%</span></p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-mono">Free Community Lending</p>
          </div>
          <div className="border-l border-zinc-900 pl-6 flex flex-col justify-between">
            <p className="text-xs text-zinc-400 italic leading-relaxed">
              &ldquo;A neighbourhood library on the web: share books from your shelf, explore timeless titles, and borrow with a single click.&rdquo;
            </p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-3 font-mono">
              — BOOKNOOK COMMUNITY PLEDGE
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

//✓✓✓