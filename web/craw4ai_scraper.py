import requests
from bs4 import BeautifulSoup
import json
import os

URL = "https://www.goodbooks.io/top-100/all-books"

def scrape_books():
    response = requests.get(URL)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    
    books = []
    book_id = 1  # Start with 1
    for book_wrap in soup.select('div.book-wrap'):
        title_tag = book_wrap.select_one('.grid-item-title')
        author_tag = book_wrap.select_one('.grid-item-subtitle')
        cover_tag = book_wrap.select_one('.book-cover')
        rating_tag = book_wrap.select_one('.badge.recommendation-count .w-embed')
        amazon_link_tag = book_wrap.select_one('a[href*="amazon.com"]')
        apple_link_tag = book_wrap.select_one('a[href*="books.apple.com"]')
        
        if title_tag and author_tag and cover_tag and rating_tag and amazon_link_tag and apple_link_tag:
            title = title_tag.get_text(strip=True)
            author = author_tag.get_text(strip=True)
            cover_url = cover_tag.get('src')
            rating_count = rating_tag.get_text(strip=True)
            amazon_link = amazon_link_tag.get('href')
            apple_link = apple_link_tag.get('href')
            
            books.append({
                "id": book_id, 
                "title": title, 
                "author": author, 
                "cover_url": cover_url,
                "rating_count": rating_count,
                "amazon_link": amazon_link,
                "apple_link": apple_link
            })
            book_id += 1  # Increment the ID
    
    backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'books.json')
    with open(backend_path, 'w') as f:
        json.dump(books, f, indent=2)

if __name__ == "__main__":
    scrape_books()
