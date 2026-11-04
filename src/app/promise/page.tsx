import LiteraryPromise from "@/components/home/LiteraryPromise";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | The Literary Promise",
  description: "A testament to the transformative power of storytelling and literature.",
};

export default function PromisePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <LiteraryPromise />
    </div>
  );
}

