
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
    // Level 1 (Hajimete – Beginner)
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
    // Level 2 (Hajimete – Beginner)
    [
      [null, 3, 5, null, 7, null, null, 1, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, 1, null, null, 8, null, 5, 7, null],
    ],
    // Level 3 (Hajimete – Beginner)
    [
      [5, null, 4, null, 7, null, 9, 1, null],
      [6, 7, null, 1, null, 5, null, 4, 8],
      [null, 9, 8, 3, 4, 2, null, 6, 7],
      [8, 5, 9, null, 6, null, 4, null, 3],
      [4, null, 6, 8, 5, 3, 7, null, 1],
      [7, 1, 3, 9, null, 4, 8, 5, 6],
      [null, 6, 1, 5, 3, null, 2, 8, 4],
      [2, null, 7, 4, 1, 9, 6, 3, null],
      [3, 4, 5, 2, null, 6, 1, 7, 9],
    ],
    // Level 4 (Hajimete – Beginner)
    [
      [5, 3, null, 6, 7, null, null, null, 2],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [3, null, null, null, 8, null, null, 7, 9],
    ],
    // Level 5 (Hajimete – Beginner)
    [
      [5, 3, null, null, 7, null, 9, null, null],
      [6, null, null, 1, null, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, 5, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, null, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ],
  ],
  novice: [
    // Level 6 (Shinjin – Novice)
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
    // Level 7 (Shinjin – Novice)
    [
      [null, 2, null, null, 9, null, 6, null, null],
      [null, null, 6, 3, null, 8, null, null, 7],
      [1, null, null, null, null, null, null, 2, null],
      [8, null, null, 1, null, 2, null, null, 3],
      [null, 9, null, null, null, null, null, 5, null],
      [7, null, null, 8, null, 3, null, null, 4],
      [null, 6, null, null, null, null, null, null, 1],
      [4, null, null, 5, null, 7, 2, null, null],
      [null, null, 8, null, 6, null, null, 9, null],
    ],
    // Add more novice levels...
  ],
  intermediate: [
    // Level 11 (Chuudan – Intermediate)
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
    // Add more intermediate levels...
  ],
  skilled: [
    // Level 16 (Takumi – Skilled)
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
    // Add more skilled levels...
  ],
  expert: [
    // Level 21 (Sensei – Expert)
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
    // Add more expert levels...
  ],
  master: [
    // Level 26 (Shogun – Master)
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
    // Add more master levels...
  ],
};

// Solutions for the sample puzzles (corresponding to the puzzles above)
export const sampleSolutions = {
  beginner: [
    // Solution for Level 1
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    // Solution for Level 2
    [
      [2, 3, 5, 6, 7, 8, 9, 1, 4],
      [6, 7, 4, 1, 9, 5, 3, 2, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [3, 8, 2, 4, 1, 9, 6, 7, 5],
      [5, 1, 7, 2, 8, 6, 1, 3, 9],
    ],
    // Add solutions for Level 3-5...
  ],
  // Add solutions for novice, intermediate, skilled, expert, master...
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

// Sudoku solver using backtracking algorithm
export const solveSudoku = (grid: (number | null)[][]): (number | null)[][] | null => {
  const newGrid = JSON.parse(JSON.stringify(grid)); // Deep copy the grid
  
  // Find an empty cell
  const findEmpty = (): [number, number] | null => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newGrid[row][col] === null) {
          return [row, col];
        }
      }
    }
    return null;
  };
  
  // Check if a number is valid in the current position
  const isValid = (row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (newGrid[row][x] === num) {
        return false;
      }
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (newGrid[x][col] === num) {
        return false;
      }
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (newGrid[boxRow + r][boxCol + c] === num) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  // Solve the Sudoku recursively
  const solve = (): boolean => {
    const emptyCell = findEmpty();
    
    // If no empty cell is found, the puzzle is solved
    if (!emptyCell) {
      return true;
    }
    
    const [row, col] = emptyCell;
    
    // Try digits 1-9
    for (let num = 1; num <= 9; num++) {
      if (isValid(row, col, num)) {
        newGrid[row][col] = num;
        
        if (solve()) {
          return true;
        }
        
        // If placing the number doesn't lead to a solution, backtrack
        newGrid[row][col] = null;
      }
    }
    
    return false;
  };
  
  if (solve()) {
    return newGrid;
  } else {
    return null; // No solution found
  }
};
