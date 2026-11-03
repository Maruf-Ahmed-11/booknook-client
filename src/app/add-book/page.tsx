"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddBookPage() {
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Capture the form reference immediately before any async code runs
        const form = e.currentTarget;
        const formData = new FormData(form);

        const bookData = {
            title: formData.get("title"),
            author: formData.get("author"),
            category: formData.get("category"),
            rating: Number(formData.get("rating")),
            copies: Number(formData.get("quantity")),
            image: formData.get("image"),
            description: formData.get("description"),
            addedBy: session?.user?.email || "unknown",
        };

        try {
            const token = localStorage.getItem("access-token") || "";

            const response = await fetch("http://localhost:8000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookData),
            });

            const data = await response.json();

            if (response.ok && data.insertedId) {
                toast.success("Book successfully added to the database!");
                // Use the safely captured form variable here
                form.reset();
            } else {
                toast.error(data.message || "Failed to add book. Are you authorized?");
            }
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Could not connect to the Express server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 font-serif">Add a New Book</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                        <input type="text" name="title" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="e.g., Dune" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                        <input type="text" name="author" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="e.g., Frank Herbert" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white">
                            <option value="">Select a category</option>
                            <option value="Novel">Novel</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="History">History</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                        <input type="number" name="rating" min="1" max="5" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="e.g., 4" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input type="number" name="quantity" min="1" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="e.g., 10" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input type="url" name="image" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="https://..." />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea name="description" rows={4} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none" placeholder="Brief summary of the book..."></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#8b5cf6] text-white font-semibold p-3.5 rounded-lg hover:bg-[#7c3aed] disabled:opacity-50 transition-colors shadow-sm"
                >
                    {loading ? "Capturing..." : "Add Book"}
                </button>
            </form>
        </div>
    );
}