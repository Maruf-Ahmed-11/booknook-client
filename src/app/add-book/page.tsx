"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AddBookPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "Novel",
        rating: 5,
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
        setLoading(true);

        try {
            const token = localStorage.getItem("access-token");

            const res = await fetch("http://localhost:8000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Book added to library successfully!");
                router.push("/books");
                router.refresh();
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to add book");
            }
        } catch (error) {
            toast.error("An error occurred while adding the book");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4 md:p-8">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-[#18181b] shadow-2xl">

                {/* Left Side: Inspiration Image */}
                <div className="hidden w-2/5 relative lg:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-10 text-white">
                        <h2 className="mb-2 text-3xl font-bold">Grow the Library</h2>
                        <p className="text-sm text-gray-300">Add new literary adventures for everyone to discover and borrow.</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full p-8 lg:w-3/5 lg:p-12">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-white">Add New Book</h1>
                        <Link href="/books" className="text-sm font-medium text-gray-400 hover:text-[#8b5cf6] transition-colors">
                            Cancel
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Book Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="e.g. The Great Gatsby"
                                    className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6]"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    required
                                    placeholder="e.g. F. Scott Fitzgerald"
                                    className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6]"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Category</label>
                                <select
                                    name="category"
                                    className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6] appearance-none"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="Novel">Novel</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="History">History</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Biography">Biography</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="1" max="5"
                                        required
                                        className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6]"
                                        value={formData.rating}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Copies</label>
                                    <input
                                        type="number"
                                        name="copies"
                                        min="1"
                                        required
                                        className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6]"
                                        value={formData.copies}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Cover Image URL</label>
                            <input
                                type="url"
                                name="image"
                                required
                                placeholder="https://example.com/book-cover.jpg"
                                className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6]"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Synopsis</label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                placeholder="A brief summary of the book..."
                                className="w-full rounded-xl bg-[#27272a] p-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-[#8b5cf6] resize-none"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full rounded-xl bg-[#8b5cf6] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#7c3aed] disabled:opacity-50"
                        >
                            {loading ? "Adding Book..." : "Add Book to Library"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}