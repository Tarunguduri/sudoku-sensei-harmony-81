
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SakuraBackground from '@/components/SakuraBackground';
import AnimatedTitle from '@/components/AnimatedTitle';
import CustomButton from '@/components/CustomButton';
import GlassCard from '@/components/GlassCard';
import { Play, Book, Settings } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <SakuraBackground petalsCount={20} />
      
      <div className="absolute top-6 left-6 z-10 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <Logo />
      </div>
      
      <div className="max-w-md w-full z-10 space-y-8">
        <AnimatedTitle 
          className="mb-10"
          subtitle="Challenge your mind with Sudoku puzzles"
          delay={100}
        >
          <span className="text-ink-900">Sudoku</span> <span className="text-sakura-500">Sensei</span>
        </AnimatedTitle>
        
        <GlassCard 
          className="space-y-4 opacity-0 animate-scale-in"
          style={{ animationDelay: '500ms' }}
        >
          <CustomButton 
            fullWidth 
            size="lg" 
            Icon={Play}
            onClick={() => navigate('/levels')}
          >
            Start Game
          </CustomButton>
          
          <div className="grid grid-cols-2 gap-4">
            <CustomButton 
              variant="outline" 
              Icon={Book}
              fullWidth
            >
              How to Play
            </CustomButton>
            
            <CustomButton 
              variant="outline" 
              Icon={Settings}
              fullWidth
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
