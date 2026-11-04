export default function FrequentInquiries() {
  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#08080a]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] block mb-2">
            04 {"//"} FREQUENT INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
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
  );
}

//✓✓✓