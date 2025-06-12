import { useState, useEffect } from "react";
import Grid3 from "./Grid3";
import GameEnd from "./GameEnd";
import GameWon from "./GameWon";

export default function Grid9({
  mode,
  grid,
  unsolvedGrid,
  setUnsolvedGrid,
  setNewGame,
}) {
  const [mistakesCount, setMistakesCount] = useState(0);
  const [opened, setOpened] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [filledGrid, setFilledGrid] = useState(() =>
    structuredClone(unsolvedGrid)
  );

  useEffect(() => {
    setFilledGrid(structuredClone(unsolvedGrid));
    setMistakesCount(0);
    setTime(0);
    setOpened(false);
    setGameWon(false);
    setIsActive(true);
  }, [unsolvedGrid, mode]);

  useEffect(() => {
    let interval = null;
    if (isActive && !gameWon) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, gameWon]);

  useEffect(() => {
    if (mistakesCount === 3) {
      setIsActive(false);
      setOpened(true);
    }
  }, [mistakesCount]);

  useEffect(() => {
    const checkWinCondition = () => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (unsolvedGrid[i][j] !== undefined) continue;
          const userVal = filledGrid[i][j];
          const correctVal = grid[i][j];
          if (userVal === undefined || userVal !== correctVal) {
            return false;
          }
        }
      }
      return true;
    };

    if (checkWinCondition()) {
      setIsActive(false);
      setGameWon(true); // Only show win screen
    }
  }, [filledGrid, grid, unsolvedGrid]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newFilledGrid = structuredClone(filledGrid);
    const numValue = value === "" ? undefined : Number(value);

    if (numValue !== undefined && (numValue < 1 || numValue > 9)) return;

    if (newFilledGrid[rowIndex][colIndex] !== numValue) {
      newFilledGrid[rowIndex][colIndex] = numValue;
      setFilledGrid(newFilledGrid);

      if (numValue !== undefined && numValue !== grid[rowIndex][colIndex]) {
        setMistakesCount((prev) => prev + 1);
      }
    }
  };

  const handleRestart = () => {
    setTime(0);
    setMistakesCount(0);
    setIsActive(true);
    setOpened(false);
    setGameWon(false);
    setNewGame((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-4 px-4">
        <div className="text-lg font-medium">
          Time: <span className="font-bold">{formatTime()}</span>
        </div>
        <div className="text-lg font-medium">
          Mistakes: <span className="font-bold">{mistakesCount}/3</span>
        </div>
      </div>

      {opened ? (
        <GameEnd
          setOpened={setOpened}
          setMistakesCount={setMistakesCount}
          setNewGame={setNewGame}
          time={formatTime()}
          onRestart={handleRestart}
        />
      ) : gameWon ? (
        <GameWon
          time={formatTime()}
          mistakes={mistakesCount}
          onRestart={handleRestart}
        />
      ) : (
        <div className="grid grid-cols-1">
          {unsolvedGrid.map((row, rowIndex) => {
            const placement =
              rowIndex === 0 ? "top" : (rowIndex + 1) % 3 === 0 ? "3x3" : "";
            const isThirdRow = (rowIndex + 1) % 3 === 0;

            return (
              <div key={rowIndex}>
                <Grid3
                  setMistakesCount={setMistakesCount}
                  mistakesCount={mistakesCount}
                  placement={placement}
                  solved={grid[rowIndex]}
                  values={filledGrid[rowIndex]}
                  third={isThirdRow}
                  onCellChange={(colIndex, value) =>
                    handleCellChange(rowIndex, colIndex, value)
                  }
                  initialGrid={unsolvedGrid[rowIndex]}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
