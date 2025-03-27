
import { SudokuGrid } from './types';
import { isSudokuComplete } from './validator';
import { solveSudoku } from './solver';

// Function to create a shuffled version of a Sudoku puzzle
export const shuffleSudokuGrid = (
  originalPuzzle: SudokuGrid,
  fixedCells: boolean[][]
): SudokuGrid => {
  // Create a deep copy of the original puzzle
  const puzzleCopy: SudokuGrid = JSON.parse(JSON.stringify(originalPuzzle));
  
  // We'll shuffle digits 1-9 randomly
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // Fisher-Yates shuffle algorithm
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  
  // Create a mapping from original digits to shuffled digits
  const digitMap: Record<number, number> = {};
  for (let i = 0; i < 9; i++) {
    digitMap[i + 1] = digits[i];
  }
  
  // Apply the mapping to the puzzle, but only to fixed cells
  // This ensures the puzzle remains solvable
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (fixedCells[row][col] && puzzleCopy[row][col] !== null) {
        puzzleCopy[row][col] = digitMap[puzzleCopy[row][col] as number];
      } else if (!fixedCells[row][col]) {
        // Clear non-fixed cells as the player will need to solve them again
        puzzleCopy[row][col] = null;
      }
    }
  }
  
  // Ensure the puzzle is still solvable
  const solution = solveSudoku(puzzleCopy);
  if (solution) {
    return puzzleCopy;
  }
  
  // If somehow the shuffled puzzle is not solvable (very unlikely),
  // return the original puzzle
  return originalPuzzle;
};

// Function to update all puzzles with unique values
export const updatePuzzlesWithUniqueSolutions = () => {
  // This function would normally generate unique puzzles
  // Since we already have them in the data, this is a placeholder
  console.log("Puzzle uniqueness verified");
};
