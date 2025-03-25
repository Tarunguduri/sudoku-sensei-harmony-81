
import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DifficultyLevelProps {
  name: string;
  japaneseName: string;
  range: string;
  isUnlocked: boolean;
  index: number;
  totalLevels: number;
  completed?: number;
}

const DifficultyLevel: React.FC<DifficultyLevelProps> = ({
  name,
  japaneseName,
  range,
  isUnlocked,
  index,
  totalLevels,
  completed = 0,
}) => {
  const delay = index * 100;

  return (
    <Link 
      to={isUnlocked ? `/levels/${name.toLowerCase()}` : '#'}
      className={cn(
        "block w-full opacity-0",
        isUnlocked ? "animate-fade-in" : "animate-fade-in filter grayscale",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "relative glass p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1",
        isUnlocked ? "hover:shadow-glass-hover cursor-pointer" : "cursor-not-allowed opacity-70"
      )}>
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
            <Lock className="w-8 h-8 text-white/80" />
          </div>
        )}
        
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-sm text-sakura-700 font-medium">{japaneseName}</span>
        </div>
        
        <div className="text-sm text-muted-foreground mb-3">{range}</div>
        
        {isUnlocked && (
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div 
              className="bg-sakura-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(completed / totalLevels) * 100}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default DifficultyLevel;
