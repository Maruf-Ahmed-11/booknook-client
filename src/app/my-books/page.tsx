"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

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

const CATEGORIES = [
    "Novel",
    "Philosophy",
    "Psychology",
    "Mystery",
    "Thriller",
    "Sci-Fi",
    "Fantasy",
    "History",
    "Biography",
    "Science",
    "Classic Literature",
    "Self-Help"
];

export default function MyBooksPage() {
    const { data: session, isPending } = authClient.useSession();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit modal states
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [editForm, setEditForm] = useState({
        title: "",
        author: "",
        category: "Novel",
        rating: 5,
        copies: 1,
        description: "",
        image: ""
    });
    const [actionLoading, setActionLoading] = useState(false);

    // Custom Delete confirmation modal states (not browser confirm)
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserBooks = async () => {
            if (!session?.user?.email) return;

            try {
                const token = localStorage.getItem("access-token");
                const res = await fetch("http://localhost:8000/books", {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const allBooks: Book[] = await res.json();
                    // Filter books added by this logged-in user
                    const myBooks = allBooks.filter(b => b.userEmail === session.user.email);
                    setBooks(myBooks);
                }
            } catch (err) {
                console.error("Failed to load your books:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) {
            fetchUserBooks();
        }
    }, [session, isPending]);

    // Open Edit Modal with book details
    const handleOpenEdit = (book: Book) => {
        setEditingBook(book);
        setEditForm({
            title: book.title,
            author: book.author,
            category: book.category,
            rating: book.rating,
            copies: book.copies,
            description: book.description || "",
            image: book.image
        });
        setIsEditOpen(true);
    };

    // Save Edited Book
    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingBook) return;

        setActionLoading(true);
        try {
            const token = localStorage.getItem("access-token");
            const res = await fetch(`http://localhost:8000/books/${editingBook._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...editForm,
                    rating: Number(editForm.rating),
                    copies: Number(editForm.copies)
                })
            });

            if (res.ok) {
                toast.success("Book updated successfully!");
                // Update local state immediately
                setBooks(prev => prev.map(b => b._id === editingBook._id ? {
                    ...b,
                    ...editForm,
                    rating: Number(editForm.rating),
                    copies: Number(editForm.copies)
                } : b));
                setIsEditOpen(false);
                setEditingBook(null);
            } else {
                toast.error("Failed to update book");
            }
        } catch {
            toast.error("An error occurred during update");
        } finally {
            setActionLoading(false);
        }
    };

    // Permanently Delete Book from Database and UI (Executed from Custom Modal)
    const handleConfirmDelete = async () => {
        if (!bookToDelete) return;

        const targetId = bookToDelete._id;
        setDeletingId(targetId);

        try {
            const token = localStorage.getItem("access-token");
            const res = await fetch(`http://localhost:8000/books/${targetId}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                toast.success("Book successfully removed from library archive and database");
                // Immediately excise the book from the UI state
                setBooks(prev => prev.filter(b => b._id !== targetId));
                setBookToDelete(null);
            } else {
                const errorData = await res.json().catch(() => ({}));
                toast.error(errorData.message || "Failed to delete book from database");
            }
        } catch {
            toast.error("An error occurred while deleting the book");
        } finally {
            setDeletingId(null);
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] text-zinc-400 font-mono text-xs uppercase tracking-widest">
                <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"></span>
                    <span>Retrieving Your Curated Archive...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 lg:py-20 selection:bg-[#e50914] selection:text-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                {/* Header Strip */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
                            CURATOR DASHBOARD // PERSONAL INVENTORY
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
                            My Added Books
                        </h1>
                        <p className="mt-2 text-xs md:text-sm text-zinc-400 font-light">
                            Manage the volumes you have contributed to the BookNook global archive.
                        </p>
                    </div>

                    <Link href="/add-book">
                        <button className="rounded-full bg-[#e50914] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(229,9,20,0.45)] transition-all hover:bg-[#c90812] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] hover:scale-105 cursor-pointer">
                            + Add New Book
                        </button>
                    </Link>
                </div>

                {/* Empty State */}
                {books.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-[#0d0d10] py-32 text-center shadow-sm">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-950/60 border border-red-900/60 text-[#e50914]">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">No Books Added By You Yet</h3>
                        <p className="mt-2 text-xs text-zinc-400 max-w-sm font-light">
                            You have not contributed any titles to the library archive under your account ({session?.user?.email}).
                        </p>
                        <Link href="/add-book" className="mt-6">
                            <button className="rounded-full bg-[#e50914] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:bg-[#c90812] cursor-pointer">
                                Add Your First Book
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* 4 Sections Table / Grid Layout */
                    <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d0d10] shadow-[0_0_50px_rgba(0,0,0,0.7)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-800/90 bg-[#121217] text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                                        {/* Section 1: Books */}
                                        <th scope="col" className="py-4 px-6">
                                            1. Books (Cover &amp; Title)
                                        </th>
                                        {/* Section 2: Category */}
                                        <th scope="col" className="py-4 px-6">
                                            2. Category
                                        </th>
                                        {/* Section 3: Copies */}
                                        <th scope="col" className="py-4 px-6 text-center">
                                            3. Copies Added
                                        </th>
                                        {/* Section 4: Action (2 Subsections: Edit & Delete) */}
                                        <th scope="col" className="py-4 px-6 text-right">
                                            4. Actions (Edit &amp; Delete)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/60">
                                    {books.map((book) => (
                                        <tr key={book._id} className="hover:bg-zinc-900/40 transition-colors">

                                            {/* Section 1: Books (Image & Name) */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-18 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 aspect-[3/4]">
                                                        <Image
                                                            src={book.image}
                                                            alt={book.title}
                                                            fill
                                                            sizes="56px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link href={`/books/${book._id}`} className="hover:text-[#e50914] transition-colors">
                                                            <h3 className="font-bold text-white text-base font-sans line-clamp-1" title={book.title}>
                                                                {book.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-xs text-zinc-400 font-mono mt-0.5">By {book.author}</p>
                                                        <span className="text-[10px] text-amber-400 font-mono font-bold mt-1 inline-block">
                                                            ★ {book.rating} / 5.0
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Section 2: Category */}
                                            <td className="py-4 px-6">
                                                <span className="inline-block rounded-md bg-red-950/80 border border-red-800/60 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-red-300">
                                                    {book.category}
                                                </span>
                                            </td>

                                            {/* Section 3: Copies */}
                                            <td className="py-4 px-6 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                                                    <span className={`h-2 w-2 rounded-full ${book.copies > 0 ? "bg-[#e50914]" : "bg-zinc-600"}`}></span>
                                                    <span className="text-xs font-mono font-bold text-white">
                                                        {book.copies} {book.copies === 1 ? "Copy" : "Copies"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Section 4: Action (2 Subsections with high color contrast) */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="inline-flex items-center gap-3">
                                                    {/* Subsection 1: Edit Button (Amber/Gold Contrast) */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenEdit(book)}
                                                        className="rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 transition-all hover:bg-amber-500 hover:text-black hover:shadow-[0_0_15px_rgba(245,158,11,0.35)] cursor-pointer"
                                                        title="Edit Copies, Rating & Details"
                                                    >
                                                        ✎ Edit
                                                    </button>

                                                    {/* Subsection 2: Delete Button (Opens Custom Confirmation Modal) */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setBookToDelete(book)}
                                                        className="rounded-xl border border-red-600/50 bg-[#e50914] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all hover:bg-[#c90812] hover:shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
                                                        title="Delete this book from the database"
                                                    >
                                                        ✕ Delete
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>

            {/* ======================================================== */}
            {/* EDIT BOOK MODAL DIALOG */}
            {/* ======================================================== */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-2xl bg-[#0d0d10] border border-zinc-800 p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#e50914] block mb-1">
                                    INVENTORY MODIFICATION
                                </span>
                                <h3 className="text-xl font-black uppercase text-white tracking-tight">Edit Book Details</h3>
                            </div>
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="text-zinc-400 hover:text-white text-lg font-mono px-2 py-1 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            {/* Uneditable Curator Info */}
                            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#141418] border border-zinc-800 text-[11px] font-mono">
                                <div>
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">CURATOR NAME</span>
                                    <span className="text-zinc-300 font-bold truncate block">{editingBook?.userName || session?.user?.name || "Verified Member"}</span>
                                </div>
                                <div>
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">CURATOR GMAIL</span>
                                    <span className="text-zinc-400 truncate block">{editingBook?.userEmail || session?.user?.email}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Book Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Author</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                        value={editForm.author}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, author: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Category</label>
                                    <select
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] cursor-pointer"
                                        value={editForm.category}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat} className="bg-[#18181b] text-white">
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Rating (1 - 5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        required
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                        value={editForm.rating}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Copies In Stock</label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                        value={editForm.copies}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, copies: Number(e.target.value) }))}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Cover Image URL</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                    value={editForm.image}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">Synopsis</label>
                                <textarea
                                    rows={3}
                                    className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] resize-none"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    className="px-5 py-2.5 rounded-xl border border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="px-6 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#c90812] text-xs font-mono font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] disabled:opacity-50 cursor-pointer"
                                >
                                    {actionLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* CUSTOM DELETE CONFIRMATION MODAL (NOT BROWSER CONFIRM) */}
            {/* ======================================================== */}
            {bookToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md rounded-2xl bg-[#0d0d10] border border-red-950/80 p-6 md:p-8 shadow-[0_0_60px_rgba(229,9,20,0.25)]">

                        {/* Warning Icon & Header */}
                        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-zinc-800/80">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-950/80 border border-red-800/60 text-[#e50914] shadow-inner">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#e50914] block mb-0.5">
                                    DATABASE DELETION
                                </span>
                                <h3 className="text-lg font-black uppercase text-white tracking-tight">Confirm Removal</h3>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                            Are you sure you want to permanently delete this book from the BookNook library archive and database?
                        </p>

                        {/* Book Preview Card */}
                        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#141418] border border-zinc-800/80 mb-6">
                            <div className="relative h-14 w-10 shrink-0 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                                <Image
                                    src={bookToDelete.image}
                                    alt={bookToDelete.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="text-sm font-bold text-white truncate font-sans">{bookToDelete.title}</h4>
                                <p className="text-xs text-zinc-400 font-mono truncate">By {bookToDelete.author}</p>
                                <span className="text-[10px] font-mono text-[#e50914] block mt-0.5">
                                    {bookToDelete.category} • {bookToDelete.copies} {bookToDelete.copies === 1 ? "copy" : "copies"}
                                </span>
                            </div>
                        </div>

                        <p className="text-[11px] font-mono text-zinc-500 mb-6">
                            ⚠️ This action is permanent and cannot be undone.
                        </p>

                        {/* Modal Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setBookToDelete(null)}
                                disabled={deletingId === bookToDelete._id}
                                className="px-5 py-2.5 rounded-xl border border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={deletingId === bookToDelete._id}
                                className="px-6 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#c90812] text-xs font-mono font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(229,9,20,0.5)] disabled:opacity-50 cursor-pointer"
                            >
                                {deletingId === bookToDelete._id ? "Removing..." : "Permanently Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
