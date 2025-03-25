
import React from 'react';
import { cn } from '@/lib/utils';

interface SudokuCellProps {
  value: number | null;
  isFixed: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  hasError: boolean;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  isFixed,
  isSelected,
  isHighlighted,
  hasError,
  row,
  col,
  onClick,
}) => {
  const handleClick = () => {
    onClick(row, col);
  };

  return (
    <div
      className={cn(
        'sudoku-cell aspect-square',
        isSelected && 'selected',
        isHighlighted && !isSelected && 'highlighted',
        isFixed && 'fixed',
        hasError && 'error'
      )}
      onClick={handleClick}
    >
      {value !== null ? value : ''}
    </div>
  );
};

export default SudokuCell;
