
import React, { useEffect, useRef } from 'react';
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
  fontSize?: string;
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
  fontSize = 'text-lg md:text-xl',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize the audio element
    audioRef.current = new Audio('/audio/select.mp3');
    audioRef.current.volume = 0.2;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const handleClick = () => {
    // Play click sound when cell is clicked
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed', err));
    }
    
    onClick(row, col);
  };

  // Determine the border styles based on position
  const getBorderStyles = () => {
    const styles = ["border"];
    
    // Right borders
    if (col === 2 || col === 5) {
      styles.push("border-r-2 border-r-stone-400");
    } else if (col === 8) {
      styles.push("border-r border-r-stone-300");
    } else {
      styles.push("border-r border-r-stone-200");
    }
    
    // Bottom borders
    if (row === 2 || row === 5) {
      styles.push("border-b-2 border-b-stone-400");
    } else if (row === 8) {
      styles.push("border-b border-b-stone-300");
    } else {
      styles.push("border-b border-b-stone-200");
    }
    
    // Left borders
    if (col === 0) {
      styles.push("border-l border-l-stone-300");
    }
    
    // Top borders
    if (row === 0) {
      styles.push("border-t border-t-stone-300");
    }
    
    return styles.join(" ");
  };

  return (
    <div
      className={cn(
        "sudoku-cell aspect-square flex items-center justify-center transition-all duration-200 ease-out w-full h-full",
        getBorderStyles(),
        isSelected ? "bg-sakura-200 shadow-inner" : 
          isHighlighted && !isSelected ? "bg-sakura-100" : "bg-white",
        isFixed ? "font-bold text-ink-700 dark:text-ink-300" : "text-ink-600 dark:text-ink-300",
        hasError && "text-red-500",
        fontSize,
        "cursor-pointer hover:bg-sakura-50 active:bg-sakura-100"
      )}
      onClick={handleClick}
      role="button"
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${value ? `, value ${value}` : ', empty'}`}
      data-value={value || ''}
    >
      {/* Add explicit text rendering with visible styling */}
      <span className="block text-center select-none">
        {value !== null ? value : ''}
      </span>
    </div>
  );
};

export default SudokuCell;
