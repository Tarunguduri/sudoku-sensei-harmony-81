
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SakuraBackground from '@/components/SakuraBackground';
import Logo from '@/components/Logo';
import AnimatedTitle from '@/components/AnimatedTitle';
import DifficultyLevel from '@/components/DifficultyLevel';
import CustomButton from '@/components/CustomButton';
import { ArrowLeft } from 'lucide-react';

const LevelCategories = () => {
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);

  // Load completed levels from localStorage
  useEffect(() => {
    const savedLevels = localStorage.getItem('completedLevels');
    if (savedLevels) {
      setCompletedLevels(JSON.parse(savedLevels));
    }
  }, []);

  // Count completed levels for each difficulty
  const countCompletedLevels = (difficulty: string): number => {
    return completedLevels.filter(level => level.startsWith(difficulty.toLowerCase())).length;
  };

  // Check if difficulty is unlocked based on previous difficulty progress
  const isDifficultyUnlocked = (difficulty: string): boolean => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return true;
      case 'novice':
        return countCompletedLevels('beginner') >= 3;
      case 'intermediate':
        return countCompletedLevels('novice') >= 3;
      case 'skilled':
        return countCompletedLevels('intermediate') >= 3;
      case 'expert':
        return countCompletedLevels('skilled') >= 3;
      case 'master':
        return countCompletedLevels('expert') >= 3;
      default:
        return false;
    }
  };

  const difficultyLevels = [
    { name: "Beginner", japaneseName: "初めて (Hajimete)", range: "Levels 1-5", totalLevels: 5, completed: countCompletedLevels('beginner') },
    { name: "Novice", japaneseName: "新人 (Shinjin)", range: "Levels 6-10", totalLevels: 5, completed: countCompletedLevels('novice') },
    { name: "Intermediate", japaneseName: "中段 (Chuudan)", range: "Levels 11-15", totalLevels: 5, completed: countCompletedLevels('intermediate') },
    { name: "Skilled", japaneseName: "匠 (Takumi)", range: "Levels 16-20", totalLevels: 5, completed: countCompletedLevels('skilled') },
    { name: "Expert", japaneseName: "先生 (Sensei)", range: "Levels 21-25", totalLevels: 5, completed: countCompletedLevels('expert') },
    { name: "Master", japaneseName: "将軍 (Shogun)", range: "Levels 26-30", totalLevels: 5, completed: countCompletedLevels('master') }
  ];

  return (
    <div className="relative min-h-screen flex flex-col p-6 md:p-8 overflow-hidden">
      <SakuraBackground petalsCount={15} />
      
      <header className="flex justify-between items-center mb-8 z-10">
        <Link to="/">
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft} className="opacity-0 animate-fade-in">
            Back
          </CustomButton>
        </Link>
        <Logo className="opacity-0 animate-fade-in" />
      </header>
      
      <main className="flex-1 max-w-3xl mx-auto w-full z-10">
        <AnimatedTitle
          className="mb-8 text-left"
          subtitle="Select your challenge level"
          delay={200}
        >
          Difficulty Levels
        </AnimatedTitle>
        
        <div className="grid gap-4 md:gap-6">
          {difficultyLevels.map((level, index) => (
            <DifficultyLevel
              key={level.name}
              name={level.name}
              japaneseName={level.japaneseName}
              range={level.range}
              isUnlocked={isDifficultyUnlocked(level.name)}
              index={index}
              totalLevels={level.totalLevels}
              completed={level.completed}
            />
          ))}
        </div>
      </main>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground z-10 opacity-0 animate-fade-in" style={{ animationDelay: '1200ms' }}>
        <p>Complete levels to unlock more challenging puzzles</p>
      </footer>
    </div>
  );
};

export default LevelCategories;
