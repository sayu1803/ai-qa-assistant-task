import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/ask', { question });
      setAnswer(response.data.answer);
      setQuestion('');
      fetchHistory();
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI-Powered Q&A Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ask'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {answer && (
        <div className="answer">
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
      <div className="history">
        <h2>Question History</h2>
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              <strong>Q: {item.question}</strong>
              <p>A: {item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

