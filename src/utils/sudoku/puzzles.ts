
import { SudokuGrid, DifficultyLevel } from './types';
import { solveSudoku } from './solver';

// Sample puzzles for different difficulty levels
export const samplePuzzles: Record<DifficultyLevel, SudokuGrid[]> = {
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
    // Level 1 (Shinjin – Novice)
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
    // Level 2 (Shinjin – Novice)
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
    // Level 3 (Shinjin – Novice)
    [
      [5, null, null, 6, null, null, null, null, 1],
      [null, 7, null, null, 2, null, 5, null, null],
      [null, null, 9, null, null, 8, null, 3, null],
      [null, 5, null, null, 6, null, null, 4, null],
      [null, null, null, 2, null, 3, null, null, null],
      [null, 8, null, null, 5, null, null, 2, null],
      [null, 3, null, 9, null, null, 4, null, null],
      [null, null, 8, null, 7, null, null, 6, null],
      [2, null, null, null, null, 4, null, null, 9],
    ],
    // Level 4 (Shinjin – Novice)
    [
      [6, null, null, null, 4, null, null, null, 9],
      [null, 2, null, null, null, 7, null, 4, null],
      [null, null, 8, 6, null, null, 2, null, null],
      [null, null, 3, null, 1, null, 4, null, null],
      [null, 5, null, null, null, null, null, 8, null],
      [null, null, 7, null, 2, null, 1, null, null],
      [null, null, 5, null, null, 1, 9, null, null],
      [null, 4, null, 8, null, null, null, 1, null],
      [9, null, null, null, 7, null, null, null, 2],
    ],
    // Level 5 (Shinjin – Novice)
    [
      [null, null, null, 4, 9, null, null, null, 3],
      [null, 4, null, null, null, 6, null, 1, null],
      [3, null, 9, null, null, null, 7, null, null],
      [6, null, null, null, 8, null, null, null, 5],
      [null, 9, null, null, null, null, null, 7, null],
      [7, null, null, null, 1, null, null, null, 4],
      [null, null, 3, null, null, null, 9, null, 1],
      [null, 5, null, 9, null, null, null, 8, null],
      [4, null, null, null, 3, 7, null, null, null],
    ],
  ],
  intermediate: [
    // Level 1 (Chuudan – Intermediate)
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
    // Level 2 (Chuudan – Intermediate)
    [
      [null, null, null, null, 7, null, 8, null, null],
      [null, null, 4, null, null, 3, null, 7, 6],
      [null, null, null, null, null, null, null, null, 9],
      [null, 5, null, null, 9, null, null, null, null],
      [null, null, 7, 8, null, 1, 4, null, null],
      [null, null, null, null, 4, null, null, 2, null],
      [3, null, null, null, null, null, null, null, null],
      [9, 4, null, 3, null, null, 1, null, null],
      [null, null, 6, null, 1, null, null, null, null],
    ],
    // Level 3 (Chuudan – Intermediate)
    [
      [null, null, null, 9, null, null, null, null, 3],
      [null, null, 3, null, 5, null, 8, null, null],
      [9, 6, null, null, null, null, null, 5, 7],
      [null, null, null, null, null, 7, 5, null, null],
      [7, null, null, null, null, null, null, null, 8],
      [null, null, null, null, null, null, null, 6, null],
      [5, 4, null, null, null, null, null, 3, 1],
      [null, null, 1, null, 3, null, 4, null, null],
      [8, null, null, null, null, 5, null, null, null],
    ],
    // Level 4 (Chuudan – Intermediate)
    [
      [7, null, null, null, null, null, null, null, 4],
      [null, 3, null, null, null, 9, null, 6, null],
      [null, null, null, null, 6, null, 8, null, null],
      [null, null, 5, 7, null, null, null, null, null],
      [null, null, null, null, 9, null, null, null, null],
      [null, null, null, null, null, 8, 2, null, null],
      [null, null, 3, null, 2, null, null, null, null],
      [null, 5, null, 1, null, null, null, 4, null],
      [4, null, null, null, null, null, null, null, 3],
    ],
    // Level 5 (Chuudan – Intermediate)
    [
      [2, null, null, null, null, null, null, 6, null],
      [null, null, null, 8, null, null, 4, null, null],
      [null, 7, null, null, 1, null, null, null, 3],
      [null, null, null, 6, null, null, null, 9, null],
      [null, null, 2, null, null, null, 8, null, null],
      [null, 4, null, null, null, 5, null, null, null],
      [8, null, null, null, 4, null, null, 2, null],
      [null, null, 5, null, null, 9, null, null, null],
      [null, 9, null, null, null, null, null, null, 7],
    ],
  ],
  skilled: [
    // Level 1 (Takumi – Skilled)
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
    // Level 2 (Takumi – Skilled)
    [
      [null, null, null, null, null, null, null, null, 6],
      [8, null, 4, null, null, null, 5, null, null],
      [null, null, null, 1, 8, null, null, null, null],
      [null, null, null, null, null, 9, 3, null, null],
      [null, null, null, null, 7, null, null, null, null],
      [null, null, 1, 3, null, null, null, null, null],
      [null, null, null, null, 4, 5, null, null, null],
      [null, null, 8, null, null, null, 6, null, 5],
      [5, null, null, null, null, null, null, null, null],
    ],
    // Level 3 (Takumi – Skilled)
    [
      [null, null, null, null, null, null, null, 8, 5],
      [null, null, null, 2, null, null, null, null, null],
      [null, null, 2, null, null, 1, null, null, 9],
      [null, 5, null, null, null, 7, null, null, null],
      [null, null, 8, null, null, null, 3, null, null],
      [null, null, null, 6, null, null, null, 2, null],
      [2, null, null, 9, null, null, 6, null, null],
      [null, null, null, null, null, 6, null, null, null],
      [8, 3, null, null, null, null, null, null, null],
    ],
    // Level 4 (Takumi – Skilled)
    [
      [null, null, 7, null, null, null, 8, null, null],
      [null, null, null, null, 3, null, null, null, null],
      [null, null, null, 9, null, 6, null, null, null],
      [null, null, null, null, null, null, null, 7, null],
      [8, null, null, null, 1, null, null, null, 5],
      [null, 6, null, null, null, null, null, null, null],
      [null, null, null, 8, null, 3, null, null, null],
      [null, null, null, null, 4, null, null, null, null],
      [null, null, 9, null, null, null, 2, null, null],
    ],
    // Level 5 (Takumi – Skilled)
    [
      [null, null, 5, null, null, null, null, null, null],
      [null, null, null, null, 1, null, null, 8, null],
      [null, 8, null, null, null, 5, 2, null, null],
      [null, null, null, null, null, null, null, 7, null],
      [null, 3, null, 9, null, 4, null, 7, null],
      [7, null, null, 8, null, null, null, null, null],
      [null, null, 6, 7, null, null, null, 3, null],
      [null, 5, null, null, 9, null, null, null, null],
      [null, null, null, null, null, null, 6, null, null],
    ],
  ],
  expert: [
    // Level 1 (Sensei – Expert)
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
    // Level 2 (Sensei – Expert)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, 1],
      [null, null, null, null, null, null, null, 3, null],
      [null, null, null, null, null, null, null, null, 7],
      [null, null, null, null, 9, null, null, null, null],
      [null, null, null, 4, null, null, 6, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, 5, null, 2, null, null, null, null, null],
      [null, null, 8, null, null, null, null, null, null],
    ],
    // Level 3 (Sensei – Expert)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, 9, null, null, null, null, null, 7],
      [null, null, null, null, null, null, 3, null, null],
      [null, null, null, null, null, null, null, null, 8],
      [null, 8, null, null, 4, null, null, null, null],
      [6, null, null, 2, null, null, null, null, null],
      [null, null, null, null, null, null, null, 5, null],
      [null, null, null, null, null, 9, null, null, null],
      [5, null, 7, null, null, null, null, null, null],
    ],
    // Level 4 (Sensei – Expert)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, 2, null, null, null, null, null, 4],
      [null, null, null, null, null, 3, null, 7, null],
      [null, null, null, null, 6, null, 5, null, null],
      [null, null, null, null, null, null, null, null, 9],
      [null, null, 7, null, null, 5, null, null, null],
      [null, 6, null, 1, null, null, null, null, null],
      [9, null, null, null, null, null, 2, null, null],
      [null, null, null, null, null, null, null, null, null],
    ],
    // Level 5 (Sensei – Expert)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, 5, null, null, null, null],
      [null, null, null, null, null, null, 3, null, null],
      [null, null, 2, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, 7, null],
      [null, null, null, 6, null, null, null, null, null],
      [null, 1, null, null, null, null, null, null, null],
      [null, null, null, null, null, 8, null, null, null],
    ],
  ],
  master: [
    // Level 1 (Shogun – Master)
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
    // Level 2 (Shogun – Master)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, 1],
      [null, null, null, null, null, null, null, 3, null],
      [null, null, null, null, null, null, null, null, 7],
      [null, null, null, null, 9, null, null, null, null],
      [null, null, null, 4, null, null, 6, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, 5, null, 2, null, null, null, null, null],
      [null, null, 8, null, null, null, null, null, null],
    ],
    // Level 3 (Shogun – Master)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, 6, null, 2, null],
      [null, null, 9, null, null, null, null, null, null],
      [null, null, null, null, 7, null, null, null, 8],
      [null, null, null, null, null, null, 1, null, null],
      [null, null, null, 5, null, null, null, null, null],
      [null, 3, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, 4, null, null],
    ],
    // Level 4 (Shogun – Master)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, 7, null, null],
      [null, null, 1, null, null, null, null, null, null],
      [null, null, null, null, 2, null, null, null, null],
      [null, null, null, 9, null, null, null, null, null],
      [null, null, null, null, null, null, null, 5, null],
      [null, null, null, null, null, 4, null, null, 6],
      [null, null, null, null, null, null, null, null, null],
    ],
    // Level 5 (Shogun – Master)
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, 5, null, null, null, null],
      [null, null, null, null, null, null, 3, null, null],
      [null, null, 2, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, 7, null],
      [null, null, null, 6, null, null, null, null, null],
      [null, 1, null, null, null, null, null, null, null],
      [null, null, null, null, null, 8, null, null, null],
    ],
  ],
};

// Function to populate remaining levels in each difficulty category
export const createRemainingPuzzles = () => {
  // All puzzles are now pre-defined, no need to generate more
  console.log("All puzzles are defined and ready");
};

// Solutions for the sample puzzles (just showing a few examples)
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
    // Solutions for other levels can be computed at runtime with solveSudoku
  ],
  // Other difficulties follow the same pattern - solutions can be computed at runtime
  novice: [[]],
  intermediate: [[]],
  skilled: [[]],
  expert: [[]],
  master: [[]],
};

// Dynamically solve each puzzle to ensure they all have valid solutions
export const validateAllPuzzles = () => {
  let allValid = true;
  
  Object.entries(samplePuzzles).forEach(([difficulty, puzzles]) => {
    puzzles.forEach((puzzle, index) => {
      const solution = solveSudoku([...puzzle.map(row => [...row])]);
      if (!solution) {
        console.error(`Puzzle ${index + 1} in ${difficulty} has no solution`);
        allValid = false;
      }
    });
  });
  
  return allValid;
};
