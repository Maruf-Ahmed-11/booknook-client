import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import CurationPhilosophy from "@/components/home/CurationPhilosophy";
import SelectedArchive from "@/components/home/SelectedArchive";
import LiteraryPromise from "@/components/home/LiteraryPromise";
import BorrowingProtocol from "@/components/home/BorrowingProtocol";
import FrequentInquiries from "@/components/home/FrequentInquiries";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  copies: number;
  image: string;
  description: string;
}

// Fallback curated books in case Express server is temporarily offline
const fallbackBooks: Book[] = [
  {
    _id: "preview-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Novel",
    rating: 9.6,
    copies: 5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    description: "A timeless tale of ambition, obsession, and the haunting illusion of the American Dream in the Roaring Twenties."
  },
  {
    _id: "preview-2",
    title: "Dune: Master Chronicles",
    author: "Frank Herbert",
    category: "Sci-Fi",
    rating: 9.8,
    copies: 3,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    description: "An epic masterpiece of politics, religion, ecology, and myth on the harsh desert planet of Arrakis."
  },
  {
    _id: "preview-3",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    rating: 10.0,
    copies: 4,
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
    description: "Private stoic reflections of the Roman Emperor on personal virtue, discipline, and emotional sovereignty."
  },
  {
    _id: "preview-4",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    rating: 9.4,
    copies: 2,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    description: "A shocking psychological thriller of a woman’s act of violence against her husband and the therapist obsessed with uncovering her motive."
  },
  {
    _id: "preview-5",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Psychology",
    rating: 9.8,
    copies: 6,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    description: "An evidence-based framework for forming good habits, breaking bad ones, and mastering tiny behaviors that lead to remarkable results."
  },
  {
    _id: "preview-6",
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    category: "Mystery",
    rating: 9.6,
    copies: 3,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop",
    description: "Sherlock Holmes and Dr. Watson investigate the legendary curse of a demonic hound haunting the eerie Devonshire moors."
  },
  {
    _id: "preview-7",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    category: "Fantasy",
    rating: 9.8,
    copies: 4,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop",
    description: "Noble houses battle for dominion over the Iron Throne in a brutal fantasy world where winter is perpetual and treacherous."
  },
  {
    _id: "preview-8",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    rating: 9.6,
    copies: 5,
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop",
    description: "A groundbreaking journey examining how an unremarkable ape conquered the globe through shared myths, commerce, and science."
  }
];

export default async function HomePage() {
  let displayBooks = fallbackBooks;

  try {
    const res = await fetch("http://localhost:8000/books", {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });
    if (res.ok) {
      const liveBooks: Book[] = await res.json();
      if (liveBooks && liveBooks.length > 0) {
        displayBooks = liveBooks.slice(0, 8);
      }
    }
  } catch {
    // Graceful fallback to preview books
  }

  return (
    <div className="bg-[#050505] text-white selection:bg-[#e50914] selection:text-white overflow-hidden">
      {/* 1. Hero Showcase with Swiper.js Slider on Right */}
      <Hero />

      {/* 2. New Arrivals (Dynamic 6 Latest Books with MongoDB sort & limit) */}
      <NewArrivals />

      {/* 3. Curation Philosophy & Purity Ratings */}
      <CurationPhilosophy />

      {/* 4. Selected Archive Grid with Category Filtering & Rich Details */}
      <SelectedArchive books={displayBooks} />

      {/* 5. Cinematic Quote Banner */}
      <LiteraryPromise />

      {/* 6. 4-Step Borrowing Protocol */}
      <BorrowingProtocol />

      {/* 7. Frequently Asked Questions */}
      <FrequentInquiries />
    </div>
  );
}

//✓✓✓