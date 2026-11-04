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

export default async function AllBooksPage() {
    let books: Book[] = [];
    let isError = false;

    try {
        const res = await fetch("http://localhost:8000/books", { cache: "no-store" });
        if (!res.ok) {
            isError = true;
        } else {
            books = await res.json();
        }
    } catch {
        isError = true;
    }

    if (isError) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center bg-[#050505] text-white">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-3">
                    DATABASE CONNECTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Archive Offline</h2>
                <p className="mt-2 text-zinc-400 text-sm max-w-md font-light">
                    Unable to reach the Express backend server on port 8000. Please verify your local database service.
                </p>
                <Link
                    href="/"
                    className="mt-6 px-6 py-2.5 rounded-full border border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                >
                    ← Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 lg:py-20 selection:bg-[#e50914] selection:text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                {/* Header Section */}
                <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-zinc-900 pb-8 md:flex-row md:items-end">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
                            COLLECTION INDEX
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">Library Collection</h1>
                        <p className="mt-2 text-sm text-zinc-400 font-light">
                            Explore our curated archive of {books.length} {books.length === 1 ? 'registered volume' : 'registered volumes'}.
                        </p>
                    </div>
                    <Link href="/add-book">
                        <button className="rounded-full bg-[#e50914] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(229,9,20,0.45)] transition-all hover:bg-[#c90812] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] hover:scale-105 cursor-pointer">
                            + Add New Book
                        </button>
                    </Link>
                </div>

                {/* Dynamic Grid / Empty State */}
                {books.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-[#0d0d10] py-32 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-950/60 border border-red-900/60 text-[#e50914]">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">No Books Archived Yet</h3>
                        <p className="mt-2 text-xs text-zinc-400 max-w-sm">The digital library is currently awaiting its first contribution.</p>
                        <Link href="/add-book" className="mt-6">
                            <button className="rounded-full bg-[#e50914] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#c90812]">
                                Contribute First Book
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d0d10] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#e50914]/60 hover:shadow-[0_15px_30px_rgba(229,9,20,0.15)]"
                            >
                                {/* Image Container */}
                                <div className="relative w-full overflow-hidden bg-zinc-900 aspect-[3/4]">
                                    <Image
                                        src={book.image}
                                        alt={book.title || "Book cover"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-80"></div>

                                    {/* Glassmorphism Rating Badge */}
                                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/80 px-2.5 py-1 text-xs font-bold text-amber-400 border border-zinc-800 backdrop-blur-md">
                                        ★ {book.rating}
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="w-fit rounded bg-red-950/80 border border-red-800/60 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                                            {book.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-grow flex-col p-6">
                                    <h3 className="line-clamp-1 text-lg font-bold text-white group-hover:text-red-400 transition-colors" title={book.title}>
                                        {book.title}
                                    </h3>
                                    <p className="mt-1 text-xs font-mono text-zinc-400 line-clamp-1">By {book.author}</p>

                                    {/* Curator / Added By Tag */}
                                    <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                        <span className="text-[#e50914] font-bold">✦</span>
                                        <span className="truncate">
                                            Curator: {book.userName || book.userEmail || "BookNook Archive"}
                                        </span>
                                    </div>

                                    {/* Footer (Stock & Button) */}
                                    <div className="mt-auto flex items-center justify-between border-t border-zinc-800/80 pt-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`h-1.5 w-1.5 rounded-full ${book.copies > 0 ? 'bg-[#e50914]' : 'bg-zinc-600'}`}></div>
                                            <span className={`text-xs font-mono ${book.copies > 0 ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                                {book.copies > 0 ? `${book.copies} In Stock` : 'Out of Stock'}
                                            </span>
                                        </div>

                                        <Link href={`/books/${book._id}`}>
                                            <button className="rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 transition-all hover:bg-[#e50914] hover:border-[#e50914] hover:text-white cursor-pointer">
                                                Details →
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
