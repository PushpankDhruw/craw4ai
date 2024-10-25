// app/categories/[category]/page.tsx

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  people: number;
  amazon_link: string;
  apple_link: string;
  category: string;
}

interface PaginatedResponse {
  total_count: number;
  total_pages: number;
  current_page: number;
  books: Book[];
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const pageSize = 25;
  const category = params.category;

  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        `http://localhost:8000/categories/${category}?page=${page}&page_size=${pageSize}`
      );

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
      router.push(`/categories/${category}?page=${page + 1}`);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      router.push(`/categories/${category}?page=${page - 1}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          {category.replace("-", " ")} Books
        </h1>
      </header>

      <main className="w-full">
        <BookList books={books} />

        <div className="mt-8 flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div>
            <span className="text-gray-600">
              {page} / {totalPages}
            </span>
          </div>

          {/* Conditionally hide prevPage button on page 1 */}
          <div className="flex items-center gap-2">
            {page > 1 && (
              <span onClick={prevPage} className="rounded-full ">
                <ChevronLeft className="h-4 w-4" />
              </span>
            )}

            <Button onClick={nextPage} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
