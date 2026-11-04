import Link from "next/link";
import Image from "next/image";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  copies: number;
  image: string;
  description: string;
}

// Fallback curated books in case Express server isn't actively running
const fallbackBooks: Book[] = [
  {
    _id: "preview-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Novel",
    rating: 4.8,
    copies: 5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    description: "A timeless tale of ambition, obsession, and the haunting illusion of the American Dream in the Roaring Twenties."
  },
  {
    _id: "preview-2",
    title: "Dune: Master Chronicles",
    author: "Frank Herbert",
    category: "Sci-Fi",
    rating: 4.9,
    copies: 3,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    description: "An epic masterpiece of politics, religion, ecology, and myth on the harsh desert planet of Arrakis."
  },
  {
    _id: "preview-3",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    rating: 5.0,
    copies: 4,
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?q=80&w=800&auto=format&fit=crop",
    description: "Private stoic reflections of the Roman Emperor on personal virtue, discipline, and emotional sovereignty."
  },
  {
    _id: "preview-4",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    rating: 4.7,
    copies: 2,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    description: "A shocking psychological thriller of a woman’s act of violence against her husband and the therapist obsessed with uncovering her motive."
  }
];

export default async function HomePage() {
  let displayBooks = fallbackBooks;

  try {
    const res = await fetch("http://localhost:8000/books", {
      cache: "no-store",
      // Set short abort signal to prevent long hangs if server is offline
      signal: AbortSignal.timeout(1500),
    });
    if (res.ok) {
      const liveBooks: Book[] = await res.json();
      if (liveBooks && liveBooks.length > 0) {
        displayBooks = liveBooks.slice(0, 4);
      }
    }
  } catch {
    // Graceful fallback to preview books
  }

  return (
    <div className="bg-[#050505] text-white selection:bg-[#e50914] selection:text-white overflow-hidden">

      {/* ======================================================== */}
      {/* 1. HERO SECTION (Lumora Cinematic Header Style) */}
      {/* ======================================================== */}
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


      {/* ======================================================== */}
      {/* 2. PHILOSOPHY & METRICS SECTION (Lumora 'I CREATE' Style) */}
      {/* ======================================================== */}
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


      {/* ======================================================== */}
      {/* 3. SELECTED ARCHIVE (Lumora 'SELECTED WORK' Grid Style) */}
      {/* ======================================================== */}
      <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-900 pb-8">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2">
                02 {"//"} SELECTED ARCHIVE
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                SELECTED BOOKS CRAFTED <br />
                <span className="text-zinc-500">WITH PURPOSE AND DEPTH.</span>
              </h2>
            </div>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full border border-zinc-800 hover:border-red-600/50 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all self-start md:self-auto"
            >
              Browse Full Catalog ({displayBooks.length}+) →
            </Link>
          </div>

          {/* Grid of Books */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {displayBooks.map((book, idx) => (
              <div
                key={book._id}
                className="group flex flex-col bg-[#0d0d10] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#e50914]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(229,9,20,0.15)]"
              >
                {/* Book Image with Aspect Ratio */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-80"></div>

                  {/* Corner Index Number Badge */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-mono text-zinc-400">
                    0{idx + 1}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-bold text-amber-400">
                    ★ {book.rating}
                  </div>

                  {/* Category Pill Over Image Bottom */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-800/60 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">{book.author}</p>

                  <p className="text-xs text-zinc-500 mt-3 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Footer & Details Link */}
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${book.copies > 0 ? "bg-[#e50914]" : "bg-zinc-600"}`}></span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {book.copies > 0 ? `${book.copies} Copies` : "Restocking"}
                      </span>
                    </div>

                    <Link
                      href={book._id.startsWith("preview") ? "/books" : `/books/${book._id}`}
                      className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-[#e50914] transition-colors"
                    >
                      Inspect →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 4. CINEMATIC SHOWCASE BANNER (Lumora Production Camera Style) */}
      {/* ======================================================== */}
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
              className="px-8 py-3.5 bg-[#e50914] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c90812] transition-all shadow-[0_0_30px_rgba(229,9,20,0.5)]"
            >
              Start Reading Now
            </Link>
          </div>
        </div>
      </section>


      {/* ======================================================== */}
      {/* 5. PROCESS WORKFLOW (Lumora 'MAKING PROCESS' Style) */}
      {/* ======================================================== */}
      <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-900 pb-8">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2">
                03 {"//"} BORROWING PROTOCOL
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                STREAMLINED LENDING. <br />
                <span className="text-zinc-500">EFFORTLESS EXPERIENCE.</span>
              </h2>
            </div>
            <p className="text-xs font-mono uppercase text-zinc-500 max-w-xs">
              Built on JWT cryptographic authorization and automated return tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-[#0d0d10] border border-zinc-800/80 hover:border-zinc-700 transition-all">
              <span className="text-4xl font-black text-[#e50914] font-mono">01</span>
              <h3 className="mt-4 text-lg font-bold uppercase text-white tracking-tight">Discover Titles</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                Explore the catalog by genre, rating, and real-time inventory. Inspect detailed synopses before making a choice.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0d0d10] border border-zinc-800/80 hover:border-zinc-700 transition-all">
              <span className="text-4xl font-black text-[#e50914] font-mono">02</span>
              <h3 className="mt-4 text-lg font-bold uppercase text-white tracking-tight">One-Click Borrow</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                Reserve your selected volume instantly. Server securely decrements live stock and binds the book to your account.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0d0d10] border border-zinc-800/80 hover:border-zinc-700 transition-all">
              <span className="text-4xl font-black text-[#e50914] font-mono">03</span>
              <h3 className="mt-4 text-lg font-bold uppercase text-white tracking-tight">14-Day Window</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                Enjoy unrestricted reading access. Automated countdown reminders ensure you never miss your designated return date.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0d0d10] border border-zinc-800/80 hover:border-zinc-700 transition-all">
              <span className="text-4xl font-black text-[#e50914] font-mono">04</span>
              <h3 className="mt-4 text-lg font-bold uppercase text-white tracking-tight">Return &amp; Cycle</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                Return completed books with a single tap. The library copy is instantly replenished for fellow community readers.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 6. FAQ ACCORDION (Lumora 'COMMON QUESTIONS' Style) */}
      {/* ======================================================== */}
      <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#08080a]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">

          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] block mb-2">
              04 {"//"} FREQUENT INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              FIND ANSWERS TO YOUR <br />
              <span className="text-zinc-500">MOST IMPORTANT QUESTIONS.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group border border-zinc-800/90 bg-[#0d0d10] rounded-xl p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-zinc-700 open:bg-[#121216]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold uppercase text-sm md:text-base text-white tracking-wide">
                <span>HOW DOES THE 14-DAY BORROWING PROTOCOL FUNCTION?</span>
                <span className="text-xl text-[#e50914] group-open:rotate-45 transition-transform duration-300 font-mono">+</span>
              </summary>
              <p className="mt-4 text-xs md:text-sm text-zinc-400 leading-relaxed font-light border-t border-zinc-800 pt-4">
                When you borrow a volume, our backend automatically computes a return deadline precisely 14 days from the request timestamp. You can track all active deadlines in your &ldquo;Borrowed Books&rdquo; dashboard.
              </p>
            </details>

            <details className="group border border-zinc-800/90 bg-[#0d0d10] rounded-xl p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-zinc-700 open:bg-[#121216]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold uppercase text-sm md:text-base text-white tracking-wide">
                <span>CAN I BORROW MULTIPLE COPIES OF THE SAME TITLE?</span>
                <span className="text-xl text-[#e50914] group-open:rotate-45 transition-transform duration-300 font-mono">+</span>
              </summary>
              <p className="mt-4 text-xs md:text-sm text-zinc-400 leading-relaxed font-light border-t border-zinc-800 pt-4">
                To guarantee fairness across all members, duplicate borrowing of the same title is restricted while your current checkout is active. You can, however, borrow different distinct titles concurrently.
              </p>
            </details>

            <details className="group border border-zinc-800/90 bg-[#0d0d10] rounded-xl p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-zinc-700 open:bg-[#121216]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold uppercase text-sm md:text-base text-white tracking-wide">
                <span>HOW DO I CONTRIBUTE A NEW WORK TO THE ARCHIVE?</span>
                <span className="text-xl text-[#e50914] group-open:rotate-45 transition-transform duration-300 font-mono">+</span>
              </summary>
              <p className="mt-4 text-xs md:text-sm text-zinc-400 leading-relaxed font-light border-t border-zinc-800 pt-4">
                Registered members can navigate to &ldquo;Add Book&rdquo; in the top navigation bar. Submit the title, author, category, available copies, rating, synopsis, and cover image link to publish it instantly to the global collection.
              </p>
            </details>

            <details className="group border border-zinc-800/90 bg-[#0d0d10] rounded-xl p-6 transition-all [&_summary::-webkit-details-marker]:hidden open:border-zinc-700 open:bg-[#121216]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold uppercase text-sm md:text-base text-white tracking-wide">
                <span>ARE THERE ANY SUBSCRIPTION COSTS OR LATE FEES?</span>
                <span className="text-xl text-[#e50914] group-open:rotate-45 transition-transform duration-300 font-mono">+</span>
              </summary>
              <p className="mt-4 text-xs md:text-sm text-zinc-400 leading-relaxed font-light border-t border-zinc-800 pt-4">
                No. BookNook operates on an open-access philosophy. Membership, borrowing, and contributions are completely free of monetary charge.
              </p>
            </details>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 7. GRAND FINALE / FOOTER (Lumora 'LET'S TELL STORIES' Style) */}
      {/* ======================================================== */}
      <footer className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
        {/* Subtle bottom ember glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(229,9,20,0.12),transparent_70%)] pointer-events-none blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

          <div className="flex items-center gap-3 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#e50914]"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914]">
              05 {"//"} GET INVOLVED
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">
            LET&apos;S EXPAND <br />
            THE LIBRARY<span className="text-[#e50914]">.</span>
          </h2>

          <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <p className="text-xs font-mono uppercase text-zinc-500 mb-2">ARCHIVE INQUIRIES &amp; CURATION</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white hover:text-[#e50914] transition-colors cursor-pointer">
                LUMORA.ARCHIVE@BOOKNOOK.IO
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#e50914] mt-2 font-mono">
                +880 1330 249 20
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-6">
              <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                <span className="hover:text-white transition-colors cursor-pointer">LINKEDIN</span>
                <span className="hover:text-white transition-colors cursor-pointer">YOUTUBE</span>
                <span className="hover:text-white transition-colors cursor-pointer">TWITTER / X</span>
                <span className="hover:text-white transition-colors cursor-pointer">INSTAGRAM</span>
              </div>

              <Link
                href="/books"
                className="px-8 py-3.5 bg-[#e50914] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c90812] transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              >
                Enter Archive
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
            <p>© {new Date().getFullYear()} BOOKNOOK DIGITAL ARCHIVE. ALL RIGHTS RESERVED.</p>
            <p className="uppercase tracking-widest">DESIGN PATTERN: LUMORA CINEMATIC DARK</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
