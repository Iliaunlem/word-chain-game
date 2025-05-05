import React, { useState, useEffect, useRef } from 'react';
import wordList from 'an-array-of-english-words';

function Game() {
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('bestScore')) || 0);
  const [startTime, setStartTime] = useState(null);

  const timerRef = useRef(null);

  const wordSet = new Set(wordList);
  const lastLetter = words.length > 0 ? words[words.length - 1].slice(-1) : null;

  const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

  useEffect(() => {
    if (!gameOver && words.length > 0) {
      if (!startTime) setStartTime(Date.now());
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            endGame('⏰ Time is up!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [words, gameOver]);

  const endGame = (msg) => {
    setGameOver(true);
    setMessage(msg);
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = input.trim().toLowerCase();

    if (!wordSet.has(word)) {
      setMessage('❌ Word is Not Valid');
    } else if (words.includes(word)) {
      setMessage('⚠️ Word already used');
    } else if (lastLetter && word[0] !== lastLetter) {
      setMessage(`❌ Must start with '${lastLetter}'`);
    } else {
      setWords((prev) => [...prev, word]);
      setScore((prev) => prev + word.length);
      setTimeLeft(15);
      setMessage('✅ Word is valid!');
    }
    setInput('');
  };

  const restartGame = () => {
    setInput('');
    setWords([]);
    setScore(0);
    setMessage('');
    setTimeLeft(15);
    setGameOver(false);
    setStartTime(null);
    clearInterval(timerRef.current);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-4">Word Chain</h2>

      {gameOver ? (
        <>
          <div className="text-2xl font-semibold mb-4 text-red-500">{message}</div>
          <p className="text-lg">🕓 Time played: {duration} seconds</p>
          <p className="text-lg">📖 Words used: {words.length}</p>
          <p className="text-lg">🏆 Final Score: {score}</p>
          <p className="text-lg">🔥 Best Score: {bestScore}</p>
          <button
            onClick={restartGame}
            className="bg-green-500 text-white px-6 py-2 rounded mt-4"
          >
            🔁 Play Again
          </button>
        </>
      ) : (
        <>
          <div className="text-gray-700 mb-2">Score: {score} | Time Left: {timeLeft}s</div>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={gameOver}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={gameOver}
            >
              Submit
            </button>
          </form>
          {message && <div className="text-lg mb-2">{message}</div>}
          <div className="max-w-md w-full bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Word Chain:</h3>
            <ul className="space-y-1">
              {words.map((w, index) => (
                <li key={index}>{w}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
