const SIZE = 9;
const BOX_SIZE = 3;
const EMPTY = 0;

function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY));
}

function isValid(grid, row, col, num) {
  // Check row
  for (let x = 0; x < SIZE; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < SIZE; x++) {
    if (grid[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxStartRow = row - (row % BOX_SIZE);
  const boxStartCol = col - (col % BOX_SIZE);

  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (grid[boxStartRow + i][boxStartCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function fillGrid(grid) {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === EMPTY) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);

        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;

            if (fillGrid(grid)) {
              return true;
            }

            grid[row][col] = EMPTY;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSudoku() {
  const grid = createEmptyGrid();
  fillGrid(grid);
  return grid;
}

const grid = generateSudoku();
export default generateSudoku;
