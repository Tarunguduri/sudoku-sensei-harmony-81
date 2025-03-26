
import { SudokuGrid } from './types';
import { solveSudoku } from './solver';

// Function to generate a new Sudoku puzzle
// This is a simple implementation - more sophisticated algorithms could be used
export const generateSudokuPuzzle = (difficulty: number): SudokuGrid => {
  // Create an empty grid
  const grid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));
  
  // Fill the diagonal 3x3 boxes (which can be filled independently)
  fillDiagonalBoxes(grid);
  
  // Solve the grid to get a complete valid puzzle
  const solvedGrid = solveSudoku(grid);
  
  // Remove numbers based on difficulty level
  // difficulty is a number from 0-1 where 0 is easiest (more numbers visible)
  // and 1 is hardest (fewer numbers visible)
  const cellsToRemove = Math.floor(difficulty * 60); // Max around 60 cells to remove
  
  const puzzle = JSON.parse(JSON.stringify(solvedGrid)) as SudokuGrid;
  removeNumbers(puzzle, cellsToRemove);
  
  return puzzle;
};

// Helper function to fill the diagonal 3x3 boxes
const fillDiagonalBoxes = (grid: SudokuGrid): void => {
  // Fill the three diagonal 3x3 boxes
  for (let box = 0; box < 3; box++) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(numbers);
    
    let idx = 0;
    for (let row = box * 3; row < box * 3 + 3; row++) {
      for (let col = box * 3; col < box * 3 + 3; col++) {
        grid[row][col] = numbers[idx++];
      }
    }
  }
};

// Helper function to remove numbers from the grid
const removeNumbers = (grid: SudokuGrid, count: number): void => {
  let removed = 0;
  
  while (removed < count) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (grid[row][col] !== null) {
      grid[row][col] = null;
      removed++;
    }
  }
};

// Helper function to shuffle an array
const shuffle = <T>(array: T[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
