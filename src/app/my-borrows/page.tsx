"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface BorrowedBook {
    _id: string; // The ID of the borrow record
    bookId: string; // The original book's ID
    title: string;
    image: string;
    category: string;
    borrowDate: string;
    returnDate: string;
}

export default function MyBorrowsPage() {
    const { data: session, isPending } = authClient.useSession();
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrows = async () => {
            if (!session?.user?.email) return;

            try {
                const token = localStorage.getItem("access-token");
                const res = await fetch(`http://localhost:8000/borrows?email=${session.user.email}`, {
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
        try {
            const token = localStorage.getItem("access-token");
            const res = await fetch(`http://localhost:8000/borrows/${borrowId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                // Passing bookId so your backend knows which book's copies to increase
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
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] text-zinc-400 font-mono text-xs uppercase tracking-widest">
                <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"></span>
                    <span>Synchronizing Archive Loans...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 lg:py-20 selection:bg-[#e50914] selection:text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                <div className="mb-12 border-b border-zinc-900 pb-8">
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
                        READER ARCHIVE // ACTIVE CHECKOUTS
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
                        My Borrowed Books
                    </h1>
                    <p className="mt-2 text-xs md:text-sm text-zinc-400 font-light">
                        Track your active literature loans, remaining reading days, and return completed volumes.
                    </p>
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
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {borrowedBooks.map((book) => (
                            <div
                                key={book._id}
                                className="flex gap-5 rounded-2xl border border-zinc-800/80 bg-[#0d0d10] p-5 shadow-sm transition-all hover:border-zinc-700 hover:shadow-lg"
                            >
                                <div className="relative w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-900 aspect-[3/4] border border-zinc-800">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        sizes="112px"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-grow flex-col justify-between py-0.5">
                                    <div>
                                        <span className="mb-2 inline-block rounded bg-red-950/80 border border-red-800/60 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                                            {book.category}
                                        </span>
                                        <h3 className="line-clamp-2 text-base font-bold text-white leading-tight font-sans">
                                            {book.title}
                                        </h3>

                                        <div className="mt-4 text-xs font-mono space-y-1.5 text-zinc-400">
                                            <p className="flex justify-between">
                                                <span className="text-zinc-500 uppercase text-[10px]">Borrowed:</span>
                                                <span className="text-zinc-300">{new Date(book.borrowDate).toLocaleDateString()}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-zinc-500 uppercase text-[10px]">Return By:</span>
                                                <span className="text-[#e50914] font-bold">{new Date(book.returnDate).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleReturn(book._id, book.bookId)}
                                        className="mt-5 w-full rounded-xl bg-zinc-900 border border-zinc-800 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 transition-all hover:bg-[#e50914] hover:border-[#e50914] hover:text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] cursor-pointer"
                                    >
                                        Return Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
