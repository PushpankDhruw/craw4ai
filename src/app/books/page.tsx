'use client'
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Book,
  Palette,          // Arts & Entertainment
  User,             // Biographies & Memoirs
  Briefcase,        // Business & Management
  PenTool,          // Design
  DollarSign,       // Economics & Politics, Money & Investing
  Globe,            // History, Economics & Politics
  HeartPulse,       // Health & Fitness
  Atom,             // Science & Nature
  Brain,            // Psychology, Self-Improvement
  Compass,          // Philosophy, Spirituality & Religion
  Code,             // Technology
  Bookmark,         // Non-Fiction, Fiction, Poetry
} from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  people: number;
  amazon_link: string;
  apple_link: string;
}

interface PaginatedResponse {
  total_count: number;
  total_pages: number;
  current_page: number;
  books: Book[];
}

const categories = [
  "all-books",
  "arts-entertainment",
  "biographies-memoirs",
  "business-management",
  "design",
  "economics-politics",
  "fiction",
  "health-fitness",
  "history",
  "money-investing",
  "non-fiction",
  "philosophy",
  "poetry",
  "psychology",
  "science-nature",
  "self-improvement",
  "spirituality-religion",
  "technology",
];

// Mapping categories to relevant icons
const categoryIcons: { [key: string]: JSX.Element } = {
  "all-books": <Book className="h-4 w-4 mr-2" />,
  "arts-entertainment": <Palette className="h-4 w-4 mr-2" />,
  "biographies-memoirs": <User className="h-4 w-4 mr-2" />,
  "business-management": <Briefcase className="h-4 w-4 mr-2" />,
  "design": <PenTool className="h-4 w-4 mr-2" />,
  "economics-politics": <DollarSign className="h-4 w-4 mr-2" />,
  "fiction": <Bookmark className="h-4 w-4 mr-2" />,
  "health-fitness": <HeartPulse className="h-4 w-4 mr-2" />,
  "history": <Globe className="h-4 w-4 mr-2" />,
  "money-investing": <DollarSign className="h-4 w-4 mr-2" />,
  "non-fiction": <Bookmark className="h-4 w-4 mr-2" />,
  "philosophy": <Compass className="h-4 w-4 mr-2" />,
  "poetry": <Bookmark className="h-4 w-4 mr-2" />,
  "psychology": <Brain className="h-4 w-4 mr-2" />,
  "science-nature": <Atom className="h-4 w-4 mr-2" />,
  "self-improvement": <Brain className="h-4 w-4 mr-2" />,
  "spirituality-religion": <Compass className="h-4 w-4 mr-2" />,
  "technology": <Code className="h-4 w-4 mr-2" />,
};

export default function BooksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "all-books";
  const pageSize = 25;

  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const endpoint =
        category === "all-books"
          ? `http://localhost:8000/all-books?page=${page}&page_size=${pageSize}`
          : `http://localhost:8000/categories/${category}?page=${page}&page_size=${pageSize}`;

      const res = await fetch(endpoint);

      if (!res.ok) {
        console.error("Failed to fetch data:", res.statusText);
        return;
      }

      try {
        const data: PaginatedResponse = await res.json();
        setBooks(data.books);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [page, category]);

  const nextPage = () => {
    if (page < totalPages) {
      router.push(`/books?page=${page + 1}&category=${category}`);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      router.push(`/books?page=${page - 1}&category=${category}`);
    }
  };

  const handleCategoryChange = (selectedCategory: string) => {
    router.push(`/books?page=1&category=${selectedCategory}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          All Recommended Books
        </h1>
        <p className="text-gray-600 mb-4">
          Here you&apos;ll discover the best book recommendations from the
          world&apos;s most successful and interesting people.
        </p>
      </header>

      <div className="flex flex-col md:flex-row">
        <main className="w-full md:w-3/4 pr-0 md:pr-8">
          <h2 className="text-2xl font-semibold mb-6">
            {category.replace("-", " ")} Books
          </h2>
          <BookList books={books} />
          <div className="mt-8 flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <Button onClick={prevPage} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-gray-600">
              {page} / {totalPages}
            </span>
            <Button onClick={nextPage} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </main>

        <aside className="w-full md:w-1/4 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-6">Filter by Category</h2>
          <ul className="space-y-2">
            {categories.map((cat, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start flex items-center"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {categoryIcons[cat]} {/* Relevant icon in front */}
                  {cat.replace("-", " ")}
                </Button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
