import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] relative overflow-hidden border-t border-zinc-900 pt-16 pb-12 selection:bg-[#e50914] selection:text-white">
      {/* Subtle Ambient Red Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[radial-gradient(ellipse_at_bottom,rgba(229,9,20,0.08),transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-12 border-b border-zinc-900">

          {/* ======================================================== */}
          {/* LEFT COLUMN: Logo & Description */}
          {/* ======================================================== */}
          <div className="flex flex-col items-start">
            {/* Logo and Name identical to Navbar */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e50914] text-white font-extrabold shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-transform group-hover:scale-105">
                B
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                BookNook<span className="text-[#e50914]">.</span>
              </span>
            </Link>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              BookNook is a small online library. Users can see all books, add new books, and borrow a book for a few days.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]"></span>
              <span>Open Digital Literary Archive</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* MIDDLE COLUMN: Contact Information */}
          {/* ======================================================== */}
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-4 block">
              CONTACT INFORMATION
            </span>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Email Redirect */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500">Email Inquiries</p>
                  <a
                    href="mailto:maruf04ahmed12rohan04@gmail.com"
                    className="font-medium text-white hover:text-[#e50914] transition-colors"
                  >
                    maruf04ahmed12rohan04@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Redirect */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500">Direct Support</p>
                  <a
                    href="tel:+8801773532098"
                    className="font-mono font-bold text-white hover:text-[#e50914] transition-colors"
                  >
                    +880 1773 532 098
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500">Physical Archive</p>
                  <p className="font-light text-zinc-300">
                    1 No. Navy Gate, Khalishpur, Khulna, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================== */}
          {/* RIGHT COLUMN: Social Links  */}
          {/* =========================== */}
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-4 block">
              CONNECT &amp; FOLLOW
            </span>
            <p className="text-xs text-zinc-400 font-light mb-4">
              Join our literary community across networks:
            </p>

            {/* Social Grid: Respective Logo Above Text */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">

              {/* 1. LinkedIn */}
              <a
                href="https://www.linkedin.com/in/maruf-ahmed-rohan/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#0d0d10] border border-zinc-800/80 hover:border-[#e50914] hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white"
                title="LinkedIn"
              >
                <svg className="h-5 w-5 mb-1.5 transition-transform group-hover:scale-110 group-hover:text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">LinkedIn</span>
              </a>

              {/* 2. GitHub */}
              <a
                href="https://github.com/Maruf-Ahmed-11"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#0d0d10] border border-zinc-800/80 hover:border-[#e50914] hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white"
                title="GitHub"
              >
                <svg className="h-5 w-5 mb-1.5 transition-transform group-hover:scale-110 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">GitHub</span>
              </a>

              {/* 3. X (Twitter) */}
              <a
                href="https://x.com/MarufAhmed614"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#0d0d10] border border-zinc-800/80 hover:border-[#e50914] hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white"
                title="X"
              >
                <svg className="h-5 w-5 mb-1.5 transition-transform group-hover:scale-110 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">X</span>
              </a>

              {/* 4. Instagram */}
              <a
                href="https://www.instagram.com/maruf_ahmed_rohan_04/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#0d0d10] border border-zinc-800/80 hover:border-[#e50914] hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white"
                title="Instagram"
              >
                <svg className="h-5 w-5 mb-1.5 transition-transform group-hover:scale-110 group-hover:text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Instagram</span>
              </a>

              {/* 5. Facebook */}
              <a
                href="https://www.facebook.com/marufahmed.rohan/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-[#0d0d10] border border-zinc-800/80 hover:border-[#e50914] hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white"
                title="Facebook"
              >
                <svg className="h-5 w-5 mb-1.5 transition-transform group-hover:scale-110 group-hover:text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Facebook</span>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-zinc-600">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span className="text-[#e50914]">Cinematic Dark Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
