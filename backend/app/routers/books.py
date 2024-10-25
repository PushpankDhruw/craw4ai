from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any
from app.models import Book
from app.services import get_books, get_all_books
import json

router = APIRouter()

@router.get("/books", response_model=List[Book])
async def read_books():
    try:
        books = await get_books()
        return books
    except FileNotFoundError as fnf_error:
        print(f"File not found: {fnf_error}")
        raise HTTPException(status_code=500, detail="Books data file not found.")
    except json.JSONDecodeError as json_error:
        print(f"JSON decode error: {json_error}")
        raise HTTPException(status_code=500, detail="Error decoding JSON data.")
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/all-books", response_model=Dict[str, Any])
async def read_all_books(page: int = Query(1, ge=1), page_size: int = Query(25, ge=1)):
    try:
        all_books = await get_all_books()
        total_count = len(all_books)
        start = (page - 1) * page_size
        end = start + page_size
        
        paginated_books = all_books[start:end]
        
        return {
            "total_count": total_count,
            "total_pages": (total_count + page_size - 1) // page_size,
            "current_page": page,
            "books": paginated_books
        }
    except FileNotFoundError as fnf_error:
        print(f"File not found: {fnf_error}")
        raise HTTPException(status_code=500, detail="All books data file not found.")
    except json.JSONDecodeError as json_error:
        print(f"JSON decode error: {json_error}")
        raise HTTPException(status_code=500, detail="Error decoding JSON data.")
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# New route to filter books by category
@router.get("/categories/{category_name}", response_model=Dict[str, Any])
async def read_books_by_category(category_name: str, page: int = Query(1, ge=1), page_size: int = Query(25, ge=1)):
    try:
        all_books = await get_all_books()
        filtered_books = [book for book in all_books if book.category.lower() == category_name.lower()]

        total_count = len(filtered_books)
        start = (page - 1) * page_size
        end = start + page_size
        
        paginated_books = filtered_books[start:end]
        
        return {
            "total_count": total_count,
            "total_pages": (total_count + page_size - 1) // page_size,
            "current_page": page,
            "books": paginated_books
        }
    except FileNotFoundError as fnf_error:
        raise HTTPException(status_code=500, detail="Books data file not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
