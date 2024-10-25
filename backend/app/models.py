# app/models.py
from pydantic import BaseModel

class Book(BaseModel):
    id: int
    title: str
    author: str
    cover_url: str
    people: int
    amazon_link: str
    apple_link: str
    category: str  # Add this field for category
