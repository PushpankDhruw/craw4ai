import Image from 'next/image'
import Link from 'next/link'

const people = [
  {
    name: 'Eric Weinstein',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['entrepreneur', 'investor', 'scientist', 'venture capitalist']
  },
  {
    name: 'Morgan Housel',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['venture capitalist', 'author']
  },
  {
    name: 'Bill Nye',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['educator', 'media personality', 'author']
  },
  {
    name: 'Samin Nosrat',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['hospitality', 'media personality', 'author']
  },
  {
    name: 'Andrew Chen',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['marketer', 'technology', 'venture capitalist', 'author']
  },
  {
    name: 'Josh Waitzkin',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['educator', 'sport', 'author']
  },
  {
    name: 'Stephen Dubner',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['journalist', 'media personality', 'scientist', 'author']
  },
  {
    name: 'Mario Gabriele',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['media personality', 'venture capitalist', 'author']
  },
  {
    name: 'Caterina Fake',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['entrepreneur', 'investor', 'technology', 'venture capitalist']
  },
  {
    name: 'Oprah Winfrey',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['actor', 'entrepreneur', 'media personality', 'author']
  },
  {
    name: 'Joe Rogan',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['comedian', 'actor', 'media personality', 'sport']
  },
  {
    name: 'Michael Pollan',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_9-10-2024_122454_www.goodbooks.io-8VufVs8jJn0e51QQbe3b2BcHWZo89E.jpeg',
    tags: ['activist', 'educator', 'journalist', 'author']
  },
]

export default function Component() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <main className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-8">Featured people</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {people.map((person) => (
            <div key={person.name} className="bg-white overflow-hidden rounded-lg">
              <Image
                src={person.image}
                alt={person.name}
                width={200}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{person.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {person.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            explore all people &rarr;
          </Link>
        </div>
      </main>
    </div>
  )
}