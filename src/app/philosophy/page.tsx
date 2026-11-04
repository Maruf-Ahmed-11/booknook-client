import CurationPhilosophy from "@/components/home/CurationPhilosophy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Curation Philosophy",
  description: "Learn about the standards and literary philosophy behind the BookNook collection.",
};

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <CurationPhilosophy />
    </div>
  );
}

