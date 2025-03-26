
import React, { useState, useEffect } from 'react';
import SudokuCell from './SudokuCell';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SudokuBoardProps {
  puzzle: (number | null)[][];
  fixedCells: boolean[][];
  onCellValueChange?: (row: number, col: number, value: number | null) => void;
  className?: string;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  puzzle,
  fixedCells,
  onCellValueChange,
  className,
}) => {
  const isMobile = useIsMobile();
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [boardSize, setBoardSize] = useState<number>(0);

  // Update board size based on screen width
  useEffect(() => {
    const updateBoardSize = () => {
      // Get width of the viewport
      const viewportWidth = window.innerWidth;
      // Calculate optimal board size (90% of viewport width for mobile, with a max size)
      const maxSize = 500; // Maximum board size in pixels
      let newSize = Math.min(viewportWidth * 0.9, maxSize);
      
      // Ensure the board is not too small
      newSize = Math.max(newSize, 280);
      
      setBoardSize(newSize);
    };

    // Set initial size
    updateBoardSize();
    
    // Update size on window resize
    window.addEventListener('resize', updateBoardSize);
    
    return () => {
      window.removeEventListener('resize', updateBoardSize);
    };
  }, []);

  const handleCellClick = (row: number, col: number) => {
    // Always set selected cell, even for fixed cells (for highlighting purposes)
    setSelectedCell({ row, col });
    
    // Pass selected cell to parent component if needed
    if (onCellValueChange && !fixedCells[row][col]) {
      // This is crucial - this notifies the GameBoard which cell is selected
      // so it can update when number pad is clicked
      onCellValueChange(row, col, puzzle[row][col]);
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

  // Calculate cell size based on board size
  const cellSize = boardSize / 9;
  
  // Cell font size based on cell size
  const getFontSize = () => {
    if (cellSize <= 30) return 'text-base';
    if (cellSize <= 40) return 'text-lg';
    return 'text-xl md:text-2xl';
  };

  return (
    <div 
      className={cn("relative bg-white border-2 border-stone-400 rounded-lg overflow-hidden shadow-lg", className)}
      style={{ width: `${boardSize}px`, height: `${boardSize}px` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="grid grid-cols-9 h-full w-full">
        {puzzle.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
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
              fontSize={getFontSize()}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default SudokuBoard;
