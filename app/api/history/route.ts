import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("ai_qa_app")
    const history = await db.collection("qa_history")
      .find({})
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray()

    const formattedHistory = history.map(item => ({
      ...item,
      _id: item._id.toString(),
      timestamp: item.timestamp.toISOString()
    }))

    return NextResponse.json(formattedHistory)
  } catch (error) {
    console.error("Error in /api/history:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching the history. Please try again later." },
      { status: 500 }
    )
  }
}

