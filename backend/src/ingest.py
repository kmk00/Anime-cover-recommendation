import os

import csv 
import requests 
import cv2 
import numpy as np 

os.environ["PINECONE_NO_READLINE"] = "1"
from pinecone import Pinecone, ServerlessSpec

from dotenv import load_dotenv
load_dotenv()



pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = "anime-covers-histogram" 

if index_name not in pc.list_indexes().names(): 
    pc.create_index(
        name=index_name, 
        dimension=512, 
        metric="cosine",
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    ) 


index = pc.Index(index_name) 


def extract_histogram_from_url(url): 
    try: 
        response = requests.get(url, timeout=5) 
        image = cv2.imdecode(np.frombuffer(response.content, np.uint8), cv2.IMREAD_COLOR) 
        if image is None: 
            return None 
        image = cv2.resize(image, (64, 64)) 
        hist = cv2.calcHist([image], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256]) 
        hist = cv2.normalize(hist, hist).flatten() 
        return hist.tolist() 
    except Exception as e: 
        print("Failed to process:", url, str(e)) 
        return None 


with open("src/anime.csv", newline='', encoding="utf-8") as csvfile: 
    reader = csv.DictReader(csvfile) 
    batch = [] 
    for row in reader: 
        anime_id = row["anime_id"] 
        image_url = row["image_url"] 
        vector = extract_histogram_from_url(image_url) 
        if vector: 
            batch.append({ 
                "id": anime_id, 
                "values": vector, 
                "metadata": {"url": image_url} 
            }) 
        if len(batch) >= 100: 
            index.upsert(vectors=batch) 
            print("Uploaded batch of 100") 
            batch = [] 

    if batch: 
        index.upsert(vectors=batch) 
        print("Uploaded final batch") 

print("✅ Ingestion complete!")