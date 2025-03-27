
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import { ArrowLeft, Clock, Star, HelpCircle, Settings } from 'lucide-react';
import { 
  samplePuzzles, 
  createPuzzleWithFixedCells, 
  isSudokuComplete, 
  solveSudoku,
  createEmptyGrid as createEmptySudokuGrid
} from '@/utils/sudoku';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SakuraBackground from '@/components/SakuraBackground';
import GlassCard from '@/components/GlassCard';

// Sound effects
const useSound = () => {
  const playNumberSelect = () => {
    const sound = new Audio('/audio/select.mp3');
    sound.volume = 0.3;
    sound.play().catch(err => console.log('Audio play failed', err));
  };

  const playComplete = () => {
    const sound = new Audio('/audio/complete.mp3');
    sound.volume = 0.4;
    sound.play().catch(err => console.log('Audio play failed', err));
  };

  const playHint = () => {
    const sound = new Audio('/audio/hint.mp3');
    sound.volume = 0.3;
    sound.play().catch(err => console.log('Audio play failed', err));
  };

  return { playNumberSelect, playComplete, playHint };
};

const GameBoard = () => {
  const { difficulty, level } = useParams<{ difficulty: string; level: string }>();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { playNumberSelect, playComplete, playHint } = useSound();
  const navigate = useNavigate();
  
  const [puzzle, setPuzzle] = useState<(number | null)[][]>([]);
  const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solution, setSolution] = useState<(number | null)[][] | null>(null);
  const [maxHints] = useState(3); // Maximum hints allowed per level
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  const getDifficultyKey = (): keyof typeof samplePuzzles => {
    switch (difficulty) {
      case 'beginner': return 'beginner';
      case 'novice': return 'novice';
      case 'intermediate': return 'intermediate';
      case 'skilled': return 'skilled';
      case 'expert': return 'expert';
      case 'master': return 'master';
      default: return 'beginner';
    }
  };

  const difficultyKey = getDifficultyKey();
  const levelIndex = Number(level) - 1;

  useEffect(() => {
    const loadPuzzle = () => {
      try {
        if (samplePuzzles[difficultyKey] && samplePuzzles[difficultyKey][levelIndex]) {
          const initialPuzzle = JSON.parse(JSON.stringify(samplePuzzles[difficultyKey][levelIndex]));
          setPuzzle(initialPuzzle);
          setFixedCells(createPuzzleWithFixedCells(initialPuzzle));
          
          const solvedPuzzle = solveSudoku(initialPuzzle);
          setSolution(solvedPuzzle);
          
          // Reset game state when loading a new puzzle
          setSelectedCell(null);
          setTimer(0);
          setIsComplete(false);
          setHintsUsed(0);
        } else {
          // Handle case where puzzle doesn't exist
          toast({
            title: "Puzzle Not Found",
            description: `Could not load puzzle for ${difficulty} level ${level}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading puzzle:", error);
        toast({
          title: "Error Loading Puzzle",
          description: "An error occurred while loading the puzzle",
          variant: "destructive",
        });
      }
    };
    
    loadPuzzle();
    
    // Clear any existing auto-advance timer when loading a new puzzle
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
  }, [difficulty, level, toast, autoAdvanceTimer]);

  // Cleanup auto-advance timer on component unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [autoAdvanceTimer]);

  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCellValueChange = (row: number, col: number, value: number | null) => {
    // Set selectedCell to enable numberpad usage
    setSelectedCell({ row, col });
    
    if (fixedCells[row][col]) return;
    
    // Handle value changes only when value is different
    if (puzzle[row][col] !== value) {
      // Create a deep copy of the puzzle array
      const newPuzzle = JSON.parse(JSON.stringify(puzzle));
      newPuzzle[row][col] = value;
      setPuzzle(newPuzzle);
      
      // Check if the puzzle is complete
      if (isSudokuComplete(newPuzzle)) {
        setIsComplete(true);
        playComplete();
        toast({
          title: "Puzzle Complete!",
          description: `Great job! You solved the puzzle in ${formatTime(timer)}`,
        });
        
        // Set up auto-advance to next level after 3 seconds
        const nextTimer = setTimeout(() => {
          advanceToNextLevel();
        }, 3000);
        
        setAutoAdvanceTimer(nextTimer);
      }
    }
  };

  // Function to advance to the next level
  const advanceToNextLevel = () => {
    if (!difficulty || !level) return;
    
    const currentLevel = parseInt(level);
    const diffKey = getDifficultyKey();
    
    // Check if there's a next level in the current difficulty
    if (currentLevel < samplePuzzles[diffKey].length) {
      // Navigate to the next level
      navigate(`/play/${difficulty}/${currentLevel + 1}`);
    } else {
      // If we're at the end of the current difficulty, check if there's a next difficulty
      const difficulties = ['beginner', 'novice', 'intermediate', 'skilled', 'expert', 'master'];
      const currentDiffIndex = difficulties.indexOf(difficulty);
      
      if (currentDiffIndex < difficulties.length - 1) {
        // Move to the first level of the next difficulty
        navigate(`/play/${difficulties[currentDiffIndex + 1]}/1`);
      } else {
        // User has completed all levels
        toast({
          title: "Congratulations!",
          description: "You've completed all available puzzles!",
        });
        
        // Navigate back to level selection
        setTimeout(() => {
          navigate('/levels');
        }, 2000);
      }
    }
  };

  const handleNumberSelect = (num: number | null) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      if (!fixedCells[row][col]) {
        handleCellValueChange(row, col, num);
        playNumberSelect();
      } else {
        toast({
          title: "Fixed Cell",
          description: "This cell cannot be modified",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "No Cell Selected",
        description: "Please select a cell on the grid first",
        variant: "default",
      });
    }
  };

  const handleHintRequest = () => {
    if (hintsUsed >= maxHints) {
      toast({
        title: "Hint Limit Reached",
        description: "You've used all available hints for this level",
        variant: "default",
      });
      return;
    }
    
    if (!selectedCell) {
      toast({
        title: "Select a Cell",
        description: "Please select a cell to receive a hint",
        variant: "default",
      });
      return;
    }
    
    const { row, col } = selectedCell;
    
    if (fixedCells[row][col]) {
      toast({
        title: "Hint Not Available",
        description: "Hints can only be used on empty or user-filled cells",
        variant: "default",
      });
      return;
    }
    
    if (!solution) {
      toast({
        title: "Hint Not Available",
        description: "Solution is not available",
        variant: "default",
      });
      return;
    }
    
    const correctValue = solution[row][col];
    if (correctValue === null) {
      toast({
        title: "Hint Not Available",
        description: "Could not determine the correct value for this cell",
        variant: "default",
      });
      return;
    }
    
    handleCellValueChange(row, col, correctValue);
    setHintsUsed(hintsUsed + 1);
    playHint();
    
    toast({
      title: "Hint Used",
      description: `The correct value for this cell is ${correctValue}. ${maxHints - hintsUsed - 1} hints remaining.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-pink-50 dark:from-ink-900 dark:to-ink-800">
      <SakuraBackground petalsCount={20} showTree={true} petalsColor="pink" density="normal" />
      
      <header className="flex justify-between items-center mb-4 sm:mb-6 z-10">
        <Link to={`/levels/${difficulty}`}>
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            Back
          </CustomButton>
        </Link>
        <Logo size="sm" />
        <Link to="/settings">
          <CustomButton variant="ghost" size="sm" Icon={Settings}>
            {/* Empty to match the other side */}
          </CustomButton>
        </Link>
      </header>
      
      <div className="text-center mb-3 sm:mb-4 animate-fade-in z-10">
        <h1 className="text-xl sm:text-2xl font-bold capitalize">
          {difficulty} - Level {level}
        </h1>
      </div>
      
      <div className="flex justify-center space-x-4 sm:space-x-6 mb-3 sm:mb-4 animate-fade-in z-10" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-stone-500" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-amber-500" />
          <span>{hintsUsed}/{maxHints}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center mx-auto w-full animate-scale-in z-10" style={{ animationDelay: '300ms' }}>
        {puzzle.length > 0 && fixedCells.length > 0 && (
          <SudokuBoard
            puzzle={puzzle}
            fixedCells={fixedCells}
            onCellValueChange={handleCellValueChange}
            className="mb-4 sm:mb-6"
          />
        )}
        
        {!isComplete && (
          <div className="w-full max-w-md mb-4 sm:mb-6">
            <NumberPad onNumberSelect={handleNumberSelect} />
          </div>
        )}
        
        <div className="flex justify-center">
          <CustomButton 
            variant="outline" 
            Icon={HelpCircle} 
            onClick={handleHintRequest}
            disabled={hintsUsed >= maxHints}
          >
            Hint ({maxHints - hintsUsed} left)
          </CustomButton>
        </div>
        
        {isComplete && (
          <GlassCard className="w-full max-w-md mt-6 animate-scale-in">
            <div className="text-center py-2">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                Puzzle Completed!
              </h3>
              <p className="text-sm mb-2">
                Time: {formatTime(timer)} • Hints Used: {hintsUsed}/{maxHints}
              </p>
              <p className="text-xs text-stone-500">
                Advancing to next level in 3 seconds...
              </p>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

const createEmptyGrid = <T extends unknown>(defaultValue: T): T[][] => {
  return Array(9).fill(null).map(() => Array(9).fill(defaultValue));
};

export default GameBoard;
