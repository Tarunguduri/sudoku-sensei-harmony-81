
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, HelpCircle, Zap, X } from 'lucide-react';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SakuraBackground from '@/components/SakuraBackground';
import AnimatedTitle from '@/components/AnimatedTitle';
import GlassCard from '@/components/GlassCard';
import { useIsMobile } from '@/hooks/use-mobile';

const HowToPlay = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-pink-50">
      <SakuraBackground petalsCount={10} />
      
      <header className="flex justify-between items-center mb-6 z-10">
        <Link to="/">
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            Back
          </CustomButton>
        </Link>
        <Logo size="sm" />
      </header>
      
      <AnimatedTitle
        className="mb-6"
        subtitle="Learn to play like a Sensei"
        delay={200}
      >
        How to Play
      </AnimatedTitle>
      
      <div className="flex flex-col items-center max-w-md mx-auto w-full space-y-6 z-10 pb-8">
        {/* Sudoku Rules */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-sakura-500" />
            Sudoku Rules
          </h2>
          
          <ul className="space-y-3 text-left">
            <li className="flex items-start">
              <Check className="w-4 h-4 text-bamboo-500 mt-1 mr-2 flex-shrink-0" />
              <span>Fill the 9×9 grid with digits 1-9.</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-bamboo-500 mt-1 mr-2 flex-shrink-0" />
              <span>Each row must contain all digits from 1 to 9 without repetition.</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-bamboo-500 mt-1 mr-2 flex-shrink-0" />
              <span>Each column must contain all digits from 1 to 9 without repetition.</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-bamboo-500 mt-1 mr-2 flex-shrink-0" />
              <span>Each 3×3 box must contain all digits from 1 to 9 without repetition.</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 text-bamboo-500 mt-1 mr-2 flex-shrink-0" />
              <span>Some digits are given as clues. These cannot be changed.</span>
            </li>
          </ul>
        </GlassCard>
        
        {/* Game Controls */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-amber-500" />
            Game Controls
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Playing the Game:</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded bg-sakura-100 flex items-center justify-center mr-2 flex-shrink-0">1</div>
                  <span>Tap on an empty cell to select it</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded bg-sakura-100 flex items-center justify-center mr-2 flex-shrink-0">2</div>
                  <span>Use the number pad to enter a digit</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded bg-sakura-100 flex items-center justify-center mr-2 flex-shrink-0">3</div>
                  <span>Tap the clear button (✕) to remove a digit</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Understanding the Grid:</h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded flex items-center justify-center mr-2 bg-white border border-stone-200 font-bold text-ink-700">5</div>
                  <span>Fixed digits</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded flex items-center justify-center mr-2 bg-white border border-stone-200 text-ink-600">7</div>
                  <span>Your entries</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded flex items-center justify-center mr-2 bg-sakura-200 border border-stone-200">3</div>
                  <span>Selected cell</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded flex items-center justify-center mr-2 bg-red-100 border border-stone-200 text-red-500">4</div>
                  <span>Error</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* Strategies */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '500ms' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-indigo-500" />
            Solving Strategies
          </h2>
          
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-semibold">Scanning Technique</h3>
              <p className="text-sm text-stone-600">Look for cells where only one number can fit by checking the row, column, and box constraints.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Candidate Elimination</h3>
              <p className="text-sm text-stone-600">Keep track of possible values for each cell and eliminate candidates as you fill in other cells.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Cross-Hatching</h3>
              <p className="text-sm text-stone-600">Find where a number must go by examining rows and columns that intersect within a box.</p>
            </div>
            
            <div className="border-t pt-4 border-stone-200">
              <p className="text-sm italic">Remember: Sudoku is about logical deduction, not guesswork. Every puzzle in Sudoku Sensei has a unique solution that can be found through logic alone.</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default HowToPlay;
