import os
import json
from typing import List
from .models import Book

async def get_books() -> List[Book]:
    # Update the path to the top_100_books.json file
    backend_path = os.path.join(os.path.dirname(__file__), 'data', 'top_100_books.json')
    
    # Check if the file exists and handle potential errors
    if not os.path.exists(backend_path):
        raise FileNotFoundError("Top 100 books data file not found.")
    
    with open(backend_path, 'r') as f:
        data = json.load(f)
    
    # Return the data as a list of Book instances
    return [Book(**book) for book in data]
    
async def get_all_books() -> List[Book]:
    # Update the path to the all_books.json file
    backend_path = os.path.join(os.path.dirname(__file__), 'data', 'all_books.json')
    print(f"Trying to open file at: {backend_path}")  # Debug line
    if not os.path.exists(backend_path):
        raise FileNotFoundError("All books data file not found.")
    
    with open(backend_path, 'r') as f:
        data = json.load(f)
    
    return [Book(**book) for book in data]
