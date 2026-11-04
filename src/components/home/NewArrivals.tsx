import Link from "next/link";
import Image from "next/image";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  rating?: number;
  copies?: number;
  image: string;
  description?: string;
  userName?: string;
  userEmail?: string;
}

// 6 Fallback books in case database is offline or empty during dev
const fallbackLatestBooks: Book[] = [
  {
    _id: "latest-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Novel",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "latest-2",
    title: "Dune: Master Chronicles",
    author: "Frank Herbert",
    category: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "latest-3",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "latest-4",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "latest-5",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Biography",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "latest-6",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    category: "Fantasy",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop"
  }
];

export default async function NewArrivals() {
  let books: Book[] = fallbackLatestBooks;

  try {
    // Queries MongoDB newest books first with sort and limit (http://localhost:8000/books?sort=newest&limit=6)
    const res = await fetch("http://localhost:8000/books?sort=newest&limit=6", {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });

    if (res.ok) {
      const data: Book[] = await res.json();
      if (data && data.length > 0) {
        books = data.slice(0, 6);
      }
    }
  } catch {
    // Graceful fallback to preview books
  }

  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#050505] selection:bg-[#e50914] selection:text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2 block">
              RECENT ADDITIONS // FRESH FROM DATABASE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              New Arrivals
            </h2>
            <p className="mt-2 text-xs md:text-sm text-zinc-400 font-light">
              The latest 6 literature additions to the BookNook digital library.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"></span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Live Database Feed
            </span>
          </div>
        </div>

        {/* 6 Books Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="group flex flex-col bg-[#0d0d10] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#e50914]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(229,9,20,0.15)]"
            >
              {/* Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-80"></div>

                {/* Category Pill */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-800/60 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                    {book.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 font-sans" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">{book.author}</p>

                {/* Curator Tag */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 truncate">
                  <span className="text-[#e50914]">✦</span>
                  <span className="truncate">Curated by: {book.userName || book.userEmail || "BookNook Archive"}</span>
                </div>

                {/* View Details Button */}
                <div className="mt-auto pt-6 border-t border-zinc-800/80">
                  <Link
                    href={book._id.startsWith("latest") ? "/books" : `/books/${book._id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#e50914] hover:border-[#e50914] py-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "See All Books" Button Below Cards */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex justify-center">
          <Link
            href="/books"
            className="px-10 py-4 bg-[#e50914] hover:bg-[#c90812] text-white font-bold text-xs font-mono uppercase tracking-[0.2em] rounded-full transition-all shadow-[0_0_25px_rgba(229,9,20,0.45)] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] hover:scale-105 cursor-pointer"
          >
            See All Books →
          </Link>
        </div>

      </div>
    </section>
  );
}

//✓✓✓