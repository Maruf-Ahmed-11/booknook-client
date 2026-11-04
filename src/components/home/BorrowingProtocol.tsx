export default function BorrowingProtocol() {
  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-900 pb-8">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2">
              03 {"//"} BORROWING PROTOCOL
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
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
  );
}

//✓✓✓