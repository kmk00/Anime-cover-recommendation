# Anime Recommender App

This project is a full-stack web application that recommends anime based on an uploaded image. The system compares the image histogram with existing anime cover images using vector similarity (via Pinecone) and returns a ranked list of visually similar anime. You can also explore detailed stats, cast, and additional info for each recommended anime.

## Features

📤 Upload an image (e.g., anime cover or poster)

🧠 Get anime recommendations based on visual similarity (image histograms)

📊 View metadata for each recommendation: similarity score, cover image, etc.

📚 Browse extended anime details (cast, stats, info)

⚡ Fast and responsive UI built with React + Tailwind

🧪 Vector search powered by Pinecone

🔗 Frontend-backend communication using FastAPI + REST

## Tech Stack

#### Frontend

- React

- Tailwindcss 4

- TanStack Router & TanStack Query

- Vite (build & dev)

- Recharts (for stats visualization)

- Zustand (state management)

- Radix UI (accessible UI components)

#### Backend

- Python

- FastAPI

- OpenCV (histogram extraction)

- Pinecone (vector similarity search)

## Run Locally

#### 🔹 Prerequisites

- Node.js & npm

- Python 3.11+

- Pinecone API Key

Clone the project

```bash
  git clone https://github.com/kmk00/Anime-cover-recommendation.git
```

#### 🔹 Backend Setup

Install required packages

```bash
# (optional) create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
```

Provide .env variables

```bash
PINECONE_API_KEY=<your_pinecone_key>
PINECONE_INDEX_NAME=<your_index_name>
CORS_ORIGINS=http://localhost:5173
```

Ingest the database

```bash
python src/ingest.py

```

Run the server

```bash
python -m uvicorn src.app:app

```

#### 🔹 Frontend Setup

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Provide .env variables

```bash
VITE_ANIMEAPI_URL=https://api.jikan.moe/v4/anime
VITE_BACKEND_API=http://localhost:8000
VITE_APP_URL=http://localhost:5173
```

Run server locally

```bash
  npm run dev
```

## How It Works

1. User uploads an image file.

2. Backend extracts a normalized 3D color histogram (OpenCV).

3. The histogram is used as a vector to query a Pinecone index of anime covers.

4. Similarity scores are converted into percentages and returned with metadata.

5. Frontend displays the top matches and allows users to browse details.

## Future Improvements

Randomized anime selection to watch

Save recent recommendations

Improve loading states

## Lessons Learned

Histogram-based image comparison: I gained practical experience using OpenCV to extract color histograms and normalize them for similarity matching.

Vector databases (Pinecone): I learned how to use Pinecone to store and query high-dimensional vectors efficiently, including how to interpret and scale cosine similarity scores.

Frontend-backend integration: I deepened my understanding of connecting React apps to FastAPI APIs, especially handling image file uploads and CORS configuration.

State & query management: Working with TanStack Query and Zustand helped me manage client-side state and asynchronous data flows more effectively.

Tailwind + component libraries: I learned how to rapidly build clean, responsive UIs using Tailwind CSS and Radix UI components.
