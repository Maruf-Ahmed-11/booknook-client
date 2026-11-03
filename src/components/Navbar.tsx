"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
    // BetterAuth provides this hook to automatically check if the user is logged in
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/login");
                },
            },
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo area */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    BookNook
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                    <Link href="/"><Button variant="ghost">Home</Button></Link>
                    <Link href="/books"><Button variant="ghost">All Books</Button></Link>

                    {/* Conditional Rendering based on Auth state */}
                    {!isPending && session ? (
                        <>
                            <Link href="/add-book"><Button variant="ghost">Add Book</Button></Link>
                            <Link href="/my-borrows"><Button variant="ghost">Borrowed Books</Button></Link>

                            <div className="flex items-center gap-3 ml-2 border-l pl-4">
                                <Image
                                    src={session.user.image || "https://github.com/shadcn.png"}
                                    alt="User Avatar"
                                    width={32}
                                    height={32}
                                    className="rounded-full border object-cover"
                                    title={session.user.name}
                                />
                                <Button variant="destructive" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : !isPending && (
                        <div className="flex items-center gap-2 ml-2 border-l pl-4">
                            <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
                            <Link href="/register"><Button size="sm">Register</Button></Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}