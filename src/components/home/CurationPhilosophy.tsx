"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  _id: string;
  category: string;
  rating: number;
}

interface MetricResult {
  name: string;
  key: string;
  purity: number;
  bookCount: number;
  avgRating: string;
  isDynamic: boolean;
}

const CATEGORY_METRICS = [
  { name: "Literary Fiction & Novels", key: "Novel", benchmarkPurity: 96 },
  { name: "Philosophy & Stoic Thought", key: "Philosophy", benchmarkPurity: 94 },
  { name: "Psychology & Deep Narratives", key: "Psychology", benchmarkPurity: 95 },
  { name: "Sci-Fi & Speculative Futures", key: "Sci-Fi", benchmarkPurity: 92 },
  { name: "Mystery & Psychological Thrillers", key: "Thriller", benchmarkPurity: 91 },
  { name: "Historical Archives & Biography", key: "History", benchmarkPurity: 89 },
];

export default function CurationPhilosophy() {
  const [metrics, setMetrics] = useState<MetricResult[]>(() =>
    CATEGORY_METRICS.map((m) => ({
      name: m.name,
      key: m.key,
      purity: m.benchmarkPurity,
      bookCount: 0,
      avgRating: ((m.benchmarkPurity / 100) * 10).toFixed(1),
      isDynamic: false,
    }))
  );
  const [totalAnalyzed, setTotalAnalyzed] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCollectionRatings() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/books`);
        if (!res.ok) return;

        const liveBooks: Book[] = await res.json();
        if (!isMounted || !Array.isArray(liveBooks) || liveBooks.length === 0) return;

        setTotalAnalyzed(liveBooks.length);
        setIsLive(true);

        const computed = CATEGORY_METRICS.map((metric) => {
          const matchingBooks = liveBooks.filter((b) => {
            if (!b.category) return false;
            const cat = b.category.toLowerCase();
            if (metric.key === "Novel") return cat.includes("novel") || cat.includes("classic") || cat.includes("literature");
            if (metric.key === "Philosophy") return cat.includes("philosophy") || cat.includes("self-help");
            if (metric.key === "Psychology") return cat.includes("psychology");
            if (metric.key === "Sci-Fi") return cat.includes("sci-fi") || cat.includes("science") || cat.includes("fantasy");
            if (metric.key === "Thriller") return cat.includes("thriller") || cat.includes("mystery");
            if (metric.key === "History") return cat.includes("history") || cat.includes("biography");
            return false;
          });

          if (matchingBooks.length > 0) {
            const totalRating = matchingBooks.reduce((sum, b) => {
              let r = Number(b.rating) || 10;
              if (r <= 5) r = r * 2; // Seamlessly support existing 1-5 ratings on the 1-10 scale
              return sum + r;
            }, 0);
            const avg = totalRating / matchingBooks.length;
            const purity = Math.min(100, Math.round((avg / 10) * 100));
            return {
              name: metric.name,
              key: metric.key,
              purity,
              bookCount: matchingBooks.length,
              avgRating: avg.toFixed(1),
              isDynamic: true,
            };
          }

          return {
            name: metric.name,
            key: metric.key,
            purity: metric.benchmarkPurity,
            bookCount: 0,
            avgRating: ((metric.benchmarkPurity / 100) * 10).toFixed(1),
            isDynamic: false,
          };
        });

        setMetrics(computed);
      } catch {
        // Fallback to benchmarks when database is offline
      }
    }

    loadCollectionRatings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#08080a] selection:bg-[#e50914] selection:text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914]">
              01 {"//"} CURATION PHILOSOPHY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isLive ? "bg-[#e50914] animate-pulse" : "bg-zinc-600"}`}></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              {isLive ? `Live Database Metrics (${totalAnalyzed} Books Analyzed)` : "Archive Standards Mode"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Statement text with highlight words */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight font-sans">
              WE PRESERVE <span className="text-zinc-600">STORIES THAT SPARK AUTHENTIC EMOTIONS, CRITICAL THINKING, AND VISIONARY THOUGHTS.</span>
              {" "}TIMELESS LITERATURE <span className="text-zinc-600">THAT AWAKENS THE BOUNDLESS DEPTH OF HUMAN IMAGINATION.</span>
            </h2>

            <p className="mt-8 text-zinc-400 font-light leading-relaxed max-w-xl text-sm md:text-base">
              Every title admitted into the BookNook index passes through strict criteria of depth, influence, and literary longevity. Purity ratings are computed in real time based on active ratings across the library.
            </p>

            <div className="mt-8">
              <Link
                href="/books"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-white hover:text-[#e50914] transition-colors group cursor-pointer"
              >
                <span>Discover Curated Titles</span>
                <span className="text-base text-[#e50914] group-hover:translate-x-1.5 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Dynamic Progress Bars (Functional Collection Purity Ratings) */}
          <div className="lg:col-span-5 space-y-5 bg-[#0d0d10] p-8 rounded-2xl border border-zinc-800/80 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300">
                COLLECTION PURITY RATINGS
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Max 100%
              </span>
            </div>

            {metrics.map((item) => (
              <div key={item.key} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono uppercase">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    {item.name}
                    {item.isDynamic && (
                      <span className="text-[9px] text-[#e50914] font-bold">
                        ({item.bookCount} {item.bookCount === 1 ? "book" : "books"})
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[10px]">★ {item.avgRating} / 10</span>
                    <span className="text-[#e50914] font-bold">{item.purity}%</span>
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="h-1.5 w-full bg-zinc-800/90 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-700 to-[#e50914] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${item.purity}%` }}
                  ></div>
                </div>
              </div>
            ))}

            <p className="pt-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center border-t border-zinc-800/60">
              Computed from Community Ratings: (Rating ÷ 10.0) × 100%
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

//✓✓✓