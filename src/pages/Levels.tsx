
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SakuraBackground from '@/components/SakuraBackground';
import Logo from '@/components/Logo';
import GlassCard from '@/components/GlassCard';
import CustomButton from '@/components/CustomButton';
import { ArrowLeft, Check, Lock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelButtonProps {
  level: number;
  completed: boolean;
  isUnlocked: boolean;
  starRating: number;  // 0-3 stars (can be decimal for half stars)
  onClick: () => void;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, completed, isUnlocked, starRating, onClick }) => {
  // Calculate full and half stars
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 !== 0;
  
  return (
    <button
      className={cn(
        "aspect-square rounded-md p-3 transition-all duration-300 relative",
        isUnlocked 
          ? "glass hover:shadow-glass-hover active:shadow-glass-pressed" 
          : "bg-stone-200 cursor-not-allowed",
        completed && "bg-sakura-100"
      )}
      onClick={isUnlocked ? onClick : undefined}
      disabled={!isUnlocked}
    >
      {completed && (
        <div className="absolute top-1 right-1">
          <Check className="w-4 h-4 text-sakura-500" />
        </div>
      )}
      
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
          <Lock className="w-5 h-5 text-stone-500" />
        </div>
      )}
      
      <span className={cn(
        "text-lg font-medium",
        completed ? "text-sakura-700" : isUnlocked ? "text-ink-800" : "text-stone-400"
      )}>
        {level}
      </span>
      
      {/* Star rating display for completed levels */}
      {completed && starRating > 0 && (
        <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-0.5">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
          ))}
          {hasHalfStar && (
            <div className="relative w-3 h-3">
              <Star className="absolute w-3 h-3 text-amber-500" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              </div>
            </div>
          )}
          {[...Array(3 - Math.ceil(starRating))].map((_, i) => (
            <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-3 h-3 text-amber-500" />
          ))}
        </div>
      )}
    </button>
  );
};

const Levels = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [starRatings, setStarRatings] = useState<Record<string, number>>({});
  
  // Get the base level number based on the category
  const getLevelBase = () => {
    switch (category?.toLowerCase()) {
      case 'beginner': return 1;
      case 'novice': return 6;
      case 'intermediate': return 11;
      case 'skilled': return 16;
      case 'expert': return 21;
      case 'master': return 26;
      default: return 1;
    }
  };

  const getLevelName = () => {
    switch (category?.toLowerCase()) {
      case 'beginner': return { en: 'Beginner', jp: '初めて (Hajimete)' };
      case 'novice': return { en: 'Novice', jp: '新人 (Shinjin)' };
      case 'intermediate': return { en: 'Intermediate', jp: '中段 (Chuudan)' };
      case 'skilled': return { en: 'Skilled', jp: '匠 (Takumi)' };
      case 'expert': return { en: 'Expert', jp: '先生 (Sensei)' };
      case 'master': return { en: 'Master', jp: '将軍 (Shogun)' };
      default: return { en: 'Beginner', jp: '初めて (Hajimete)' };
    }
  };

  // Load completed levels and star ratings from localStorage
  useEffect(() => {
    const savedLevels = localStorage.getItem('completedLevels');
    if (savedLevels) {
      setCompletedLevels(JSON.parse(savedLevels));
    }
    
    // Load star ratings
    const ratings: Record<string, number> = {};
    if (category) {
      for (let i = 1; i <= 5; i++) {
        const levelKey = `${category.toLowerCase()}-${i}-stars`;
        const starValue = localStorage.getItem(levelKey);
        if (starValue) {
          ratings[`${category.toLowerCase()}-${i}`] = parseFloat(starValue);
        }
      }
    }
    setStarRatings(ratings);
  }, [category]);

  const levelBase = getLevelBase();
  const levelName = getLevelName();

  const isLevelCompleted = (levelNumber: number): boolean => {
    const levelKey = `${category?.toLowerCase()}-${levelNumber - levelBase + 1}`;
    return completedLevels.includes(levelKey);
  };

  const isLevelUnlocked = (levelNumber: number): boolean => {
    // First level is always unlocked
    if (levelNumber === levelBase) return true;
    
    // Previous level completed means this level is unlocked
    const previousLevelKey = `${category?.toLowerCase()}-${levelNumber - levelBase}`;
    return completedLevels.includes(previousLevelKey);
  };

  const getLevelStarRating = (levelNumber: number): number => {
    const levelKey = `${category?.toLowerCase()}-${levelNumber - levelBase + 1}`;
    return starRatings[levelKey] || 0;
  };

  const handleLevelClick = (levelNumber: number) => {
    navigate(`/play/${category?.toLowerCase()}/${levelNumber - levelBase + 1}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col p-6 md:p-8 overflow-hidden">
      <SakuraBackground petalsCount={12} />
      
      <header className="flex justify-between items-center mb-8 z-10">
        <Link to="/levels">
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft} className="opacity-0 animate-fade-in">
            Back
          </CustomButton>
        </Link>
        <Logo className="opacity-0 animate-fade-in" />
      </header>
      
      <main className="flex-1 max-w-lg mx-auto w-full z-10">
        <div className="text-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-3xl font-bold">{levelName.en}</h1>
          <p className="text-sakura-600 mt-1">{levelName.jp}</p>
        </div>
        
        <GlassCard className="opacity-0 animate-scale-in" style={{ animationDelay: '400ms' }}>
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }, (_, i) => i + levelBase).map((level) => (
              <LevelButton
                key={level}
                level={level}
                completed={isLevelCompleted(level)}
                isUnlocked={isLevelUnlocked(level)}
                starRating={getLevelStarRating(level)}
                onClick={() => handleLevelClick(level)}
              />
            ))}
          </div>
        </GlassCard>
        
        <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-center text-sm text-muted-foreground">
            Complete a level to unlock the next challenge
          </p>
        </div>
      </main>
    </div>
  );
};

export default Levels;
