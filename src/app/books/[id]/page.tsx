import Image from "next/image";
import Link from "next/link";
import BorrowButton from "@/components/BorrowButton";

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

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Await the dynamic params correctly for latest version of Next.js
    const resolvedParams = await params;
    const id = resolvedParams.id;

    let book: Book | null = null;
    let isError = false;

    try {
        const res = await fetch(`http://localhost:8000/books/${id}`, { cache: "no-store" });
        if (!res.ok) {
            isError = true;
        } else {
            book = await res.json();
        }
    } catch {
        isError = true;
    }

    if (isError || !book) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center bg-[#050505] text-white">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-3">
                    VOLUME ARCHIVE
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Book Not Found</h2>
                <p className="mt-2 text-zinc-400 text-sm max-w-sm font-light">
                    We could not locate this record in the active database collection.
                </p>
                <Link
                    href="/books"
                    className="mt-6 px-6 py-2.5 rounded-full border border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                >
                    ← Back to Library
                </Link>
            </div>
        );
    }

    const isAvailable = book.copies > 0;

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 selection:bg-[#e50914] selection:text-white">
            <div className="container mx-auto max-w-6xl px-4 md:px-8">

                <Link
                    href="/books"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#e50914] mb-8 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Library
                </Link>

                <div className="flex flex-col md:flex-row gap-10 lg:gap-16 bg-[#0d0d10] p-6 md:p-12 rounded-3xl border border-zinc-800/80 shadow-[0_0_60px_rgba(0,0,0,0.8)]">

                    {/* Left Column: Book Cover */}
                    <div className="w-full md:w-1/3 shrink-0">
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900">
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>

                    {/* Right Column: Book Details */}
                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <span className="inline-block px-3 py-1 mb-3 text-[10px] font-mono font-bold uppercase tracking-wider text-red-300 bg-red-950/80 border border-red-800/60 rounded-md">
                                        {book.category}
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                                        {book.title}
                                    </h1>
                                    <p className="text-base text-zinc-400 mt-2 font-mono">By {book.author}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-black/80 px-4 py-2.5 rounded-xl border border-zinc-800 shrink-0">
                                    <span className="text-amber-400 flex items-center gap-1 font-bold text-base font-mono">
                                        ★ {book.rating}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-medium">Rating</span>
                                </div>
                            </div>

                            {/* Uneditable Curator / Added By Box */}
                            <div className="my-6 p-4 rounded-xl bg-[#141418] border border-zinc-800/80 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-950/80 border border-red-800/60 text-[#e50914] font-black font-mono text-sm shadow-inner">
                                        {(book.userName || book.userEmail || "C").charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#e50914] block">
                                            CURATED &amp; CONTRIBUTED BY
                                        </span>
                                        <p className="text-sm font-bold text-white font-sans">
                                            {book.userName || "Verified Curator"}
                                        </p>
                                        <p className="text-xs font-mono text-zinc-400">
                                            {book.userEmail || "community@booknook.app"}
                                        </p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
                                    Verified Contributor
                                </span>
                            </div>

                            <div className="my-8 border-t border-b border-zinc-800/80 py-6">
                                <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3">
                                    ARCHIVE SYNOPSIS
                                </h3>
                                <p className="text-zinc-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap font-light">
                                    {book.description || "No synopsis recorded for this literary volume."}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className={`h-2 w-2 rounded-full ${isAvailable ? 'bg-[#e50914]' : 'bg-zinc-600'}`}></div>
                                <span className={`text-xs font-mono uppercase tracking-wider ${isAvailable ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                    {isAvailable ? `${book.copies} Copies Available in Library` : 'Currently Out of Stock'}
                                </span>
                            </div>

                            <BorrowButton
                                bookId={book._id}
                                title={book.title}
                                image={book.image}
                                category={book.category}
                                isAvailable={isAvailable}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

//✓✓✓