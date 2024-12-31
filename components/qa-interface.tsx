'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ReloadIcon } from "@radix-ui/react-icons"

interface AnswerPart {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export function QAInterface() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState<AnswerPart[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get answer")
      }

      const data = await response.json()
      setAnswer(data.answer)
      setQuestion("")
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !question.trim()}
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Getting Answer..." : "Ask Question"}
          </Button>
        </form>
        {answer.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Answer:</h3>
            <div className="p-4 rounded-lg bg-muted space-y-4">
              {answer.map((part, index) => (
                part.type === 'text' ? (
                  <p key={index} className="whitespace-pre-wrap">{part.content}</p>
                ) : (
                  <pre key={index} className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mt-2">
                    <code>{part.content}</code>
                  </pre>
                )
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

