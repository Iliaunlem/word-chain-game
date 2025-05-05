import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-8">
      <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 animate-bounce drop-shadow-md">
        Word Chain Game 🎉
      </h1>
      <div className="max-w-2xl text-center text-lg text-gray-800 bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg animate-fade-in space-y-4">
        <p><strong>Gameplay Rules:</strong></p>
        <p>
        The rules are simple: each new word must begin with the last letter of the previous word. 
        For example, if the word is "cat", the next word must start with "t". 
        All words must be valid English words, and you cannot use the same word twice in a chain.
        </p>
        <p><strong>How do I win Word Chain?</strong></p>
        <p>
        To win Word Chain, aim to enter as many words as possible! 
        The game continues until you run out of words. 
        The longer your word chain, the higher your score!
        </p>
        <p><strong>How does the game start?</strong></p>
        <p>
        The game starts when you enter a valid word. This first word sets the chain in motion, and subsequent words must begin with the last letter of the previous word.
        </p>
        <p className="text-xl text-gray-700 font-semibold">
          To start choose the <span className="text-blue-600 font-bold">Play</span> button from menu 🎮 Let's start 🚀
        </p>
      </div>
      <Link
        to="/game"
        className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition"
      >Play
       
      </Link>
    </div>
  );
}

export default Home;
