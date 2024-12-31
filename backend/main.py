import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import sqlite3
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Generative AI API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize SQLite database
conn = sqlite3.connect("qa_history.db")
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS qa_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        answer TEXT
    )
""")
conn.commit()

class Question(BaseModel):
    question: str

class QAPair(BaseModel):
    id: int
    question: str
    answer: str

@app.post("/ask")
async def ask_question(question: Question):
    if not question.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    if len(question.question) > 500:
        raise HTTPException(status_code=400, detail="Question is too long (max 500 characters)")

    try:
        # Use Gemini model
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(question.question)
        
        # Extract the answer from the response
        answer = response.text

        # Store question and answer in the database
        cursor.execute("INSERT INTO qa_history (question, answer) VALUES (?, ?)", (question.question, answer))
        conn.commit()

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history", response_model=List[QAPair])
async def get_history():
    cursor.execute("SELECT id, question, answer FROM qa_history ORDER BY id DESC")
    history = cursor.fetchall()
    return [QAPair(id=row[0], question=row[1], answer=row[2]) for row in history]

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)