
import { SudokuGrid, DifficultyLevel } from './types';
import { solveSudoku } from './solver';

// Sample puzzles for different difficulty levels
export const samplePuzzles: Record<DifficultyLevel, SudokuGrid[]> = {
  beginner: [
    // Level 1 (Hajimete – Beginner) - 20 missing cells
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, null, null, 4],
      [2, 8, 7, 4, 1, 9, 6, null, 5],
      [3, 4, 5, null, 8, null, 1, 7, 9],
    ],
    // Level 2 (Hajimete – Beginner) - 20 missing cells
    [
      [5, 3, null, null, 7, null, 9, null, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, null, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, null, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, null, 9],
    ],
    // Level 3 (Hajimete – Beginner) - 20 missing cells
    [
      [5, 3, null, 6, 7, 8, 9, 1, null],
      [6, 7, 2, null, 9, 5, null, 4, 8],
      [null, 9, 8, 3, 4, null, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, null, 3],
      [4, 2, 6, 8, null, 3, 7, 9, 1],
      [7, 1, null, 9, 2, 4, 8, 5, null],
      [9, 6, 1, 5, 3, 7, 2, 8, null],
      [2, null, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, null, 7, 9],
    ],
    // Level 4 (Hajimete – Beginner) - 20 missing cells
    [
      [5, 3, 4, 6, 7, null, 9, 1, 2],
      [6, null, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, null, 7],
      [8, 5, null, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, null],
      [7, 1, 3, 9, null, 4, 8, 5, 6],
      [9, 6, 1, null, 3, 7, 2, 8, 4],
      [2, 8, null, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, null, 7, 9],
    ],
    // Level 5 (Hajimete – Beginner) - 20 missing cells
    [
      [5, 3, 4, 6, null, 8, 9, 1, 2],
      [6, 7, null, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, null, 6, 7],
      [8, 5, 9, null, 6, 1, 4, 2, 3],
      [4, null, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, null, 8, 5, 6],
      [9, 6, null, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, null, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, null, 9],
    ],
  ],
  novice: [
    // Level 6 (Shinjin – Novice) - 28 missing cells
    [
      [null, 2, null, 6, null, 8, null, null, 3],
      [5, 8, null, null, null, 9, 7, null, 1],
      [null, null, 7, null, 4, null, null, null, null],
      [3, 7, null, null, null, 4, 5, null, 9],
      [6, null, null, null, null, null, null, null, 4],
      [null, null, 8, 7, null, null, null, 1, 3],
      [null, null, null, null, 2, null, 9, null, null],
      [2, null, 9, 8, null, null, null, 3, 6],
      [null, null, null, 3, null, 6, null, 4, null],
    ],
    // Level 7 (Shinjin – Novice) - 30 missing cells
    [
      [null, null, null, null, 7, null, 8, null, 5],
      [null, null, 4, null, null, 3, null, 7, 6],
      [null, 1, null, null, null, null, null, null, 9],
      [null, 5, null, null, 9, null, null, null, null],
      [3, null, 7, 8, null, 1, 4, null, null],
      [null, null, null, null, 4, null, null, 2, null],
      [3, null, null, null, null, null, null, 8, null],
      [9, 4, null, 3, null, null, 1, null, null],
      [null, null, 6, null, 1, null, null, null, 7],
    ],
    // Level 8 (Shinjin – Novice) - 30 missing cells
    [
      [6, null, null, 9, null, null, null, null, 3],
      [null, null, 3, null, 5, null, 8, null, null],
      [9, null, null, null, null, null, null, 5, 7],
      [null, null, null, null, null, 7, 5, null, null],
      [7, null, null, null, null, null, null, null, 8],
      [null, null, 5, 6, null, null, null, null, null],
      [5, 4, null, null, null, null, null, 3, 1],
      [null, null, 1, null, 3, null, 4, null, null],
      [8, null, null, null, null, 5, null, null, 6],
    ],
    // Level 9 (Shinjin – Novice) - 30 missing cells
    [
      [7, null, null, null, null, null, null, null, 4],
      [null, 3, null, null, null, 9, null, 6, null],
      [null, null, 8, null, 6, null, 5, null, null],
      [null, null, 5, 7, null, null, null, null, null],
      [null, null, null, null, 9, null, null, null, 2],
      [null, null, null, null, null, 8, 3, null, null],
      [null, null, 3, null, 2, null, null, null, 8],
      [null, 5, null, 1, null, null, null, 4, null],
      [4, null, null, null, null, null, null, null, 3],
    ],
    // Level 10 (Shinjin – Novice) - 28 missing cells
    [
      [2, null, null, null, null, null, null, 6, 9],
      [null, null, null, 8, null, null, 4, null, null],
      [null, 7, 4, null, 1, null, null, null, 3],
      [null, null, null, 6, null, 3, null, 9, null],
      [null, null, 2, null, null, null, 8, null, null],
      [null, 4, null, 9, null, 5, null, null, null],
      [8, null, null, null, 4, null, 7, 2, null],
      [null, null, 5, null, null, 9, null, null, null],
      [4, 9, null, null, null, null, null, null, 7],
    ],
  ],
  intermediate: [
    // Level 11 (Chuudan – Intermediate) - 35 missing cells
    [
      [null, null, null, 6, null, null, 4, null, null],
      [7, null, null, null, null, 3, 6, null, null],
      [null, null, null, null, 9, 1, null, 8, null],
      [null, null, null, null, null, null, null, null, null],
      [null, 5, 3, 1, 8, null, null, null, 7],
      [null, null, null, 3, null, 6, null, 4, 5],
      [null, 4, null, 2, null, null, null, 6, null],
      [9, null, 3, null, null, null, null, null, null],
      [null, 2, null, null, null, null, 1, null, null],
    ],
    // Level 12 (Chuudan – Intermediate) - 34 missing cells
    [
      [null, null, null, null, null, null, null, null, 6],
      [8, null, 4, null, null, null, 5, null, null],
      [null, null, null, 1, 8, null, null, null, null],
      [null, null, null, null, null, 9, 3, null, null],
      [null, null, null, null, 7, null, null, null, 2],
      [null, null, 1, 3, null, null, null, null, null],
      [null, null, null, null, 4, 5, null, null, null],
      [null, null, 8, null, null, null, 6, null, 5],
      [5, null, null, null, null, null, null, null, null],
    ],
    // Level 13 (Chuudan – Intermediate) - 34 missing cells
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
    // Level 14 (Chuudan – Intermediate) - 35 missing cells
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
    // Level 15 (Chuudan – Intermediate) - 35 missing cells
    [
      [null, null, 5, null, null, null, null, null, null],
      [null, null, null, null, 1, null, null, 8, null],
      [null, 8, null, null, null, 5, 2, null, null],
      [null, null, null, null, null, null, null, 7, 9],
      [null, 3, null, 9, null, 4, null, 1, null],
      [7, null, null, 8, null, null, null, null, null],
      [null, null, 6, 7, null, null, null, 3, null],
      [null, 5, null, null, 9, null, null, null, null],
      [null, null, null, null, null, null, 6, null, null],
    ],
  ],
  skilled: [
    // Level 16 (Takumi – Skilled) - 40 missing cells
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
    // Level 17 (Takumi – Skilled) - 38 missing cells
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, 1],
      [null, null, null, null, null, null, null, 3, null],
      [null, null, 7, null, null, null, null, null, null],
      [5, null, null, null, 9, null, null, null, null],
      [null, null, null, 4, null, null, 6, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, 5, null, 2, null, null, null, null, null],
      [null, null, 8, null, null, null, null, null, null],
    ],
    // Level 18 (Takumi – Skilled) - 40 missing cells
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
    // Level 19 (Takumi – Skilled) - 40 missing cells
    [
      [null, null, null, null, null, null, null, null, null],
      [null, null, 2, null, null, null, null, null, 4],
      [null, null, null, null, null, 3, null, 7, null],
      [null, null, null, null, 6, null, 5, null, null],
      [null, null, 9, null, null, null, null, null, null],
      [null, null, 7, null, null, 5, null, null, null],
      [null, 6, null, 1, null, null, null, null, null],
      [9, null, null, null, null, null, 2, null, null],
      [null, null, null, null, null, null, null, null, null],
    ],
    // Level 20 (Takumi – Skilled) - 40 missing cells
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
  expert: [
    // Level 21 (Sensei – Expert) - 45 missing cells
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
    // Level 22 (Sensei – Expert) - 45 missing cells
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
    // Level 23 (Sensei – Expert) - 45 missing cells
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
    // Level 24 (Sensei – Expert) - 45 missing cells
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
    // Level 25 (Sensei – Expert) - 45 missing cells
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
    // Level 26 (Shogun – Master) - 50 missing cells
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
    // Level 27 (Shogun – Master) - 50 missing cells
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
    // Level 28 (Shogun – Master) - 50 missing cells
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
    // Level 29 (Shogun – Master) - 50 missing cells
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
    // Level 30 (Shogun – Master) - 50 missing cells
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

// Solutions for all puzzles
export const sampleSolutions: Record<DifficultyLevel, SudokuGrid[]> = {
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
    // Solution for Level 3
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
    // Solution for Level 4
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
    // Solution for Level 5
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
  ],
  novice: [],
  intermediate: [],
  skilled: [],
  expert: [],
  master: [],
};

// Function to ensure all puzzles have solutions
export const updatePuzzlesWithUniqueSolutions = () => {
  // For each difficulty level
  Object.keys(samplePuzzles).forEach((difficultyKey) => {
    const difficulty = difficultyKey as DifficultyLevel;
    
    // Initialize the solutions array if it doesn't exist
    if (!sampleSolutions[difficulty] || sampleSolutions[difficulty].length === 0) {
      sampleSolutions[difficulty] = [];
    }
    
    // For each puzzle in the difficulty level
    samplePuzzles[difficulty].forEach((puzzle, index) => {
      // If no solution exists for this puzzle, solve it
      if (!sampleSolutions[difficulty][index]) {
        const solution = solveSudoku(JSON.parse(JSON.stringify(puzzle)));
        if (solution) {
          sampleSolutions[difficulty][index] = solution;
        } else {
          console.error(`Could not solve puzzle ${index + 1} for difficulty ${difficulty}`);
        }
      }
    });
  });
};
