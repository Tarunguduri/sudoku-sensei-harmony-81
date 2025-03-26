
import { SudokuCell, SudokuGrid, SudokuFixedCells } from './types';

// Function to create an empty 9x9 grid
export const createEmptyGrid = <T>(defaultValue: T): T[][] => {
  return Array(9).fill(null).map(() => Array(9).fill(defaultValue));
};

// Function to create a boolean grid indicating which cells are fixed (pre-filled)
export const createPuzzleWithFixedCells = (puzzle: SudokuGrid): SudokuFixedCells => {
  return puzzle.map(row => 
    row.map(cell => cell !== null)
  );
};
