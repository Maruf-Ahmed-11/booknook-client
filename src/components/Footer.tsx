import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-zinc-900">
      {/* Subtle bottom ember glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(229,9,20,0.12),transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        <div className="flex items-center gap-3 mb-4">
          <span className="h-2 w-2 rounded-full bg-[#e50914]"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914]">
            05 {"//"} GET INVOLVED
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none font-sans">
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
  );
}

