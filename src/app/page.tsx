import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#3b0764]">
      <section className="flex-grow flex items-center py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-serif">
              Welcome to BookNook
            </h1>
            <p className="text-lg md:text-xl mb-10 text-purple-200 leading-relaxed">
              Your personal digital library. Browse our collection, borrow your favorite titles, and manage your reading list all in one place.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/books"
                className="px-8 py-3.5 bg-white text-[#4c1d95] font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg"
              >
                Explore All Books
              </Link>
              <Link
                href="/add-book"
                className="px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all"
              >
                Contribute a Book
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}