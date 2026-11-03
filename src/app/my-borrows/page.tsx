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
            } catch (error) {
                console.error("Failed to fetch borrowed books:", error);
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
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    if (isPending || loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]"><p className="text-gray-500 font-medium">Loading your library...</p></div>;
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-12 lg:py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                <div className="mb-12 border-b border-gray-200 pb-6">
                    <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">My Borrowed Books</h1>
                    <p className="mt-2 text-gray-500">Manage the books you are currently reading.</p>
                </div>

                {borrowedBooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-32 text-center shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900">No books borrowed yet</h3>
                        <p className="mt-2 text-gray-500">Head over to the library to find your next great read.</p>
                        <Link href="/books">
                            <button className="mt-6 rounded-xl bg-[#8b5cf6] px-8 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#7c3aed] hover:shadow-lg">
                                Explore Library
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {borrowedBooks.map((book) => (
                            <div key={book._id} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">

                                <div className="relative w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        sizes="112px"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-grow flex-col justify-between py-1">
                                    <div>
                                        <span className="mb-1 inline-block rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8b5cf6]">
                                            {book.category}
                                        </span>
                                        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 leading-tight">{book.title}</h3>

                                        <div className="mt-3 text-xs text-gray-500 space-y-1">
                                            <p>Borrowed: <span className="font-medium text-gray-700">{new Date(book.borrowDate).toLocaleDateString()}</span></p>
                                            <p>Return by: <span className="font-medium text-red-500">{new Date(book.returnDate).toLocaleDateString()}</span></p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleReturn(book._id, book.bookId)}
                                        className="mt-4 w-full rounded-lg bg-gray-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
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