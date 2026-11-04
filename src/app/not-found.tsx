import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[85vh] flex-col items-center justify-center bg-[#050505] px-4 text-center selection:bg-[#e50914] selection:text-white">
            <div className="relative mx-auto max-w-xl py-12">

                {/* Subtle Crimson Radial Glow Background */}
                <div className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e50914]/15 blur-3xl"></div>

                {/* Archive Code Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-900/60 bg-red-950/40 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e50914] animate-pulse"></span>
                    <span>ARCHIVE INDEX // 404 NOT FOUND</span>
                </div>

                {/* Giant 404 Accent */}
                <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-zinc-900 select-none font-mono">
                    4<span className="text-[#e50914]">0</span>4
                </h1>

                {/* Main Heading */}
                <h2 className="-mt-6 sm:-mt-8 text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
                    Lost in the Library Stacks
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    The volume, catalogue section, or record you requested could not be found in our digital archives. It may have been relocated, renamed, or de-indexed.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <button className="w-full sm:w-auto rounded-full bg-[#e50914] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(229,9,20,0.45)] transition-all hover:bg-[#c90812] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] hover:scale-105 cursor-pointer">
                            Back to Home
                        </button>
                    </Link>

                    <Link href="/books">
                        <button className="w-full sm:w-auto rounded-full border border-zinc-800 bg-[#0d0d10] px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer">
                            Browse All Books →
                        </button>
                    </Link>
                </div>

                {/* Footer Monospace Note */}
                <p className="mt-12 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    BookNook Curated Library Archive • System Response Code 404
                </p>

            </div>
        </div>
    );
}
//✓✓✓
