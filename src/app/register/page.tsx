"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchAndStoreJWT = async (userEmail: string) => {
        try {
            const res = await fetch("http://localhost:8000/jwt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem("access-token", data.token);
            }
        } catch (error) {
            console.error("Failed to fetch Express JWT:", error);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await authClient.signUp.email({ email, password, name }, {
            onSuccess: async () => {
                await fetchAndStoreJWT(email);
                toast.success("Account created successfully!");
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Failed to create account");
                setLoading(false);
            },
        });
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    };

    const handleGithubLogin = async () => {
        await authClient.signIn.social({ provider: "github", callbackURL: "/" });
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#050505] p-4 md:p-8">
            <div className="flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-[#0d0d10] border border-zinc-800/80 shadow-[0_0_60px_rgba(0,0,0,0.9)]">

                {/* Left Side: Moody Cinematic Library Stacks */}
                <div className="hidden w-1/2 relative md:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2000&auto=format&fit=crop')" }}
                    ></div>
                    {/* Dark gradient to blend text with image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-10 text-white z-10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
                            01 // MEMBERSHIP ENROLLMENT
                        </span>
                        <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-white font-sans">
                            Discover New Worlds
                        </h2>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-xs font-light">
                            Join the BookNook archive today to reserve, read, and explore handpicked literature from around the globe.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full p-8 md:w-1/2 lg:p-12 bg-[#0d0d10]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] block mb-2">
                        REGISTRATION
                    </span>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white">Create an account</h1>
                    <p className="mt-2 text-xs text-zinc-400">
                        Already have an account? <Link href="/login" className="text-[#e50914] font-medium hover:underline">Log in</Link>
                    </p>

                    <form onSubmit={handleRegister} className="mt-8 space-y-4">
                        <div>
                            <input
                                type="text"
                                required
                                placeholder="Full Name"
                                className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                minLength={8}
                                placeholder="Enter your password (min 8 characters)"
                                className="w-full rounded-xl bg-[#18181b] border border-zinc-800 p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full rounded-xl bg-[#e50914] py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#c90812] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs font-mono uppercase">
                            <span className="bg-[#0d0d10] px-4 text-zinc-500">Or register with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#141418] py-3 text-xs font-semibold text-zinc-300 transition-all hover:bg-[#1c1c22] hover:border-zinc-700 cursor-pointer"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.064 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={handleGithubLogin}
                            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#141418] py-3 text-xs font-semibold text-zinc-300 transition-all hover:bg-[#1c1c22] hover:border-zinc-700 cursor-pointer"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
