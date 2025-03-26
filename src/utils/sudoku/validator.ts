
import { SudokuGrid } from './types';

// Function to check if a Sudoku puzzle is valid
export const isValidSudoku = (puzzle: SudokuGrid): boolean => {
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
export const isSudokuComplete = (puzzle: SudokuGrid): boolean => {
  // Check if all cells are filled
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === null) return false;
    }
  }

  // Check if the puzzle is valid
  return isValidSudoku(puzzle);
};

// Function to check if it's safe to place a number at a given position
export const isSafe = (puzzle: SudokuGrid, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (puzzle[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (puzzle[y][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (puzzle[y][x] === num) {
        return false;
      }
    }
  }

  return true;
};
