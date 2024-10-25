from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import books  # Ensure correct import path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(books.router)
