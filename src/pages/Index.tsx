
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SakuraBackground from '@/components/SakuraBackground';
import AnimatedTitle from '@/components/AnimatedTitle';
import CustomButton from '@/components/CustomButton';
import GlassCard from '@/components/GlassCard';
import { Play, Brain, Book, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-stone-50 to-pink-50">
      <SakuraBackground petalsCount={25} />
      
      <div className="absolute top-6 left-6 z-10 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <Logo />
      </div>
      
      <div className="max-w-md w-full z-10 space-y-8">
        <AnimatedTitle 
          className="mb-10"
          subtitle="Challenge your mind with traditional Japanese puzzles"
          delay={100}
        >
          <span className="text-ink-900">Sudoku</span> <span className="text-sakura-500">Sensei</span>
        </AnimatedTitle>
        
        <GlassCard 
          className="space-y-6 opacity-0 animate-scale-in"
          style={{ animationDelay: '500ms' }}
        >
          <div className="text-center text-sm text-stone-600 mb-2">
            <p className="font-serif italic">数独先生</p>
            <p>Choose your path to mastery</p>
          </div>
          
          <CustomButton 
            fullWidth 
            size="lg" 
            Icon={Play}
            onClick={() => navigate('/levels')}
            className="bg-sakura-500 hover:bg-sakura-600"
          >
            Play Game
          </CustomButton>
          
          <CustomButton 
            fullWidth 
            size="lg" 
            Icon={Brain}
            onClick={() => navigate('/ai-solver')}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            AI Solver
          </CustomButton>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <CustomButton 
              variant="outline" 
              Icon={Book}
              fullWidth
              onClick={() => navigate('/how-to-play')}
            >
              How to Play
            </CustomButton>
            
            <CustomButton 
              variant="outline" 
              Icon={Settings}
              fullWidth
              onClick={() => navigate('/settings')}
            >
              Settings
            </CustomButton>
          </div>
        </GlassCard>
        
        <div 
          className="mt-8 text-center text-sm text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '800ms' }}
        >
          <p>Solve puzzles. Train your mind. Become a Sudoku master.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
