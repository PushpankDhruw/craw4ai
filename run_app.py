import threading
import subprocess

def run_scraper():
    subprocess.run(["python", "web/crawl4ai_scraper.py"])

def run_fastapi():
    subprocess.run(["uvicorn", "backend.app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])

if __name__ == "__main__":
    scraper_thread = threading.Thread(target=run_scraper)
    fastapi_thread = threading.Thread(target=run_fastapi)

    scraper_thread.start()
    fastapi_thread.start()

    scraper_thread.join()
    fastapi_thread.join()
