'use client'; // Ensure you have the 'use client' directive if using React Server Components

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  people: number; // people is a string
  amazon_link: string;
  apple_link: string;
}

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  if (!Array.isArray(books) || books.length === 0) {
    return <p className="text-center text-gray-500">No books available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6">
      {books.map((book) => (
        <div key={book.id} className="flex flex-col items-center">
          <div className="relative w-full pt-[150%] flex justify-center items-center transition-transform duration-200 shadow-lg">
            <motion.div 
              className="absolute inset-0 z-20 opacity-0 blur-[50px] bg-white rounded-full w-4/5 h-1/2 overflow-hidden"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.65 }}
              transition={{ duration: 0.3 }}
            ></motion.div>

            <Image
              src={book.cover_url}
              alt={book.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-10 w-full h-full"
            />
            <Image
              src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c1189790514ef79618_book-cover-overlay.webp"
              alt=""
              layout="fill"
              className="absolute inset-0 z-10 w-full h-full mix-blend-multiply"
            />
            {/* People Badge */}
            <div className="absolute bottom-2 left-2 z-30">
              <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                <Image 
                  src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c1189790e698f795d8_star-icon.svg" 
                  alt="Star icon" 
                  width={16} 
                  height={16} 
                  className="w-4 h-4" 
                />
                <span className="text-xs">{book.people || 'No data'}</span> {/* Show people directly */}
              </div>
            </div>
          </div>
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold line-clamp-2">{book.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
          </div>
          <div className="flex justify-center space-x-2 p-4 w-full">
            <a
              href={book.amazon_link}
              target="_blank"
              rel="nofollow sponsored"
              className="inline-block"
            >
              <Image 
                src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c11897908692f79605_btn-amazon.svg"
                alt="Amazon.com button"
                width={100}
                height={30}
              />
            </a>
            <a
              href={book.apple_link}
              target="_blank"
              rel="nofollow sponsored"
              className="inline-block"
            >
              <Image 
                src="https://cdn.prod.website-files.com/61cb87c1189790ed10f7936d/61cb87c1189790c448f79604_btn-apple.svg"
                alt="Apple books button"
                width={100}
                height={30}
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
