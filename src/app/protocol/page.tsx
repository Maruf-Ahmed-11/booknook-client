import BorrowingProtocol from "@/components/home/BorrowingProtocol";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Borrowing Protocol",
  description: "How lending, 14-day checkout periods, and returns function at BookNook.",
};

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <BorrowingProtocol />
    </div>
  );
}

//✓✓✓