"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // GLOBAL LISTENER: Catch social logins and fetch the Express JWT silently
  useEffect(() => {
    const syncToken = async () => {
      // If the user is logged into BetterAuth but has no Express token
      if (session?.user?.email && !localStorage.getItem("access-token")) {
        try {
          const res = await fetch("http://localhost:8000/jwt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
          });
          const data = await res.json();
          if (data.token) {
            localStorage.setItem("access-token", data.token);
            console.log("Express JWT synced via Navbar listener!");
          }
        } catch (error) {
          console.error("Failed to fetch Express JWT:", error);
        }
      }
    };
    
    syncToken();
  }, [session?.user?.email]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Clear the token so the next user starts fresh
          localStorage.removeItem("access-token");
          toast.success("Logged out successfully");
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm text-gray-800">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        <Link href="/" className="text-2xl font-bold tracking-wide font-serif text-gray-900 flex items-center gap-2">
          <span className="bg-[#8b5cf6] p-1.5 rounded-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </span>
          BookNook
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
          <Link href="/books" className="text-gray-500 hover:text-gray-900 transition-colors">All Books</Link>
          
          {!isPending && session ? (
            <>
              <Link href="/add-book" className="text-gray-500 hover:text-gray-900 transition-colors">Add Book</Link>
              <Link href="/my-borrows" className="text-gray-500 hover:text-gray-900 transition-colors">Borrowed Books</Link>
              
              <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
                <Image 
                  src={session.user.image || "https://github.com/shadcn.png"} 
                  alt="User Avatar" 
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-200 object-cover"
                  title={session.user.name}
                />
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full">
                  Logout
                </Button>
              </div>
            </>
          ) : !isPending && (
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-full px-5 border-gray-300 text-gray-700 hover:bg-gray-50 shadow-none">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-[#8b5cf6] text-white hover:bg-[#7c3aed] rounded-full px-5 shadow-md transition-all">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}