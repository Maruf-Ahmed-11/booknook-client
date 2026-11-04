"use client";

import { useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    // Automatically sync Express JWT to localStorage for Google/GitHub/Email logins
    useEffect(() => {
        const syncJWT = async () => {
            if (session?.user?.email) {
                const existingToken = localStorage.getItem("access-token");
                if (!existingToken) {
                    try {
                        const res = await fetch("http://localhost:8000/jwt", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: session.user.email }),
                        });
                        const data = await res.json();
                        if (data.token) {
                            localStorage.setItem("access-token", data.token);
                        }
                    } catch (error) {
                        console.error("Failed to auto-sync JWT:", error);
                    }
                }
            }
        };
        syncJWT();
    }, [session]);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    localStorage.removeItem("access-token"); // Clear Express JWT
                    toast.success("Logged out successfully");
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    return (
        <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-zinc-800/80">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e50914] text-white font-extrabold shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-transform group-hover:scale-105">
                        B
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white font-serif">
                        BookNook<span className="text-[#e50914]">.</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/books" className="hover:text-white transition-colors">All Books</Link>
                    {session && (
                        <>
                            <Link href="/add-book" className="hover:text-white transition-colors">Add Book</Link>
                            <Link href="/my-books" className="hover:text-white transition-colors">My Books</Link>
                            <Link href="/my-borrows" className="hover:text-white transition-colors">Borrowed Books</Link>
                        </>
                    )}
                </nav>

                {/* Auth Actions */}
                <div className="flex items-center gap-4">
                    {isPending ? (
                        <div className="h-8 w-20 animate-pulse rounded-lg bg-zinc-800"></div>
                    ) : session?.user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2.5">
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Avatar"
                                        width={32}
                                        height={32}
                                        unoptimized
                                        className="h-8 w-8 rounded-full object-cover border border-zinc-700"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-950/60 border border-red-900/60 text-xs font-bold text-red-400">
                                        {session.user.name?.[0] || "U"}
                                    </div>
                                )}
                                <span className="hidden text-sm font-medium text-zinc-300 lg:inline-block">{session.user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 transition-all hover:bg-zinc-900 hover:text-red-500 hover:border-red-900/40 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <button className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-300 transition-all hover:text-white cursor-pointer">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="rounded-xl bg-[#e50914] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#c90812] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] cursor-pointer">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}
