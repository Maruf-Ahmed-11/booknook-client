"use client";

import { useState } from "react";
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
  userName?: string;
  userEmail?: string;
}

interface SelectedArchiveProps {
  books: Book[];
}

export default function SelectedArchive({ books }: SelectedArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalBook, setActiveModalBook] = useState<Book | null>(null);

  // Derive unique categories present in books
  const categories = ["All", ...Array.from(new Set(books.map((b) => b.category).filter(Boolean)))];

  // Filter books based on category selection
  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((b) => b.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#050505] selection:bg-[#e50914] selection:text-white relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.08),transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
              02 {"//"} SELECTED ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              SELECTED BOOKS CRAFTED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-500 to-zinc-700">
                WITH PURPOSE AND DEPTH.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] px-7 py-3.5 rounded-full border border-zinc-800 bg-[#0d0d10] hover:border-[#e50914] hover:bg-[#e50914] text-zinc-300 hover:text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] cursor-pointer"
            >
              Browse Full Catalog ({books.length}+) →
            </Link>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#e50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                    : "bg-[#0d0d10] text-zinc-400 border border-zinc-800/80 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat === "All" ? "All Volumes" : cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid of Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredBooks.map((book, idx) => (
            <div
              key={book._id}
              className="group flex flex-col bg-[#0d0d10] border border-zinc-800/90 rounded-2xl overflow-hidden hover:border-[#e50914]/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(229,9,20,0.2)]"
            >
              {/* Book Image with Aspect Ratio */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-950">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/20 to-transparent opacity-90"></div>

                {/* Corner Index Number Badge */}
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-mono font-bold text-zinc-300">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-bold text-amber-400">
                  <span>★</span>
                  <span>{book.rating ? Number(book.rating).toFixed(1) : "5.0"}</span>
                </div>

                {/* Quick View Button on Hover */}
                <button
                  onClick={() => setActiveModalBook(book)}
                  className="absolute inset-0 m-auto h-10 w-32 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700 text-white text-[11px] font-mono font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-[#e50914] hover:bg-[#e50914] flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <span>👁 Quick View</span>
                </button>

                {/* Category Pill Over Image Bottom */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-red-950/90 border border-red-800/80 text-[10px] font-mono font-bold uppercase tracking-wider text-red-200 backdrop-blur-md">
                    {book.category}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col flex-grow p-6">
                <Link
                  href={book._id.startsWith("preview") ? "/books" : `/books/${book._id}`}
                  className="group-hover:text-[#e50914] transition-colors"
                >
                  <h3 className="text-lg font-bold text-white line-clamp-1 font-sans" title={book.title}>
                    {book.title}
                  </h3>
                </Link>

                <p className="text-xs text-zinc-400 mt-1 font-mono">By {book.author}</p>

                {/* Star Rating Display */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(Math.round(book.rating || 5))}
                    {"☆".repeat(5 - Math.round(book.rating || 5))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    ({Number(book.rating || 5).toFixed(1)} / 5.0)
                  </span>
                </div>

                {/* Synopsis: Clearer and More Detailed */}
                <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed font-light">
                  {book.description || "A curated literary work preserved within the BookNook digital library collection."}
                </p>

                {/* Specifications Bar */}
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${book.copies > 0 ? "bg-[#e50914] animate-pulse" : "bg-zinc-600"}`}></span>
                    <span className={book.copies > 0 ? "text-zinc-300" : "text-zinc-500"}>
                      {book.copies > 0 ? `${book.copies} ${book.copies === 1 ? "Copy Available" : "Copies Available"}` : "Out of Stock"}
                    </span>
                  </div>
                  <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Free Lending</span>
                </div>

                {/* Curator Name & Email Tag */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 truncate">
                  <span className="text-[#e50914]">✦</span>
                  <span className="truncate">By: {book.userName || book.userEmail || "BookNook Curator"}</span>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80">
                  <Link
                    href={book._id.startsWith("preview") ? "/books" : `/books/${book._id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#e50914] hover:border-[#e50914] py-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-white transition-all shadow-sm hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] cursor-pointer"
                  >
                    <span>Inspect Volume</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ======================================================== */}
      {/* QUICK VIEW DETAILS MODAL */}
      {/* ======================================================== */}
      {activeModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0d0d10] border border-zinc-800 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setActiveModalBook(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white text-xl font-mono px-2 py-1 cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Modal Cover Image */}
              <div className="relative w-full sm:w-48 aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
                <Image
                  src={activeModalBook.image}
                  alt={activeModalBook.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Information */}
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-1.5">
                  {activeModalBook.category} {"//"} ARCHIVED VOLUME
                </span>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                  {activeModalBook.title}
                </h3>
                <p className="text-sm font-mono text-zinc-400 mt-1">Written by {activeModalBook.author}</p>

                {/* Rating & Stock Badges */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400">
                    <span>★ {Number(activeModalBook.rating || 5).toFixed(1)} / 5.0</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                    <span className={`h-2 w-2 rounded-full ${activeModalBook.copies > 0 ? "bg-[#e50914]" : "bg-zinc-600"}`}></span>
                    <span>{activeModalBook.copies > 0 ? `${activeModalBook.copies} Copies in Library` : "Out of Stock"}</span>
                  </div>
                </div>

                {/* Full Synopsis */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                    Complete Synopsis
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {activeModalBook.description || "No full synopsis provided for this title."}
                  </p>
                </div>

                {/* Curator Attribution */}
                <div className="mt-4 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3 text-[11px] font-mono">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                      CURATED &amp; ADDED BY
                    </span>
                    <span className="text-white font-bold">{activeModalBook.userName || "Verified Curator"}</span>
                    <span className="text-zinc-400 ml-2 font-mono">({activeModalBook.userEmail || "community@booknook.app"})</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#e50914] bg-red-950/60 border border-red-900/40 px-2 py-0.5 rounded shrink-0">
                    🔒 Verified
                  </span>
                </div>

                {/* Modal CTAs */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-3">
                  <Link
                    href={activeModalBook._id.startsWith("preview") ? "/books" : `/books/${activeModalBook._id}`}
                    className="flex-grow flex items-center justify-center gap-2 rounded-xl bg-[#e50914] hover:bg-[#c90812] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                  >
                    <span>Inspect Full Volume &amp; Borrow</span>
                    <span>→</span>
                  </Link>
                  <button
                    onClick={() => setActiveModalBook(null)}
                    className="px-4 py-3 rounded-xl border border-zinc-800 text-xs font-mono uppercase text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
