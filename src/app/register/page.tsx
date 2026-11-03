"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validatePassword = (pass: string) => {
        if (pass.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(pass)) return "Password must have an Uppercase letter";
        if (!/[a-z]/.test(pass)) return "Password must have a Lowercase letter";
        return null;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }
        setLoading(true);

        await authClient.signUp.email({ email, password, name, image: photoURL }, {
            onSuccess: () => {
                toast.success("Registered successfully! Please log in.");
                router.push("/login");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Failed to register");
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
                <h1 className="text-2xl font-bold text-center mb-6">Register for BookNook</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" required className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" required className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Photo URL</label>
                        <input type="url" required className="w-full p-2 border rounded" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" required className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <div className="mt-4">
                    <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
                        Register with Google
                    </button>
                </div>
                <p className="text-center mt-4 text-sm">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}