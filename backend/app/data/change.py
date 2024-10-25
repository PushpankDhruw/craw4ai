import json

# Load the JSON data from the file
with open('all_books.json', 'r') as file:
    books = json.load(file)

# Update the 'people' field to remove the text and keep only the number
for book in books:
    if 'people' in book:
        # Extract the number before the word 'people' and convert it to an integer
        book['people'] = int(book['people'].split()[0])

# Write the updated data back to a new JSON file
with open('all_books_updated.json', 'w') as file:
    json.dump(books, file, indent=2)

print("Updated 'people' field to contain only the number in all_books_updated.json")
