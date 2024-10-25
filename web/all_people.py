import requests
from bs4 import BeautifulSoup
import json
import os

BASE_URL = "https://www.goodbooks.io/people"
PAGINATION_URL = "https://www.goodbooks.io/people?216112dc_page={}"

def scrape_people(page=1):
    url = BASE_URL if page == 1 else PAGINATION_URL.format(page)
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    people = []
    for person_wrap in soup.select('div.person'):
        # Extract the person's name, image, and badges
        name_tag = person_wrap.select_one('.grid-item-title')
        img_tag = person_wrap.select_one('img.photo-grid')
        badge_tags = person_wrap.select('div.badges .badge-text')

        if name_tag and img_tag:
            name = name_tag.get_text(strip=True)
            img_url = img_tag.get('src')

            badges = [badge.get_text(strip=True) for badge in badge_tags if badge.get_text(strip=True)]

            people.append({
                "name": name,
                "img_url": img_url,
                "badges": badges
            })
    
    return people

def scrape_all_people(pages=1):
    all_people = []
    for page in range(1, pages + 1):
        people = scrape_people(page)
        all_people.extend(people)
        print(f"Scraped page {page} with {len(people)} people.")
    
    backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'people.json')
    with open(backend_path, 'w') as f:
        json.dump(all_people, f, indent=2)

if __name__ == "__main__":
    scrape_all_people(pages=10)  # Modify the number of pages as needed
