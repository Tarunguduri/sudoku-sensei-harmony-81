
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SakuraBackground from '@/components/SakuraBackground';
import Logo from '@/components/Logo';
import AnimatedTitle from '@/components/AnimatedTitle';
import DifficultyLevel from '@/components/DifficultyLevel';
import CustomButton from '@/components/CustomButton';
import { ArrowLeft } from 'lucide-react';

const LevelCategories = () => {
  const [progress, setProgress] = useState({
    beginner: 2,
    novice: 0,
    intermediate: 0,
    skilled: 0,
    expert: 0,
    master: 0
  });

  const difficultyLevels = [
    { name: "Beginner", japaneseName: "初めて (Hajimete)", range: "Levels 1-5", isUnlocked: true, totalLevels: 5, completed: progress.beginner },
    { name: "Novice", japaneseName: "新人 (Shinjin)", range: "Levels 6-10", isUnlocked: progress.beginner >= 3, totalLevels: 5, completed: progress.novice },
    { name: "Intermediate", japaneseName: "中段 (Chuudan)", range: "Levels 11-15", isUnlocked: progress.novice >= 3, totalLevels: 5, completed: progress.intermediate },
    { name: "Skilled", japaneseName: "匠 (Takumi)", range: "Levels 16-20", isUnlocked: progress.intermediate >= 3, totalLevels: 5, completed: progress.skilled },
    { name: "Expert", japaneseName: "先生 (Sensei)", range: "Levels 21-25", isUnlocked: progress.skilled >= 3, totalLevels: 5, completed: progress.expert },
    { name: "Master", japaneseName: "将軍 (Shogun)", range: "Levels 26-30", isUnlocked: progress.expert >= 3, totalLevels: 5, completed: progress.master }
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
              isUnlocked={level.isUnlocked}
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
