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

export default async function AllBooksPage() {
    const res = await fetch("http://localhost:8000/books", { cache: "no-store" });

    if (!res.ok) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Oops! Database Disconnected</h2>
                <p className="mt-2 text-gray-500">Make sure your Express server is running on port 8000.</p>
            </div>
        );
    }

    const books: Book[] = await res.json();

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-12 lg:py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                {/* Header Section */}
                <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">Library Collection</h1>
                        <p className="mt-3 text-lg text-gray-500">Explore our curated collection of {books.length} {books.length === 1 ? 'book' : 'books'}.</p>
                    </div>
                    <Link href="/add-book">
                        <button className="rounded-xl bg-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#7c3aed] hover:shadow-lg">
                            + Add New Book
                        </button>
                    </Link>
                </div>

                {/* Dynamic Grid / Empty State */}
                {books.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-32 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-[#8b5cf6]">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">No books found</h3>
                        <p className="mt-2 text-gray-500">Your library is empty. Be the first to contribute!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Image Container */}
                                <div className="relative w-full overflow-hidden bg-gray-100 aspect-[3/4]">
                                    <Image
                                        src={book.image}
                                        alt={book.title || "Book cover"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Glassmorphism Rating Badge */}
                                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md">
                                        <svg className="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {book.rating}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-grow flex-col p-6">
                                    {/* Category Badge */}
                                    <span className="mb-3 w-fit rounded-md bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8b5cf6]">
                                        {book.category}
                                    </span>

                                    <h3 className="line-clamp-1 text-xl font-bold text-gray-900" title={book.title}>
                                        {book.title}
                                    </h3>
                                    <p className="mb-4 mt-1 text-sm text-gray-500 line-clamp-1">{book.author}</p>

                                    {/* Footer (Stock & Button) */}
                                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`h-2 w-2 rounded-full ${book.copies > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                            <span className={`text-sm font-medium ${book.copies > 0 ? 'text-gray-700' : 'text-red-500'}`}>
                                                {book.copies > 0 ? `${book.copies} Available` : 'Out of Stock'}
                                            </span>
                                        </div>

                                        <Link href={`/books/${book._id}`}>
                                            <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#8b5cf6]">
                                                Details
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