"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

interface BorrowButtonProps {
    bookId: string;
    title: string;
    image: string;
    category: string;
    isAvailable: boolean;
}

export default function BorrowButton({ bookId, title, image, category, isAvailable }: BorrowButtonProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Calculate default return date: 14 days from today (YYYY-MM-DD)
    const getDefaultReturnDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        return d.toISOString().split("T")[0];
    };

    const [returnDate, setReturnDate] = useState(getDefaultReturnDate());
    const todayStr = new Date().toISOString().split("T")[0];

    const handleOpenModal = () => {
        if (!session?.user) {
            toast.error("Please log in to borrow books");
            router.push("/login");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmBorrow = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.email) {
            toast.error("Please log in to continue");
            return;
        }

        if (!returnDate) {
            toast.error("Please select a return date");
            return;
        }

        setLoading(true);

        try {
            const borrowDate = new Date().toISOString();
            const formattedReturnDate = new Date(returnDate).toISOString();

            const res = await fetch("http://localhost:8000/borrows", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("access-token")}`
                },
                body: JSON.stringify({
                    bookId,
                    title,
                    image,
                    userEmail: session.user.email,
                    userName: session.user.name || "Reader",
                    category,
                    borrowDate,
                    returnDate: formattedReturnDate
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to borrow book");
            } else {
                toast.success("Book borrowed successfully!");
                setIsModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong while borrowing this book");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleOpenModal}
                disabled={!isAvailable}
                className="w-full md:w-auto px-9 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] text-white transition-all shadow-[0_0_25px_rgba(229,9,20,0.4)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none bg-[#e50914] hover:bg-[#c90812] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] cursor-pointer"
            >
                {!isAvailable ? "Out of Stock" : "Borrow This Book"}
            </button>

            {/* Borrow Confirmation Modal */}
            {isModalOpen && session?.user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-[#0d0d10] p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)]">

                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] block mb-1">
                                    LOAN CHECKOUT // DIGITAL ARCHIVE
                                </span>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white font-sans">
                                    Borrow Book
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-xl border border-zinc-800 p-2 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Selected Book Summary */}
                        <div className="my-5 flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-[#141418] p-3.5">
                            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <span className="inline-block rounded bg-red-950/80 border border-red-800/60 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300 mb-1">
                                    {category}
                                </span>
                                <h4 className="truncate text-sm font-bold text-white font-sans">
                                    {title}
                                </h4>
                                <p className="text-[11px] font-mono text-zinc-400">
                                    Book ID: <span className="text-zinc-500">{bookId.slice(-8)}</span>
                                </p>
                            </div>
                        </div>

                        {/* Borrow Form */}
                        <form onSubmit={handleConfirmBorrow} className="space-y-4">
                            {/* User Name (Read-Only) */}
                            <div>
                                <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                                    User Name <span className="text-[10px] text-zinc-500 font-normal lowercase">(read-only)</span>
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={session.user.name || "Reader"}
                                    className="w-full rounded-xl border border-zinc-800 bg-[#18181b] p-3.5 text-sm text-zinc-300 font-medium outline-none cursor-not-allowed select-none"
                                />
                            </div>

                            {/* User Email (Read-Only) */}
                            <div>
                                <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                                    User Email <span className="text-[10px] text-zinc-500 font-normal lowercase">(read-only)</span>
                                </label>
                                <input
                                    type="email"
                                    readOnly
                                    value={session.user.email || ""}
                                    className="w-full rounded-xl border border-zinc-800 bg-[#18181b] p-3.5 text-sm text-zinc-300 font-mono outline-none cursor-not-allowed select-none"
                                />
                            </div>

                            {/* Return Date */}
                            <div>
                                <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={todayStr}
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-800 bg-[#18181b] p-3.5 text-sm text-white font-mono outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                />
                                <p className="mt-1 text-[11px] font-mono text-zinc-500">
                                    Standard loan deadline is set to 14 days from today.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-zinc-800/80">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={loading}
                                    className="rounded-xl border border-zinc-800 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-[#e50914] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:bg-[#c90812] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? "Confirming..." : "Confirm Borrow"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
}
