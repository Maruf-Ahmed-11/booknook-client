"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const BOOK_CATEGORIES = [
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

export default function AddBookPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "Novel",
        rating: 10,
        copies: 1,
        image: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            // Ensure rating and copies are stored as numbers for MongoDB
            [name]: name === "rating" || name === "copies" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image.trim()) {
            toast.error("Please enter a valid Cover Image URL");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Adding book to library...");

        try {
            const token = localStorage.getItem("access-token");

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    userName: session?.user?.name || "Library Member",
                    userEmail: session?.user?.email || "",
                }),
            });

            if (res.ok) {
                toast.success("Book added successfully!", { id: toastId });
                router.push("/my-books");
                router.refresh();
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to add book", { id: toastId });
            }
        } catch (error) {
            toast.error("An error occurred while adding the book", { id: toastId });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#050505] p-4 md:p-8">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-[#0d0d10] border border-zinc-800/80 shadow-[0_0_60px_rgba(0,0,0,0.9)]">

                {/* Left Side: Library Image */}
                <div className="hidden w-2/5 relative lg:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-10 text-white z-10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
                            CURATOR PROTOCOL
                        </span>
                        <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-white font-sans">
                            Grow the Library
                        </h2>
                        <p className="text-xs text-zinc-400 font-light leading-relaxed">
                            Add new literary adventures for everyone in the community to discover, inspect, and borrow.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full p-8 lg:w-3/5 lg:p-12 bg-[#0d0d10]">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] block mb-1">
                                NEW VOLUME ENTRY
                            </span>
                            <h1 className="text-3xl font-black uppercase tracking-tight text-white">Add New Book</h1>
                        </div>
                        <Link href="/books" className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-[#e50914] transition-colors">
                            Cancel
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Uneditable Curator Login Info (Auto-genarated & Locked) */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl bg-[#141418] p-4 border border-zinc-800/80">
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                                        Curator Name
                                    </label>
                                    <span className="text-[9px] font-mono uppercase text-[#e50914] bg-red-950/60 border border-red-900/40 px-1.5 py-0.5 rounded">
                                        🔒 Auto-Generated
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    disabled
                                    value={session?.user?.name || "Library Member"}
                                    className="w-full rounded-lg bg-[#0d0d10] border border-zinc-800/80 p-2.5 text-xs text-zinc-300 font-mono cursor-not-allowed select-none opacity-85"
                                    title="Uneditable: Automatically generated from your login session"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                                        Curator Email
                                    </label>
                                    <span className="text-[9px] font-mono uppercase text-[#e50914] bg-red-950/60 border border-red-900/40 px-1.5 py-0.5 rounded">
                                        🔒 Auto-Generated
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    readOnly
                                    disabled
                                    value={session?.user?.email || "Loading..."}
                                    className="w-full rounded-lg bg-[#0d0d10] border border-zinc-800/80 p-2.5 text-xs text-zinc-300 font-mono cursor-not-allowed select-none opacity-85"
                                    title="Uneditable: Automatically generated from your login session"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Book Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="e.g. The Great Gatsby"
                                    className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    required
                                    placeholder="e.g. F. Scott Fitzgerald"
                                    className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Category</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] cursor-pointer"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        {BOOK_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat} className="bg-[#18181b] text-white py-1">
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Rating (1-10)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="1" max="10"
                                        required
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                        value={formData.rating}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Copies</label>
                                    <input
                                        type="number"
                                        name="copies"
                                        min="1"
                                        required
                                        className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                        value={formData.copies}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Direct Cover Image URL Field */}
                        <div>
                            <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                                Cover Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                required
                                placeholder="https://images.unsplash.com/photo-..."
                                className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                value={formData.image}
                                onChange={handleChange}
                            />

                            {/* Live Thumbnail Preview if valid image URL */}
                            {formData.image.trim() && (
                                <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-[#141418] border border-zinc-800">
                                    <div className="relative h-14 w-10 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                                        <Image
                                            src={formData.image}
                                            alt="Cover preview"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                                            Cover Preview
                                        </span>
                                        <p className="text-xs font-mono text-zinc-300 truncate mt-0.5">
                                            {formData.image}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Synopsis</label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                placeholder="A brief summary of the book..."
                                className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] resize-none"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full rounded-xl bg-[#e50914] py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#c90812] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Adding Book..." : "Add Book to Library"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

//✓✓✓
