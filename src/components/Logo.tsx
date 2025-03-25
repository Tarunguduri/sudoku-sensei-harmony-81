
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="w-8 h-8 bg-sakura-500 rounded-lg rotate-45 transform transition-all duration-300 hover:rotate-[135deg]"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          数
        </div>
      </div>
      <div className={cn("font-serif font-bold", sizeClasses[size])}>
        <span className="text-ink-900">Sudoku</span>
        <span className="text-sakura-500">Sensei</span>
      </div>
    </div>
  );
};

export default Logo;
