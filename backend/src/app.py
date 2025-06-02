# app.py
import os, cv2, numpy as np
from fastapi import FastAPI, File, UploadFile
from pinecone import Pinecone
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = os.getenv("PINECONE_INDEX_NAME")

index = pc.Index(index_name)

app = FastAPI()

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COVERS_LIMIT = 24

def extract_histogram(img_bytes, bins=(8,8,8)):
    arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    hist = cv2.calcHist([img],[0,1,2],None,bins,[0,256,0,256,0,256])
    return cv2.normalize(hist,hist).flatten().tolist()

def calculate_similarity_percentage(score):
    """
    Convert Pinecone similarity score to percentage.
    Pinecone uses cosine similarity by default, which ranges from -1 to 1.
    We convert it to a 0-100% scale.
    """
    percentage = ((score + 1) / 2) * 100
    return round(percentage, 2)

@app.post("/recommend")
async def recommend(cover: UploadFile = File(...)):
    img_bytes = await cover.read()
    query_vec = extract_histogram(img_bytes)
    resp = index.query(vector=query_vec, top_k=COVERS_LIMIT, include_metadata=True)
    data = []
    for match in resp["matches"]:
        similarity_percentage = calculate_similarity_percentage(match["score"])
        data.append({
            "id": match["id"],
            "url": match["metadata"]["url"],
            "similarity": similarity_percentage,
            "raw_score": match["score"]
        })

    return {"results": data}

@app.get("/")
async def root():
    return {"message": f'Hello World! {index_name}', "index": index_name}

