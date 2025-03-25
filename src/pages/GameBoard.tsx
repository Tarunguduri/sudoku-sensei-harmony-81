import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import { ArrowLeft, Clock, Star, HelpCircle, Settings } from 'lucide-react';
import { samplePuzzles, createPuzzleWithFixedCells, isSudokuComplete } from '@/utils/sudokuUtils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const GameBoard = () => {
  const { difficulty, level } = useParams<{ difficulty: string; level: string }>();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [puzzle, setPuzzle] = useState<(number | null)[][]>([]);
  const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

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
    if (samplePuzzles[difficultyKey] && samplePuzzles[difficultyKey][levelIndex]) {
      const initialPuzzle = JSON.parse(JSON.stringify(samplePuzzles[difficultyKey][levelIndex]));
      setPuzzle(initialPuzzle);
      setFixedCells(createPuzzleWithFixedCells(initialPuzzle));
    }
  }, [difficulty, level]);

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
    if (fixedCells[row][col]) return;
    
    const newPuzzle = [...puzzle];
    newPuzzle[row][col] = value;
    setPuzzle(newPuzzle);
    
    if (isSudokuComplete(newPuzzle)) {
      setIsComplete(true);
      toast({
        title: "Puzzle Complete!",
        description: `Great job! You solved the puzzle in ${formatTime(timer)}`,
      });
    }
  };

  const handleNumberSelect = (num: number | null) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      handleCellValueChange(row, col, num);
    }
  };

  const handleHintRequest = () => {
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
    
    const correctValue = 5;
    handleCellValueChange(row, col, correctValue);
    setHintsUsed(hintsUsed + 1);
    
    toast({
      title: "Hint Used",
      description: `The correct value for this cell is ${correctValue}`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 overflow-hidden bg-stone-50">
      <header className="flex justify-between items-center mb-4 sm:mb-6 z-10">
        <Link to={`/levels/${difficulty}`}>
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            Back
          </CustomButton>
        </Link>
        <Logo size="sm" />
        <Link to="/settings">
          <CustomButton variant="ghost" size="sm" Icon={Settings}>
          </CustomButton>
        </Link>
      </header>
      
      <div className="text-center mb-3 sm:mb-4 animate-fade-in">
        <h1 className="text-xl sm:text-2xl font-bold capitalize">
          {difficulty} - Level {level}
        </h1>
      </div>
      
      <div className="flex justify-center space-x-4 sm:space-x-6 mb-3 sm:mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-stone-500" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-amber-500" />
          <span>{hintsUsed}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center mx-auto w-full animate-scale-in" style={{ animationDelay: '300ms' }}>
        {puzzle.length > 0 && fixedCells.length > 0 && (
          <SudokuBoard
            puzzle={puzzle}
            fixedCells={fixedCells}
            onCellValueChange={(row, col, value) => {
              handleCellValueChange(row, col, value);
              setSelectedCell({ row, col });
            }}
            className="mb-4 sm:mb-6"
          />
        )}
        
        <div className="w-full max-w-md mb-4 sm:mb-6">
          <NumberPad onNumberSelect={handleNumberSelect} />
        </div>
        
        <div className="flex justify-center">
          <CustomButton variant="outline" Icon={HelpCircle} onClick={handleHintRequest}>
            Hint
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
