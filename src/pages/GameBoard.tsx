
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import { ArrowLeft, Clock, Star, HelpCircle } from 'lucide-react';
import { samplePuzzles, createPuzzleWithFixedCells, isSudokuComplete } from '@/utils/sudokuUtils';

const GameBoard = () => {
  const { difficulty, level } = useParams<{ difficulty: string; level: string }>();
  const [puzzle, setPuzzle] = useState<(number | null)[][]>([]);
  const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Convert difficulty param to key in samplePuzzles
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

  // Initialize the game
  useEffect(() => {
    if (samplePuzzles[difficultyKey] && samplePuzzles[difficultyKey][levelIndex]) {
      const initialPuzzle = JSON.parse(JSON.stringify(samplePuzzles[difficultyKey][levelIndex]));
      setPuzzle(initialPuzzle);
      setFixedCells(createPuzzleWithFixedCells(initialPuzzle));
    }
  }, [difficulty, level]);

  // Timer
  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isComplete]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle cell value change
  const handleCellValueChange = (row: number, col: number, value: number | null) => {
    if (fixedCells[row][col]) return;
    
    const newPuzzle = [...puzzle];
    newPuzzle[row][col] = value;
    setPuzzle(newPuzzle);
    
    // Check if puzzle is complete
    if (isSudokuComplete(newPuzzle)) {
      setIsComplete(true);
    }
  };

  // Handle number pad selection
  const handleNumberSelect = (num: number | null) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      handleCellValueChange(row, col, num);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 overflow-hidden bg-stone-50">
      <header className="flex justify-between items-center mb-6 z-10">
        <Link to={`/levels/${difficulty}`}>
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            Back
          </CustomButton>
        </Link>
        <Logo size="sm" />
      </header>
      
      <div className="text-center mb-4 animate-fade-in">
        <h1 className="text-2xl font-bold capitalize">
          {difficulty} - Level {level}
        </h1>
      </div>
      
      <div className="flex justify-center space-x-6 mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-stone-500" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-amber-500" />
          <span>0</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center max-w-md mx-auto w-full animate-scale-in" style={{ animationDelay: '300ms' }}>
        {puzzle.length > 0 && fixedCells.length > 0 && (
          <SudokuBoard
            puzzle={puzzle}
            fixedCells={fixedCells}
            onCellValueChange={handleCellValueChange}
          />
        )}
        
        <div className="mt-6 w-full">
          <NumberPad onNumberSelect={handleNumberSelect} />
        </div>
        
        <div className="mt-6 flex justify-center">
          <CustomButton variant="outline" Icon={HelpCircle}>
            Hint
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
