import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookNook | Digital Library Archive",
  description: "Curated digital library for timeless literature and modern masterpieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#050505] text-zinc-100 antialiased selection:bg-red-600 selection:text-white`}>
        <Navbar />
        <main className="min-h-screen bg-[#050505]">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
