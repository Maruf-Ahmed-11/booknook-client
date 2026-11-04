"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface BorrowedBook {
    _id: string; // The ID of the borrow record
    bookId: string; // The original book's ID
    title: string;
    image: string;
    category?: string;
    borrowDate: string;
    returnDate: string;
}

export default function MyBorrowsPage() {
    const { data: session, isPending } = authClient.useSession();
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBorrows = async () => {
            if (!session?.user?.email) return;

            try {
                const token = localStorage.getItem("access-token");
                const res = await fetch(`http://localhost:8000/borrows?email=${encodeURIComponent(session.user.email)}`, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setBorrowedBooks(data);
                }
            } catch (err) {
                console.error("Failed to fetch borrowed books:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) {
            fetchBorrows();
        }
    }, [session, isPending]);

    const handleReturn = async (borrowId: string, bookId: string) => {
        setReturningId(borrowId);
        try {
            const token = localStorage.getItem("access-token");
            const res = await fetch(`http://localhost:8000/borrows/${borrowId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ bookId })
            });

            if (res.ok) {
                toast.success("Book returned successfully!");
                // Remove the returned book from the UI instantly
                setBorrowedBooks((prev) => prev.filter((book) => book._id !== borrowId));
            } else {
                toast.error("Failed to return book");
            }
        } catch {
            toast.error("An error occurred while returning the book");
        } finally {
            setReturningId(null);
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;
            return d.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <LoadingSpinner size="lg" message="Synchronizing Archive Loans..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 lg:py-20 selection:bg-[#e50914] selection:text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                <div className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
                            READER ARCHIVE // ACTIVE CHECKOUTS
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
                            My Borrows
                        </h1>
                        <p className="mt-2 text-xs md:text-sm text-zinc-400 font-light">
                            Manage all active book loans, monitor return schedules, and return volumes to the library archive.
                        </p>
                    </div>

                    <Link href="/books">
                        <button className="rounded-full border border-zinc-800 bg-[#0d0d10] px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-[#e50914] transition-all cursor-pointer">
                            Browse Collection →
                        </button>
                    </Link>
                </div>

                {borrowedBooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-[#0d0d10] py-32 text-center shadow-sm">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-950/60 border border-red-900/60 text-[#e50914]">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">No Books Borrowed Yet</h3>
                        <p className="mt-2 text-xs text-zinc-400 max-w-sm font-light">
                            Your personal reading rack is currently empty. Explore the global archive to find your next read.
                        </p>
                        <Link href="/books">
                            <button className="mt-6 rounded-full bg-[#e50914] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(229,9,20,0.4)] transition-all hover:bg-[#c90812] hover:scale-105 cursor-pointer">
                                Explore Library
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* Table showing borrowed books */
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d10] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                    <tr className="border-b border-zinc-800 bg-[#121216] text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                                        <th scope="col" className="px-6 py-4">Image</th>
                                        <th scope="col" className="px-6 py-4">Title</th>
                                        <th scope="col" className="px-6 py-4">Borrow Date</th>
                                        <th scope="col" className="px-6 py-4">Return Date</th>
                                        <th scope="col" className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/60 text-sm">
                                    {borrowedBooks.map((book) => (
                                        <tr key={book._id} className="hover:bg-zinc-900/40 transition-colors group">
                                            {/* Image */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md">
                                                    <Image
                                                        src={book.image}
                                                        alt={book.title || "Book cover"}
                                                        fill
                                                        sizes="56px"
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                            </td>

                                            {/* Title */}
                                            <td className="px-6 py-4">
                                                <div className="max-w-md">
                                                    {book.category && (
                                                        <span className="mb-1.5 inline-block rounded bg-red-950/80 border border-red-800/60 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                                                            {book.category}
                                                        </span>
                                                    )}
                                                    <h3 className="font-bold text-white text-base leading-snug font-sans group-hover:text-red-400 transition-colors">
                                                        {book.title}
                                                    </h3>
                                                    <Link
                                                        href={`/books/${book.bookId}`}
                                                        className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-[#e50914] mt-1 transition-colors"
                                                    >
                                                        Book Details →
                                                    </Link>
                                                </div>
                                            </td>

                                            {/* Borrow Date */}
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-zinc-300">
                                                {formatDate(book.borrowDate)}
                                            </td>

                                            {/* Return Date */}
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-mono">
                                                <span className="inline-block rounded-md bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-zinc-200">
                                                    {formatDate(book.returnDate)}
                                                </span>
                                            </td>

                                            {/* Action: Return Book */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => handleReturn(book._id, book.bookId)}
                                                    disabled={returningId === book._id}
                                                    className="rounded-xl bg-[#e50914] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#c90812] hover:shadow-[0_0_20px_rgba(229,9,20,0.45)] disabled:opacity-50 cursor-pointer"
                                                >
                                                    {returningId === book._id ? "Returning..." : "Return Book"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

//✓✓✓