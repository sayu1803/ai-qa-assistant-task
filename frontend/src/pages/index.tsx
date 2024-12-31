import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface QAPair {
  id: number;
  question: string;
  answer: string;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState<QAPair[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/ask', { question });
      setAnswer(response.data.answer);
      setQuestion('');
      fetchHistory();
    } catch (error) {
      console.error('Error:', error);
      setAnswer('An error occurred while fetching the answer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Q&A Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here..."
          className="w-full p-2 border rounded mb-4 h-32"
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          {isLoading ? 'Getting Answer...' : 'Ask Question'}
        </button>
      </form>
      {answer && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Answer:</h2>
          <p className="p-4 bg-gray-100 rounded">{answer}</p>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-4">Question History</h2>
        {history.map((item) => (
          <div key={item.id} className="mb-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold">Q: {item.question}</p>
            <p>A: {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

