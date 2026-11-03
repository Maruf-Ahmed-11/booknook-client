"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

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
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8b5cf6] text-white font-bold shadow-sm">
                        B
                    </div>
                    <span className="text-xl font-bold text-gray-900 font-serif">BookNook</span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-[#8b5cf6] transition-colors">Home</Link>
                    <Link href="/books" className="hover:text-[#8b5cf6] transition-colors">All Books</Link>
                    {session && (
                        <>
                            <Link href="/add-book" className="hover:text-[#8b5cf6] transition-colors">Add Book</Link>
                            <Link href="/my-borrows" className="hover:text-[#8b5cf6] transition-colors">Borrowed Books</Link>
                        </>
                    )}
                </nav>

                {/* Auth Actions */}
                <div className="flex items-center gap-4">
                    {isPending ? (
                        <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-100"></div>
                    ) : session?.user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Avatar"
                                        width={32}
                                        height={32}
                                        unoptimized
                                        className="h-8 w-8 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-[#8b5cf6]">
                                        {session.user.name?.[0] || "U"}
                                    </div>
                                )}
                                <span className="hidden text-sm font-medium text-gray-700 lg:inline-block">{session.user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <button className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:text-[#8b5cf6]">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="rounded-xl bg-[#8b5cf6] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#7c3aed]">
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