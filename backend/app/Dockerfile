FROM python:3.9

WORKDIR /app

COPY ./app /app

RUN pip install fastapi uvicorn pydantic

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
