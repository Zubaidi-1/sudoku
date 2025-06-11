import { useState, useEffect } from "react";
import "./App.css";
import Grid9 from "./Components/Grid9";
import Modes from "./Components/Modes";
import generateSudoku from "./util/Generator9"; // IMPORT FUNCTION!

function App() {
  const [modes, setModes] = useState("easy");
  const [grid, setGrid] = useState(() => generateSudoku()); // initial grid
  const [unsolvedGrid, setUnsolvedGrid] = useState(() => {
    const { minMissing, maxMissing } = getDifficultyParams("easy");
    const randomHide =
      Math.floor(Math.random() * (maxMissing - minMissing + 1)) + minMissing;
    return generateUnsolvedGrid(grid, randomHide);
  });

  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    const newGrid = generateSudoku(); // NEW grid!
    setGrid(newGrid);

    const { minMissing, maxMissing } = getDifficultyParams(modes);
    const randomHide =
      Math.floor(Math.random() * (maxMissing - minMissing + 1)) + minMissing;
    setUnsolvedGrid(generateUnsolvedGrid(newGrid, randomHide));
  }, [newGame, modes]);

  const handleModeChange = (newMode) => {
    setModes(newMode);
  };

  return (
    <div className="flex flex-col items-center gap-9">
      <Modes setModes={handleModeChange} modes={modes} />
      <Grid9
        setNewGame={setNewGame}
        mode={modes}
        grid={grid}
        unsolvedGrid={unsolvedGrid}
        setUnsolvedGrid={setUnsolvedGrid}
      />
    </div>
  );
}

// Helper: Get difficulty parameters
function getDifficultyParams(mode) {
  switch (mode) {
    case "easy":
      return { minMissing: 32, maxMissing: 45 };
    case "medium":
      return { minMissing: 46, maxMissing: 49 };
    case "hard":
      return { minMissing: 50, maxMissing: 53 };
    case "extreme":
      return { minMissing: 54, maxMissing: 59 };
    default:
      return { minMissing: 32, maxMissing: 45 };
  }
}

// Helper: Generate unsolved grid
function generateUnsolvedGrid(grid, hiddenCount) {
  const hiddenPositions = generateRandomNumbers(hiddenCount, 0, 80);
  const unsolvedGrid = Array(9)
    .fill()
    .map(() => Array(9));
  let cellIndex = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      unsolvedGrid[i][j] = hiddenPositions.includes(cellIndex)
        ? undefined
        : grid[i][j];
      cellIndex++;
    }
  }
  return unsolvedGrid;
}

// Helper: Generate unique random numbers
function generateRandomNumbers(count, min, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
}

export default App;
