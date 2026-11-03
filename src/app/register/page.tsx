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

    // 1. Helper function to get the JWT from Express
    const fetchAndStoreJWT = async (userEmail: string) => {
        try {
            const res = await fetch("http://localhost:8000/jwt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

        // BetterAuth registration requires a name alongside email and password
        await authClient.signUp.email({ email, password, name }, {
            onSuccess: async () => {
                // 2. Fetch and store the Express token immediately upon registration
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 font-serif">Join BookNook</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                        <input type="text" required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                        <input type="email" required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                        {/* BetterAuth defaults to an 8 character minimum for passwords */}
                        <input type="password" required minLength={8} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#8b5cf6] text-white p-2.5 rounded font-semibold hover:bg-[#7c3aed] disabled:opacity-50 transition-colors shadow-sm">
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <div className="mt-5">
                    <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2.5 rounded font-semibold hover:bg-red-600 transition-colors shadow-sm">
                        Register with Google
                    </button>
                </div>

                <p className="text-center mt-6 text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-[#8b5cf6] font-medium hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}