import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to BookNook
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Your personal digital library. Browse our collection, borrow your favorite titles, and manage your reading list all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/books" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100">
              Explore All Books
            </Link>
            <Link href="/add-book" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-600">
              Contribute a Book
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}