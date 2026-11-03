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
}

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Await the dynamic params correctly for Next.js 15/16+
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const res = await fetch(`http://localhost:8000/books/${id}`, { cache: "no-store" });

    if (!res.ok) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Book Not Found</h2>
                <p className="mt-2 text-gray-500">We couldn&apos;t locate this book in the database.</p>
                <Link href="/books" className="mt-6 text-[#8b5cf6] hover:underline font-medium">← Back to Library</Link>
            </div>
        );
    }

    const book: Book = await res.json();
    const isAvailable = book.copies > 0;

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-12">
            <div className="container mx-auto max-w-6xl px-4 md:px-8">

                <Link href="/books" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#8b5cf6] mb-8 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Library
                </Link>

                <div className="flex flex-col md:flex-row gap-10 lg:gap-16 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">

                    {/* Left Column: Book Cover */}
                    <div className="w-full md:w-1/3 shrink-0">
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column: Book Details */}
                    <div className="w-full md:w-2/3 flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-[#8b5cf6] bg-purple-50 rounded-lg">
                                    {book.category}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif leading-tight">{book.title}</h1>
                                <p className="text-lg text-gray-500 mt-2 font-medium">By {book.author}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shrink-0">
                                <span className="text-amber-500 flex items-center gap-1 font-bold text-lg">
                                    ⭐ {book.rating}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">Rating</span>
                            </div>
                        </div>

                        <div className="my-6 border-t border-b border-gray-100 py-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Synopsis</h3>
                            <p className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
                                {book.description || "No description provided for this book."}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex items-center gap-2 mb-6">
                                <div className={`h-2.5 w-2.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                <span className={`text-base font-medium ${isAvailable ? 'text-gray-900' : 'text-red-500'}`}>
                                    {isAvailable ? `${book.copies} copies available in library` : 'Currently out of stock'}
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