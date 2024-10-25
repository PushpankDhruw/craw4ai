import requests
from bs4 import BeautifulSoup
import json
import os
import time

BASE_URL = "https://www.goodbooks.io/books"
PAGINATION_URL = "https://www.goodbooks.io/books?216112dc_page="
TOTAL_PAGES = 253
RETRY_LIMIT = 3  # Number of retries for each request

def fetch_page(url):
    for attempt in range(RETRY_LIMIT):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < RETRY_LIMIT - 1:
                time.sleep(5)  # Wait before retrying
            else:
                print(f"Failed to fetch {url} after {RETRY_LIMIT} attempts.")
                return None

def scrape_books():
    books = []
    book_id = 1  # Start with 1

    for page in range(1, TOTAL_PAGES + 1):
        url = f"{PAGINATION_URL}{page}"
        response = fetch_page(url)
        if response is None:
            continue  # Skip this page if fetching failed

        soup = BeautifulSoup(response.text, 'html.parser')

        for book_wrap in soup.select('div.book-wrap'):
            title_tag = book_wrap.select_one('h5.grid-item-title')
            author_tag = book_wrap.select_one('h6.grid-item-subtitle')
            cover_tag = book_wrap.select_one('img.book-cover')
            people_tag = book_wrap.select_one('.row.row-align-centre .w-embed')
            amazon_link_tag = book_wrap.select_one('a[href*="amazon.com"]')
            apple_link_tag = book_wrap.select_one('a[href*="books.apple.com"]')

            if title_tag and author_tag and cover_tag and amazon_link_tag and apple_link_tag and people_tag:
                title = title_tag.get_text(strip=True)
                author = author_tag.get_text(strip=True)
                cover_url = cover_tag.get('src')
                people = people_tag.get_text(strip=True)
                amazon_link = amazon_link_tag.get('href')
                apple_link = apple_link_tag.get('href')

                books.append({
                    "id": book_id,
                    "title": title,
                    "author": author,
                    "cover_url": cover_url,
                    "people": people,
                    "amazon_link": amazon_link,
                    "apple_link": apple_link
                })
                book_id += 1  # Increment the ID

    backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'books.json')
    with open(backend_path, 'w') as f:
        json.dump(books, f, indent=2)

if __name__ == "__main__":
    scrape_books()
