
import React, { useState } from 'react';
import SudokuCell from './SudokuCell';

interface SudokuBoardProps {
  puzzle: (number | null)[][];
  fixedCells: boolean[][];
  onCellValueChange?: (row: number, col: number, value: number | null) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  puzzle,
  fixedCells,
  onCellValueChange,
}) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (!fixedCells[row][col]) {
      setSelectedCell({ row, col });
    }
  };

  const isInSameRowOrCol = (row: number, col: number) => {
    if (!selectedCell) return false;
    return selectedCell.row === row || selectedCell.col === col;
  };

  const isInSameBox = (row: number, col: number) => {
    if (!selectedCell) return false;
    const boxRow = Math.floor(selectedCell.row / 3);
    const boxCol = Math.floor(selectedCell.col / 3);
    return Math.floor(row / 3) === boxRow && Math.floor(col / 3) === boxCol;
  };

  const hasSameValue = (row: number, col: number) => {
    if (!selectedCell || puzzle[selectedCell.row][selectedCell.col] === null) return false;
    return puzzle[row][col] === puzzle[selectedCell.row][selectedCell.col];
  };

  const isHighlighted = (row: number, col: number) => {
    return isInSameRowOrCol(row, col) || isInSameBox(row, col) || hasSameValue(row, col);
  };

  const hasError = (row: number, col: number) => {
    if (puzzle[row][col] === null) return false;
    
    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && puzzle[row][c] === puzzle[row][col]) {
        return true;
      }
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && puzzle[r][col] === puzzle[row][col]) {
        return true;
      }
    }
    
    // Check box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && puzzle[r][c] === puzzle[row][col]) {
          return true;
        }
      }
    }
    
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    
    if (fixedCells[row][col]) return;
    
    if (e.key >= '1' && e.key <= '9') {
      const newValue = parseInt(e.key);
      if (onCellValueChange) {
        onCellValueChange(row, col, newValue);
      }
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      if (onCellValueChange) {
        onCellValueChange(row, col, null);
      }
    }
  };

  return (
    <div 
      className="grid grid-cols-9 border-2 border-stone-400 bg-white rounded-lg overflow-hidden shadow-lg"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {puzzle.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="sudoku-row contents">
          {row.map((cell, colIndex) => (
            <SudokuCell
              key={`cell-${rowIndex}-${colIndex}`}
              value={cell}
              isFixed={fixedCells[rowIndex][colIndex]}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              hasError={hasError(rowIndex, colIndex)}
              row={rowIndex}
              col={colIndex}
              onClick={handleCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
