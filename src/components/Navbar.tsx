"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        setIsDropdownOpen(false);
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
                        <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-800"></div>
                    ) : session?.user ? (
                        /* User Photo with Dropdown */
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(prev => !prev)}
                                aria-label="Toggle user profile menu"
                                className="flex items-center gap-2 rounded-full p-0.5 border-2 border-zinc-700/80 hover:border-[#e50914] transition-all focus:outline-none focus:ring-2 focus:ring-[#e50914] cursor-pointer"
                            >
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "User Avatar"}
                                        width={34}
                                        height={34}
                                        unoptimized
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-950/80 text-xs font-bold text-red-300 font-mono">
                                        {session.user.name?.[0] || "U"}
                                    </div>
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#0d0d10] border border-zinc-800 p-2 shadow-[0_15px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {/* User Name & Email Header */}
                                    <div className="px-3 py-2.5 border-b border-zinc-800/80">
                                        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e50914] mb-1">
                                            ACTIVE ACCOUNT
                                        </p>
                                        <p className="text-sm font-bold text-white truncate font-sans">
                                            {session.user.name}
                                        </p>
                                        <p className="text-xs text-zinc-400 font-mono truncate mt-0.5">
                                            {session.user.email}
                                        </p>
                                    </div>

                                    {/* Links */}
                                    <div className="py-2 space-y-1">
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            My Profile
                                        </Link>
                                    </div>

                                    {/* Logout Action */}
                                    <div className="pt-2 border-t border-zinc-800/80">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-red-400 hover:text-white hover:bg-[#e50914] transition-all cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
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
