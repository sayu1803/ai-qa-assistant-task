"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface QAItem {
  id: number
  question: string
  answer: string
}

export function History() {
  const [history, setHistory] = useState<QAItem[]>([])

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("/api/history")
        if (!response.ok) {
          throw new Error("Failed to fetch history")
        }
        const data = await response.json()
        setHistory(data)
      } catch (error) {
        console.error("Error fetching history:", error)
      }
    }

    fetchHistory()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="p-4 rounded-lg bg-muted">
              <p className="font-semibold mb-2">Q: {item.question}</p>
              <p className="text-muted-foreground">A: {item.answer}</p>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-center text-muted-foreground">No questions yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

