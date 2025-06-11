import React from "react";

const GameEnd = ({
  setOpened,
  setMistakesCount,
  setNewGame,
  time,
  onRestart,
}) => {
  const handleNewGame = () => {
    setMistakesCount(0);
    setNewGame((prev) => !prev);
    setOpened(false);
    onRestart();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Game Over</h2>
        <p className="text-lg text-gray-600 mb-2">
          Your time: <span className="font-bold">{time}</span>
        </p>
        <p className="text-lg text-gray-600 mb-8">
          You've reached the maximum number of mistakes.
        </p>
        <button
          onClick={handleNewGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameEnd;
