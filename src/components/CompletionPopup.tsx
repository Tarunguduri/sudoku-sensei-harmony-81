
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trophy, Star, Clock, ChevronRight, Home } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import GlassCard from '@/components/GlassCard';
import confetti from 'canvas-confetti';

interface CompletionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNextLevel: () => void;
  onMenu: () => void;
  difficulty: string;
  level: string;
  time: number;
  hintsUsed: number;
}

const CompletionPopup: React.FC<CompletionPopupProps> = ({
  isOpen,
  onClose,
  onNextLevel,
  onMenu,
  difficulty,
  level,
  time,
  hintsUsed,
}) => {
  // Trigger confetti effect when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      // Fire confetti from middle-top
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 }
      });
      
      // Fire confetti from left
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 }
        });
      }, 350);
      
      // Fire confetti from right
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 }
        });
      }, 500);
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-white to-pink-50 dark:from-ink-800 dark:to-ink-900 border-sakura-200 sm:max-w-md">
        <DialogHeader className="mb-2">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-sakura-400 to-sakura-500 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center font-bold">
            Congratulations! 🎉
          </DialogTitle>
          <p className="text-center text-sakura-600 dark:text-sakura-400">
            You've completed {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level {level}
          </p>
        </DialogHeader>
        
        <GlassCard className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 text-sakura-500 mb-1" />
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="font-bold">{formatTime(time)}</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-6 w-6 text-amber-500 mb-1" />
              <span className="text-sm text-muted-foreground">Hints Used</span>
              <span className="font-bold">{hintsUsed}/3</span>
            </div>
          </div>
        </GlassCard>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <CustomButton 
            variant="default" 
            Icon={ChevronRight}
            onClick={onNextLevel}
            className="flex-1 bg-sakura-500 hover:bg-sakura-600"
          >
            Next Level
          </CustomButton>
          <CustomButton 
            variant="outline" 
            Icon={Home}
            onClick={onMenu}
            className="flex-1"
          >
            Menu
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionPopup;
