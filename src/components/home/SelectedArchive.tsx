import Link from "next/link";
import Image from "next/image";

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

interface SelectedArchiveProps {
  books: Book[];
}

export default function SelectedArchive({ books }: SelectedArchiveProps) {
  return (
    <section className="py-24 md:py-32 border-b border-zinc-900 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-900 pb-8">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#e50914] mb-2">
              02 {"//"} SELECTED ARCHIVE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              SELECTED BOOKS CRAFTED <br />
              <span className="text-zinc-500">WITH PURPOSE AND DEPTH.</span>
            </h2>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full border border-zinc-800 hover:border-red-600/50 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all self-start md:self-auto cursor-pointer"
          >
            Browse Full Catalog ({books.length}+) →
          </Link>
        </div>

        {/* Grid of Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {books.map((book, idx) => (
            <div
              key={book._id}
              className="group flex flex-col bg-[#0d0d10] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#e50914]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(229,9,20,0.15)]"
            >
              {/* Book Image with Aspect Ratio */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-80"></div>

                {/* Corner Index Number Badge */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-mono text-zinc-400">
                  0{idx + 1}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-bold text-amber-400">
                  ★ {book.rating}
                </div>

                {/* Category Pill Over Image Bottom */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-800/60 text-[9px] font-mono font-bold uppercase tracking-wider text-red-300">
                    {book.category}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">{book.author}</p>

                <p className="text-xs text-zinc-500 mt-3 line-clamp-2 leading-relaxed">
                  {book.description}
                </p>

                {/* Footer & Details Link */}
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${book.copies > 0 ? "bg-[#e50914]" : "bg-zinc-600"}`}></span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {book.copies > 0 ? `${book.copies} Copies` : "Restocking"}
                    </span>
                  </div>

                  <Link
                    href={book._id.startsWith("preview") ? "/books" : `/books/${book._id}`}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-[#e50914] transition-colors"
                  >
                    Inspect →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

