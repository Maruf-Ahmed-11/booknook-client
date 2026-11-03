"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await authClient.signIn.email({ email, password }, {
            onSuccess: async () => {
                // 2. Fetch and store the token before redirecting
                await fetchAndStoreJWT(email);

                toast.success("Logged in successfully!");
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Failed to log in");
                setLoading(false);
            },
        });
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border">
                <h1 className="text-2xl font-bold text-center mb-6">Login to BookNook</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" required className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" required className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="mt-4">
                    <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
                        Login with Google
                    </button>
                </div>
                <p className="text-center mt-4 text-sm">
                    Don&apos;t have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}