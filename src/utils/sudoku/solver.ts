
import { SudokuGrid } from './types';
import { isSafe } from './validator';

// Function to solve a Sudoku puzzle using backtracking
export const solveSudoku = (puzzle: SudokuGrid): SudokuGrid => {
  // Create a deep copy of the puzzle to avoid modifying the original
  const solution = JSON.parse(JSON.stringify(puzzle));
  
  const solve = (): boolean => {
    // Find an empty cell
    let row = -1;
    let col = -1;
    let isEmpty = false;
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (solution[i][j] === null) {
          row = i;
          col = j;
          isEmpty = true;
          break;
        }
      }
      if (isEmpty) {
        break;
      }
    }
    
    // No empty cell found, puzzle is solved
    if (!isEmpty) {
      return true;
    }
    
    // Try placing numbers 1-9 in the empty cell
    for (let num = 1; num <= 9; num++) {
      if (isSafe(solution, row, col, num)) {
        solution[row][col] = num;
        
        if (solve()) {
          return true;
        }
        
        // If placing num doesn't lead to a solution, backtrack
        solution[row][col] = null;
      }
    }
    
    return false;
  };
  
  solve();
  return solution;
};
