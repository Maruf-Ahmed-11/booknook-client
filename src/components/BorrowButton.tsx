"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface BorrowButtonProps {
    bookId: string;
    title: string;
    image: string;
    category: string;
    isAvailable: boolean;
}

export default function BorrowButton({ bookId, title, image, category, isAvailable }: BorrowButtonProps) {
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const handleBorrow = async () => {
        if (!session?.user) {
            toast.error("Please log in to borrow books");
            router.push("/login");
            return;
        }

        setLoading(true);

        try {
            // Setup the dates (borrowed today, return in 14 days)
            const borrowDate = new Date().toISOString();
            const returnDate = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString();

            const res = await fetch("http://localhost:8000/borrows", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Pass the JWT to your Express server's verifyToken middleware
                    "authorization": `Bearer ${localStorage.getItem("access-token")}`
                },
                body: JSON.stringify({
                    bookId,
                    userEmail: session.user.email,
                    userName: session.user.name,
                    title,
                    image,
                    category,
                    borrowDate,
                    returnDate
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // This catches your backend's "You have already borrowed this book!" error
                toast.error(data.message || "Failed to borrow book");
            } else {
                toast.success("Book added to your library!");
                router.refresh(); // Automatically re-fetches the server page to update the copy count instantly
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleBorrow}
            disabled={!isAvailable || loading}
            className="w-full md:w-auto px-9 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] text-white transition-all shadow-[0_0_25px_rgba(229,9,20,0.4)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none bg-[#e50914] hover:bg-[#c90812] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] cursor-pointer"
        >
            {!isAvailable ? 'Out of Stock' : loading ? 'Reserving...' : 'Borrow this Volume'}
        </button>
    );
}
