import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import clientPromise from "@/lib/mongodb"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

function formatResponse(text: string): { type: 'text' | 'code', content: string, language?: string }[] {
  const parts = text.split('\`\`\`');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const [language, ...codeLines] = part.split('\n');
      return {
        type: 'code',
        content: codeLines.join('\n').trim(),
        language: language.trim()
      };
    } else {
      return {
        type: 'text',
        content: part.split('\n').filter(line => line.trim() !== '').map(line => line.trim()).join('\n\n')
      };
    }
  });
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(question);
    const response = await result.response;
    const rawAnswer = response.text();

    const formattedAnswer = formatResponse(rawAnswer);

    const client = await clientPromise;
    const db = client.db("ai_qa_app");
    await db.collection("qa_history").insertOne({
      question,
      answer: formattedAnswer,
      timestamp: new Date()
    });

    console.log('Saved to database:', { question, answer: formattedAnswer });

    return NextResponse.json({ answer: formattedAnswer })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request. Please try again later." },
      { status: 500 }
    )
  }
}

