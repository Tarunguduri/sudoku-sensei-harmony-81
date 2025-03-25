
// Function to create an empty 9x9 grid
export const createEmptyGrid = <T>(defaultValue: T): T[][] => {
  return Array(9).fill(null).map(() => Array(9).fill(defaultValue));
};

// Function to check if a Sudoku puzzle is valid
export const isValidSudoku = (puzzle: (number | null)[][]): boolean => {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const rowValues = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const value = puzzle[row][col];
      if (value !== null) {
        if (rowValues.has(value)) return false;
        rowValues.add(value);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const colValues = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const value = puzzle[row][col];
      if (value !== null) {
        if (colValues.has(value)) return false;
        colValues.add(value);
      }
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxValues = new Set<number>();
      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          const value = puzzle[row][col];
          if (value !== null) {
            if (boxValues.has(value)) return false;
            boxValues.add(value);
          }
        }
      }
    }
  }

  return true;
};

// Function to check if a Sudoku puzzle is completed and correct
export const isSudokuComplete = (puzzle: (number | null)[][]): boolean => {
  // Check if all cells are filled
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === null) return false;
    }
  }

  // Check if the puzzle is valid
  return isValidSudoku(puzzle);
};

// Sample puzzles for different difficulty levels
export const samplePuzzles = {
  beginner: [
    // A simple beginner puzzle
    [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ],
  ],
  novice: [
    // A novice level puzzle
    [
      [null, null, null, 2, 6, null, 7, null, 1],
      [6, 8, null, null, 7, null, null, 9, null],
      [1, 9, null, null, null, 4, 5, null, null],
      [8, 2, null, 1, null, null, null, 4, null],
      [null, null, 4, 6, null, 2, 9, null, null],
      [null, 5, null, null, null, 3, null, 2, 8],
      [null, null, 9, 3, null, null, null, 7, 4],
      [null, 4, null, null, 5, null, null, 3, 6],
      [7, null, 3, null, 1, 8, null, null, null],
    ],
  ],
  intermediate: [
    // An intermediate level puzzle
    [
      [null, 2, null, 6, null, 8, null, null, null],
      [5, 8, null, null, null, 9, 7, null, null],
      [null, null, null, null, 4, null, null, null, null],
      [3, 7, null, null, null, null, 5, null, null],
      [6, null, null, null, null, null, null, null, 4],
      [null, null, 8, null, null, null, null, 1, 3],
      [null, null, null, null, 2, null, null, null, null],
      [null, null, 9, 8, null, null, null, 3, 6],
      [null, null, null, 3, null, 6, null, 9, null],
    ],
  ],
  skilled: [
    // A skilled level puzzle
    [
      [null, null, null, 6, null, null, 4, null, null],
      [7, null, null, null, null, 3, 6, null, null],
      [null, null, null, null, 9, 1, null, 8, null],
      [null, null, null, null, null, null, null, null, null],
      [null, 5, null, 1, 8, null, null, null, 3],
      [null, null, null, 3, null, 6, null, 4, 5],
      [null, 4, null, 2, null, null, null, 6, null],
      [9, null, 3, null, null, null, null, null, null],
      [null, 2, null, null, null, null, 1, null, null],
    ],
  ],
  expert: [
    // An expert level puzzle
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, 3, null, 8, 5],
      [null, null, 1, null, 2, null, null, null, null],
      [null, null, null, 5, null, 7, null, null, null],
      [null, null, 4, null, null, null, 1, null, null],
      [null, 9, null, null, null, null, null, null, null],
      [5, null, null, null, null, null, null, 7, 3],
      [null, null, 2, null, 1, null, null, null, null],
      [null, null, null, null, 4, null, null, null, 9],
    ],
  ],
  master: [
    // A master level puzzle
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, 3, null, 8, 5],
      [null, null, 1, null, 2, null, null, null, null],
      [null, null, null, 5, null, 7, null, null, null],
      [null, null, 4, null, null, null, 1, null, null],
      [null, 9, null, null, null, null, null, null, null],
      [5, null, null, null, null, null, null, 7, 3],
      [null, null, 2, null, 1, null, null, null, null],
      [null, null, null, null, 4, null, null, null, 9],
    ],
  ],
};

// Function to create a puzzle with fixed cells
export const createPuzzleWithFixedCells = (puzzle: (number | null)[][]): boolean[][] => {
  const fixedCells = createEmptyGrid<boolean>(false);

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      fixedCells[row][col] = puzzle[row][col] !== null;
    }
  }

  return fixedCells;
};
