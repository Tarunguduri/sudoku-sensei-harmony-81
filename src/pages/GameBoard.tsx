
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import ShuffleButton from '@/components/ShuffleButton';
import { ArrowLeft, Clock, Star, HelpCircle, Settings, Volume2, VolumeX } from 'lucide-react';
import { 
  samplePuzzles, 
  createPuzzleWithFixedCells, 
  isSudokuComplete, 
  solveSudoku,
  createEmptyGrid as createEmptySudokuGrid,
  shuffleSudokuGrid,
  updatePuzzlesWithUniqueSolutions
} from '@/utils/sudoku';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SakuraBackground from '@/components/SakuraBackground';
import GlassCard from '@/components/GlassCard';
import CompletionPopup from '@/components/CompletionPopup';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { useLanguage } from '@/components/settings/LanguageSettings';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

// Ensure all puzzles have unique solutions
updatePuzzlesWithUniqueSolutions();

const GameBoard = () => {
  const { difficulty, level } = useParams<{ difficulty: string; level: string }>();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { 
    soundEnabled, 
    volume,
    playNumberSelect, 
    playComplete, 
    playHint,
    playError,
    toggleSound
  } = useMusicPlayer();
  
  const [puzzle, setPuzzle] = useState<(number | null)[][]>([]);
  const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [shufflesUsed, setShufflesUsed] = useState(0);
  const [solution, setSolution] = useState<(number | null)[][] | null>(null);
  const [maxHints] = useState(3); // Maximum hints allowed per level
  const [maxShuffles] = useState(3); // Maximum shuffles allowed per level
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [originalPuzzle, setOriginalPuzzle] = useState<(number | null)[][]>([]);

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

  // Load completed levels from localStorage
  useEffect(() => {
    const savedLevels = localStorage.getItem('completedLevels');
    if (savedLevels) {
      setCompletedLevels(JSON.parse(savedLevels));
    }
  }, []);

  // Save completed levels to localStorage
  useEffect(() => {
    if (completedLevels.length > 0) {
      localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    }
  }, [completedLevels]);

  useEffect(() => {
    const loadPuzzle = () => {
      try {
        if (samplePuzzles[difficultyKey] && samplePuzzles[difficultyKey][levelIndex]) {
          const initialPuzzle = JSON.parse(JSON.stringify(samplePuzzles[difficultyKey][levelIndex]));
          setPuzzle(initialPuzzle);
          setOriginalPuzzle(initialPuzzle);
          setFixedCells(createPuzzleWithFixedCells(initialPuzzle));
          
          const solvedPuzzle = solveSudoku(initialPuzzle);
          setSolution(solvedPuzzle);
          
          // Reset game state when loading a new puzzle
          setSelectedCell(null);
          setTimer(0);
          setIsComplete(false);
          setHintsUsed(0);
          setShufflesUsed(0);
          setShowCompletionDialog(false);
        } else {
          // Handle case where puzzle doesn't exist
          toast({
            title: t('puzzleNotFound'),
            description: t('puzzleNotFoundMessage', { difficulty: difficulty, level: level }),
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading puzzle:", error);
        toast({
          title: t('errorLoadingPuzzle'),
          description: t('errorLoadingPuzzleMessage'),
          variant: "destructive",
        });
      }
    };
    
    loadPuzzle();
  }, [difficulty, level, toast, t]);

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
      
      // Play sound effect if enabled
      if (soundEnabled) {
        playNumberSelect();
      }
      
      // Check for errors
      let hasError = false;
      for (let c = 0; c < 9; c++) {
        if (c !== col && newPuzzle[row][c] === value && value !== null) {
          hasError = true;
          break;
        }
      }
      
      for (let r = 0; r < 9; r++) {
        if (r !== row && newPuzzle[r][col] === value && value !== null) {
          hasError = true;
          break;
        }
      }
      
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if ((r !== row || c !== col) && newPuzzle[r][c] === value && value !== null) {
            hasError = true;
            break;
          }
        }
        if (hasError) break;
      }
      
      if (hasError && value !== null && soundEnabled) {
        playError();
      }
      
      // Check if the puzzle is complete
      if (isSudokuComplete(newPuzzle)) {
        setIsComplete(true);
        if (soundEnabled) {
          playComplete();
        }
        
        // Mark level as completed
        const levelKey = `${difficulty}-${level}`;
        if (!completedLevels.includes(levelKey)) {
          setCompletedLevels([...completedLevels, levelKey]);
        }
        
        // Show completion dialog
        setShowCompletionDialog(true);
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
          title: t('congratulations'),
          description: t('completedAllPuzzles'),
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
      } else {
        toast({
          title: t('fixedCell'),
          description: t('fixedCellMessage'),
          variant: "default",
        });
      }
    } else {
      toast({
        title: t('noCellSelected'),
        description: t('noCellSelectedMessage'),
        variant: "default",
      });
    }
  };

  const handleHintRequest = () => {
    if (hintsUsed >= maxHints) {
      toast({
        title: t('hintLimitReached'),
        description: t('hintLimitMessage'),
        variant: "default",
      });
      return;
    }
    
    if (!selectedCell) {
      toast({
        title: t('selectCell'),
        description: t('selectCellMessage'),
        variant: "default",
      });
      return;
    }
    
    const { row, col } = selectedCell;
    
    if (fixedCells[row][col]) {
      toast({
        title: t('hintNotAvailable'),
        description: t('hintNotAvailableMessage'),
        variant: "default",
      });
      return;
    }
    
    if (!solution) {
      toast({
        title: t('hintNotAvailable'),
        description: t('solutionNotAvailable'),
        variant: "default",
      });
      return;
    }
    
    const correctValue = solution[row][col];
    if (correctValue === null) {
      toast({
        title: t('hintNotAvailable'),
        description: t('hintValueNotAvailable'),
        variant: "default",
      });
      return;
    }
    
    handleCellValueChange(row, col, correctValue);
    setHintsUsed(hintsUsed + 1);
    if (soundEnabled) {
      playHint();
    }
    
    toast({
      title: t('hintUsed'),
      description: t('hintUsedMessage', { value: correctValue, remaining: maxHints - hintsUsed - 1 }),
      variant: "default",
    });
  };

  // Function to handle shuffling the Sudoku grid
  const handleShuffleRequest = () => {
    if (shufflesUsed >= maxShuffles) {
      toast({
        title: t('shuffleLimitReached'),
        description: t('shuffleLimitMessage'),
        variant: "default",
      });
      return;
    }
    
    // Increase the shuffle count
    setShufflesUsed(shufflesUsed + 1);
    
    // Shuffle the grid
    const shuffledPuzzle = shuffleSudokuGrid(originalPuzzle, fixedCells);
    setPuzzle(shuffledPuzzle);
    
    // Re-calculate the solution for the shuffled puzzle
    const newSolution = solveSudoku(shuffledPuzzle);
    setSolution(newSolution);
    
    // Play sound effect
    if (soundEnabled) {
      playHint();
    }
    
    toast({
      title: t('boardShuffled'),
      description: t('boardShuffledMessage', { remaining: maxShuffles - shufflesUsed - 1 }),
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-pink-50 dark:from-ink-900 dark:to-ink-800">
      <SakuraBackground petalsCount={20} showTree={true} petalsColor="pink" density="normal" />
      
      <header className="flex justify-between items-center mb-4 sm:mb-6 z-10">
        <Link to={`/levels/${difficulty}`}>
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            {t('back')}
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
          {t(difficulty?.toLowerCase() || 'beginner')} - {t('level')} {level}
        </h1>
      </div>
      
      <div className="flex justify-between sm:justify-center sm:space-x-6 mb-3 sm:mb-4 animate-fade-in z-10" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-stone-500 dark:text-stone-400" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
        
        <div className="flex items-center ml-4 sm:ml-0">
          <Star className="w-5 h-5 mr-2 text-amber-500" />
          <span>{hintsUsed}/{maxHints}</span>
        </div>
        
        <button 
          onClick={() => toggleSound()} 
          className="flex items-center ml-4 sm:ml-0 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
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
        
        <div className="flex justify-center space-x-4">
          <CustomButton 
            variant="outline" 
            Icon={HelpCircle} 
            onClick={handleHintRequest}
            disabled={hintsUsed >= maxHints}
          >
            {t('hint')} ({maxHints - hintsUsed} {t('left')})
          </CustomButton>
          
          <ShuffleButton 
            onShuffle={handleShuffleRequest} 
            shufflesUsed={shufflesUsed} 
            maxShuffles={maxShuffles} 
          />
        </div>
      </div>

      <CompletionPopup
        isOpen={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        onNextLevel={advanceToNextLevel}
        onMenu={() => navigate('/levels')}
        difficulty={difficulty || ""}
        level={level || ""}
        time={timer}
        hintsUsed={hintsUsed}
      />
    </div>
  );
};

const createEmptyGrid = <T extends unknown>(defaultValue: T): T[][] => {
  return Array(9).fill(null).map(() => Array(9).fill(defaultValue));
};

export default GameBoard;
