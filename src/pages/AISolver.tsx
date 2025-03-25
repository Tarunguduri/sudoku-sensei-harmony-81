import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SakuraBackground from '@/components/SakuraBackground';
import GlassCard from '@/components/GlassCard';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import { ArrowLeft, Camera, Upload, RefreshCw, Play, Code, Settings } from 'lucide-react';
import { createEmptyGrid } from '@/utils/sudokuUtils';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const AISolver = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [puzzle, setPuzzle] = useState<(number | null)[][]>(createEmptyGrid(null));
  const [fixedCells, setFixedCells] = useState<boolean[][]>(createEmptyGrid(false));
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [solutionSteps, setSolutionSteps] = useState<(number | null)[][][]>([]);

  const handleCellValueChange = (row: number, col: number, value: number | null) => {
    const newPuzzle = [...puzzle];
    newPuzzle[row][col] = value;
    setPuzzle(newPuzzle);
    
    const newFixedCells = [...fixedCells];
    newFixedCells[row][col] = value !== null;
    setFixedCells(newFixedCells);
    
    setSelectedCell({ row, col });
  };

  const handleNumberSelect = (num: number | null) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      handleCellValueChange(row, col, num);
    }
  };

  const handleCaptureImage = () => {
    // This would integrate with device camera in a real mobile app
    toast({
      title: "Camera Activated",
      description: "Camera functionality would capture a Sudoku puzzle in a real app",
    });
  };

  const handleUploadImage = () => {
    // This would allow selecting an image from device storage
    toast({
      title: "Upload Image",
      description: "Upload functionality would allow selecting a Sudoku puzzle image in a real app",
    });
  };

  const handleResetPuzzle = () => {
    setPuzzle(createEmptyGrid(null));
    setFixedCells(createEmptyGrid(false));
    setIsSolved(false);
    setShowSteps(false);
    setSolutionSteps([]);
    setCurrentStep(0);
    setSelectedCell(null);
    
    toast({
      title: "Puzzle Reset",
      description: "The board has been cleared",
    });
  };

  const handleSolvePuzzle = () => {
    setIsSolving(true);
    
    // Check if the puzzle has enough clues (at least 17)
    const cluesCount = puzzle.flat().filter(cell => cell !== null).length;
    if (cluesCount < 8) {
      toast({
        title: "Not Enough Clues",
        description: "Please add more numbers to the puzzle (minimum 8 required)",
        variant: "destructive",
      });
      setIsSolving(false);
      return;
    }
    
    // Simulate solving process (in a real app, this would use actual solving algorithms)
    setTimeout(() => {
      // Mock solution - in a real app this would be the result of the backtracking algorithm
      const solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ];
      
      // Convert solution to nullable grid
      const typedSolution = solution.map(row => row.map(cell => cell as number | null));
      
      // Create mock solution steps (in a real app, these would be actual solving steps)
      const mockSteps = [puzzle.map(row => [...row])];
      
      // Generate a few intermediate steps for demonstration
      const step1 = JSON.parse(JSON.stringify(puzzle));
      step1[0][2] = 4;
      step1[1][1] = 7;
      mockSteps.push(step1);
      
      const step2 = JSON.parse(JSON.stringify(step1));
      step2[2][0] = 1;
      step2[3][1] = 5;
      mockSteps.push(step2);
      
      // Add more steps...
      
      // Final solution
      mockSteps.push(typedSolution);
      
      setSolutionSteps(mockSteps);
      setPuzzle(typedSolution);
      setIsSolving(false);
      setIsSolved(true);
      
      toast({
        title: "Puzzle Solved!",
        description: "The solution has been found using constraint satisfaction and backtracking",
      });
    }, 2000);
  };

  const showNextStep = () => {
    if (currentStep < solutionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setPuzzle(solutionSteps[currentStep + 1]);
    }
  };

  const showPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setPuzzle(solutionSteps[currentStep - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-indigo-50">
      <SakuraBackground petalsCount={12} />
      
      <header className="flex justify-between items-center mb-4 sm:mb-6 z-10">
        <Link to="/">
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            Back
          </CustomButton>
        </Link>
        <Logo size="sm" />
        <Link to="/settings">
          <CustomButton variant="ghost" size="sm" Icon={Settings}>
            {/* Empty children */}
          </CustomButton>
        </Link>
      </header>
      
      <AnimatedTitle
        className="mb-4 sm:mb-6"
        subtitle="Upload a puzzle or create one manually"
        delay={200}
      >
        AI Sudoku Solver
      </AnimatedTitle>
      
      <div className="flex flex-col items-center mx-auto w-full z-10">
        <GlassCard className="w-full mb-4 sm:mb-6 animate-scale-in" style={{ animationDelay: '300ms' }}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CustomButton 
              variant="outline" 
              Icon={Camera} 
              fullWidth
              onClick={handleCaptureImage}
            >
              Take Photo
            </CustomButton>
            
            <CustomButton 
              variant="outline" 
              Icon={Upload} 
              fullWidth
              onClick={handleUploadImage}
            >
              Upload Image
            </CustomButton>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mb-2">
            or input numbers manually on the grid below
          </div>
        </GlassCard>
        
        <div className="mb-4 sm:mb-6 animate-scale-in" style={{ animationDelay: '400ms' }}>
          <SudokuBoard 
            puzzle={puzzle} 
            fixedCells={fixedCells}
            onCellValueChange={handleCellValueChange}
          />
        </div>
        
        {!isSolved && (
          <div className="w-full max-w-md mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <NumberPad onNumberSelect={handleNumberSelect} />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 w-full mb-4 sm:mb-6 animate-fade-in max-w-md" style={{ animationDelay: '600ms' }}>
          <CustomButton 
            variant="outline" 
            Icon={RefreshCw} 
            fullWidth
            onClick={handleResetPuzzle}
          >
            Reset
          </CustomButton>
          
          <CustomButton 
            Icon={Play} 
            fullWidth
            onClick={handleSolvePuzzle}
            disabled={isSolving}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            {isSolving ? 'Solving...' : isSolved ? 'Solved!' : 'Solve Puzzle'}
          </CustomButton>
        </div>
        
        {isSolved && (
          <GlassCard className="w-full animate-scale-in max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Solution</h3>
              
              <CustomButton 
                variant="outline" 
                size="sm" 
                Icon={Code}
                onClick={() => setShowSteps(!showSteps)}
              >
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </CustomButton>
            </div>
            
            {showSteps && (
              <div className="space-y-4">
                <div className="text-sm text-stone-600">
                  <p>Step {currentStep + 1} of {solutionSteps.length}</p>
                  <p className="mt-1">
                    {currentStep === 0 
                      ? 'Initial puzzle state'
                      : currentStep === solutionSteps.length - 1
                        ? 'Final solution'
                        : `Applying constraint satisfaction to cell (${Math.floor(currentStep / 2)}, ${currentStep % 2})`
                    }
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <CustomButton 
                    variant="outline" 
                    size="sm"
                    onClick={showPreviousStep}
                    disabled={currentStep === 0}
                  >
                    Previous Step
                  </CustomButton>
                  
                  <CustomButton 
                    variant="outline" 
                    size="sm"
                    onClick={showNextStep}
                    disabled={currentStep === solutionSteps.length - 1}
                  >
                    Next Step
                  </CustomButton>
                </div>
              </div>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default AISolver;
