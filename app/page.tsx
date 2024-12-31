import { QAInterface } from "@/components/qa-interface"
import { QAHistory } from "@/components/qa-history"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">AI Q&A Assistant (Powered by Gemini)</h1>
      <QAInterface />
      <QAHistory />
    </div>
  )
}

