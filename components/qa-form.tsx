"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Card, CardContent } from "./ui/card"
import { ReloadIcon } from "@radix-ui/react-icons"

export function QAForm() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to get answer")
      }

      const data = await response.json()
      setAnswer(data.answer)
      setQuestion("")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Ask your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
          <Button className="w-full" disabled={isLoading || !question.trim()}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Getting Answer..." : "Ask Question"}
          </Button>
        </form>
        {answer && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Answer:</h2>
            <div className="p-4 rounded-lg bg-muted">{answer}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

