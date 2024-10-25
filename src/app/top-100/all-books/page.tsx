import BookList from "@/components/BookList";
import Link from "next/link";

// Assuming this is at the top of your page.tsx file
interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  people: number; // Change this to an array of strings
  amazon_link: string;
  apple_link: string;
}

export default async function BooksPage() {
  const res = await fetch("http://localhost:8000/books");
  const data = await res.text(); // Get raw response as text

  let books: Book[];
  try {
    books = JSON.parse(data);
    if (!Array.isArray(books)) {
      throw new Error("Fetched data is not an array");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error, data);
    books = [];
  }
  console.log(books);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 relative overflow-hidden">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <Link href="/" className="text-blue-600 hover:text-blue-800 text-lg font-bold">
              GOOD BOOKS
            </Link> */}
          </div>
        </nav>
      </header>
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Top 100 Books of All Time</h1>
          <div className="flex justify-center space-x-4">
            <Link
              href="/all-books"
              className="text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
            <Link href="/fiction" className="text-blue-600 hover:text-blue-800">
              Fiction
            </Link>
            <Link
              href="/non-fiction"
              className="text-blue-600 hover:text-blue-800"
            >
              Non-Fiction
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-600">
              These are the top 100 most recommended books from the world&apos;s
              most successful and interesting people.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800">
              <i className="fas fa-link"></i>
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-linkedin"></i>
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-facebook"></i>
            </button>
          </div>
        </div>
        <BookList books={books} />
      </div>
    </div>
  );
}
