import FrequentInquiries from "@/components/home/FrequentInquiries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Frequent Inquiries",
  description: "Find clear answers to your most important questions regarding borrowing and contributions.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <FrequentInquiries />
    </div>
  );
}

//✓✓✓

