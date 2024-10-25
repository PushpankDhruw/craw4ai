"use client";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";
import AnimatedBlob from "@/components/animation/blob";

export default function HeaderHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 relative overflow-hidden pt-20 lg:pt-0">
      <GridPattern className="absolute inset-0 opacity-30" />
      <main className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row min-h-screen items-center">
        <div className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-800 mb-4">
              good books
              <br />
              <span>
                — find your next
              </span>
              <br />
              favorite book.
            </h1>
            <div className="bg-red-100 border border-red-300 rounded-full inline-flex items-center px-3 py-1 mb-6">
              <span className="text-red-500 font-bold text-xs mr-2">
                PRODUCT HUNT
              </span>
              <span className="text-red-700 font-bold text-sm">
                #1 Product of the Day
              </span>
            </div>
            <p className="text-gray-600 mb-8">
              — 9,500+ book recommendations from the most
              <br />
              successful and interesting people in the world.
            </p>
            <Link
              href="/top-12"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              Top 12 most recommended books
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative flex justify-center items-center min-h-[300px] lg:min-h-screen lg:justify-end">
          <AnimatedBlob />
        </div>
      </main>
      <p className="p-4 text-sm text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quia aliquid qui expedita inventore, repudiandae nulla dicta quod laudantium necessitatibus iure non a sunt doloribus, repellat consequuntur architecto praesentium aspernatur dolorum natus vitae mollitia. Corrupti eos, sint similique eveniet, est eius nobis eaque veniam fugiat vel soluta asperiores pariatur consequuntur nesciunt optio a? Sunt soluta reprehenderit libero magni veniam quis modi, ad atque amet non! Provident neque excepturi ad recusandae voluptate cum iste possimus illo tempore dignissimos! Magnam, amet fuga, placeat aperiam iusto labore tempore magni maiores animi iure velit! Praesentium sequi tenetur ducimus voluptas dicta nisi non tempora autem!
      </p>
    </div>
  );
}
