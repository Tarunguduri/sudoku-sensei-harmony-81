import { SudokuGrid, DifficultyLevel } from './types';

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
    // Add more master levels
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

// Function to populate remaining levels in each difficulty category
export const createRemainingPuzzles = () => {
  const updatedPuzzles = { ...samplePuzzles };
  
  // Ensure each difficulty has 5 puzzles
  Object.keys(updatedPuzzles).forEach(difficulty => {
    const key = difficulty as DifficultyLevel;
    
    // If less than 5 puzzles, generate additional ones
    while (updatedPuzzles[key].length < 5) {
      // For simplicity, we'll use a variation of an existing puzzle
      const basePuzzle = [...updatedPuzzles[key][0]];
      
      // Create a slight variation
      for (let i = 0; i < 10; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        
        if (basePuzzle[row][col] !== null) {
          // Randomly make some filled cells empty
          if (Math.random() > 0.7) {
            basePuzzle[row][col] = null;
          }
        }
      }
      
      updatedPuzzles[key].push(basePuzzle);
    }
  });
  
  return updatedPuzzles;
};

// Solutions for the sample puzzles
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
    // Add other solutions as needed
  ],
  // Add solutions for other difficulty levels as needed
  novice: [[]],
  intermediate: [[]],
  skilled: [[]],
  expert: [[]],
  master: [[]],
};
