
// Common type definitions for Sudoku puzzles
export type SudokuCell = number | null;
export type SudokuGrid = SudokuCell[][];
export type SudokuFixedCells = boolean[][];

// Define the difficulty levels for type safety
export type DifficultyLevel = 'beginner' | 'novice' | 'intermediate' | 'skilled' | 'expert' | 'master';
