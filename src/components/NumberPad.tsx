
import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface NumberPadProps {
  onNumberSelect: (num: number | null) => void;
  className?: string;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberSelect, className }) => {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          className="aspect-square rounded-md bg-white border border-stone-200 text-xl font-mono 
                    shadow-sm hover:bg-sakura-50 active:bg-sakura-100 transition-colors duration-150
                    flex items-center justify-center"
          onClick={() => onNumberSelect(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="aspect-square rounded-md bg-white border border-stone-200 
                  shadow-sm hover:bg-stone-50 active:bg-stone-100 transition-colors duration-150
                  flex items-center justify-center"
        onClick={() => onNumberSelect(null)}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NumberPad;
