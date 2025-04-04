
// Export all functionality from the sudoku modules
export * from './types';
export * from './grid';
export * from './validator';
export * from './solver';
export * from './puzzles';
export * from './generator';
export * from './shuffler';

// Explicitly re-export the updatePuzzlesWithUniqueSolutions function to resolve ambiguity
export { updatePuzzlesWithUniqueSolutions } from './puzzles';
