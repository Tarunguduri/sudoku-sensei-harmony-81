
import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NumberPadProps {
  onNumberSelect: (num: number | null) => void;
  className?: string;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberSelect, className }) => {
  const isMobile = useIsMobile();
  
  // Calculate button size based on screen width
  const getButtonSize = () => {
    if (isMobile) {
      return 'text-2xl min-h-[56px]';
    }
    return 'text-xl min-h-[48px]';
  };
  
  return (
    <div className={cn("grid grid-cols-5 gap-2 sm:gap-3", className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          className={cn(
            "aspect-square rounded-md bg-white border border-stone-200 font-mono",
            "shadow-sm hover:bg-sakura-50 active:bg-sakura-100 transition-colors duration-150",
            "flex items-center justify-center",
            getButtonSize()
          )}
          onClick={() => onNumberSelect(num)}
        >
          {num}
        </button>
      ))}
      <button
        className={cn(
          "aspect-square rounded-md bg-white border border-stone-200",
          "shadow-sm hover:bg-stone-50 active:bg-stone-100 transition-colors duration-150",
          "flex items-center justify-center",
          getButtonSize()
        )}
        onClick={() => onNumberSelect(null)}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default NumberPad;
