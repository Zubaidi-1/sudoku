import React from "react";

const GameWon = ({ time, mistakes, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-green-600 mb-6">
          Congratulations!
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          You solved the puzzle in <span className="font-bold">{time}</span>
        </p>
        <p className="text-lg text-gray-600 mb-2">
          Mistakes made: <span className="font-bold">{mistakes}</span>
        </p>
        <button
          onClick={onRestart}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameWon;
