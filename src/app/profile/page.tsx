"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    localStorage.removeItem("access-token");
                    toast.success("Logged out successfully");
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#050505] text-zinc-400 font-mono text-xs uppercase tracking-widest">
                <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"></span>
                    <span>Retrieving Member Dossier...</span>
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#050505] text-white p-4 text-center">
                <h2 className="text-2xl font-bold">Session Expired</h2>
                <p className="text-xs text-zinc-400 mt-2 font-mono">Please log in to access your profile archive.</p>
                <Link
                    href="/login"
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#e50914] text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-[#c90812]"
                >
                    Log In →
                </Link>
            </div>
        );
    }

    // Format member since date
    const memberSince = session.user.createdAt
        ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
        : "October 29, 2026";

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#050505] p-4 md:p-8 selection:bg-[#e50914] selection:text-white relative overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.08),transparent_70%)] pointer-events-none blur-3xl"></div>

            {/* Profile Card (matching uploaded example layout) */}
            <div className="relative z-10 w-full max-w-[440px] rounded-3xl bg-[#0d0d10] border border-zinc-800/90 p-8 md:p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.85)]">

                {/* Top Eyebrow Tag */}
                <div className="mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] px-3 py-1 rounded-full bg-red-950/60 border border-red-900/60 inline-block">
                        VERIFIED READER
                    </span>
                </div>

                {/* Circular Profile Photo */}
                <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-zinc-700/80 bg-zinc-900 shadow-xl group">
                    {session.user.image ? (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || "Member Photo"}
                            fill
                            sizes="112px"
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-red-950/60 text-3xl font-bold text-red-300 font-mono">
                            {session.user.name?.[0] || "U"}
                        </div>
                    )}
                </div>

                {/* Name & Email (Exact matches for example image) */}
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    {session.user.name}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-mono">
                    {session.user.email}
                </p>

                {/* Member Since Strip */}
                <p className="mt-4 text-xs text-zinc-500 font-mono">
                    Member since {memberSince}
                </p>

                {/* Quick Navigation Shortcuts */}
                <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs font-mono font-bold uppercase tracking-wider">
                    <Link
                        href="/my-borrows"
                        className="rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 transition-all"
                    >
                        Borrowed Books
                    </Link>
                    <Link
                        href="/my-books"
                        className="rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 transition-all"
                    >
                        My Added Books
                    </Link>
                </div>

                {/* Logout Button */}
                <div className="mt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-xl border border-red-900/60 bg-red-950/30 py-3 text-xs font-mono font-bold uppercase tracking-wider text-red-400 hover:bg-[#e50914] hover:text-white transition-all cursor-pointer shadow-sm"
                    >
                        Logout from Account
                    </button>
                </div>

            </div>
        </div>
    );
}

