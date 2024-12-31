'use client'

import { useEffect } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnswerPart {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

interface QAPair {
  _id: string;
  question: string;
  answer: AnswerPart[];
  timestamp: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function QAHistory() {
  const { data: history, error, mutate } = useSWR<QAPair[]>("/api/history", fetcher)

  useEffect(() => {
    const interval = setInterval(() => {
      mutate()
    }, 5000) // Refresh every 5 seconds

    return () => clearInterval(interval)
  }, [mutate])

  if (error) return <div>Failed to load history</div>
  if (!history) return <div>Loading...</div>

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Previous Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item._id} className="p-4 rounded-lg bg-muted">
              <p className="font-semibold">Q: {item.question}</p>
              <div className="mt-2">
                <p className="font-semibold">A:</p>
                {item.answer.map((part, index) => (
                  part.type === 'text' ? (
                    <p key={index} className="whitespace-pre-wrap">{part.content}</p>
                  ) : (
                    <pre key={index} className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mt-2">
                      <code>{part.content}</code>
                    </pre>
                  )
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-center text-muted-foreground">No questions asked yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

