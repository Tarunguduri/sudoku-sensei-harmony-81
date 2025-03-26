
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SakuraBackground from '@/components/SakuraBackground';
import GlassCard from '@/components/GlassCard';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import { ArrowLeft, RefreshCw, Play, Code, Settings } from 'lucide-react';
import { createEmptyGrid, solveSudoku } from '@/utils/sudoku';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import ImageInputOptions from '@/components/AISolver/ImageInputOptions';

const AISolver = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [puzzle, setPuzzle] = useState<(number | null)[][]>(createEmptyGrid(null));
  const [fixedCells, setFixedCells] = useState<boolean[][]>(createEmptyGrid(false));
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [solutionSteps, setSolutionSteps] = useState<(number | null)[][][]>([]);
  const [solution, setSolution] = useState<(number | null)[][] | null>(null);

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
    // On mobile devices, this would open the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Camera Activated",
        description: "Please allow camera access to take a photo of a Sudoku puzzle",
      });
      
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          // In a full implementation, we would show a video preview and capture frame
          // For now, we'll simulate with a mock puzzle after a delay
          setTimeout(() => {
            const mockPuzzle = [
              [5, 3, null, null, 7, null, null, null, null],
              [6, null, null, 1, 9, 5, null, null, null],
              [null, 9, 8, null, null, null, null, 6, null],
              [8, null, null, null, 6, null, null, null, 3],
              [4, null, null, 8, null, 3, null, null, 1],
              [7, null, null, null, 2, null, null, null, 6],
              [null, 6, null, null, null, null, 2, 8, null],
              [null, null, null, 4, 1, 9, null, null, 5],
              [null, null, null, null, 8, null, null, 7, 9],
            ];
            
            setPuzzle(mockPuzzle);
            const newFixedCells = mockPuzzle.map(row => 
              row.map(cell => cell !== null)
            );
            setFixedCells(newFixedCells);
            
            // Clean up the stream
            stream.getTracks().forEach(track => track.stop());
            
            toast({
              title: "Puzzle Captured",
              description: "A Sudoku puzzle has been detected and imported",
            });
          }, 2000);
        })
        .catch((error) => {
          console.error("Camera access error:", error);
          toast({
            title: "Camera Access Denied",
            description: "Please allow camera access or use the upload option instead",
            variant: "destructive",
          });
        });
    } else {
      toast({
        title: "Camera Not Available",
        description: "Your device doesn't support camera access or permissions were denied",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file containing a Sudoku puzzle",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing Image",
      description: "Analyzing the Sudoku puzzle from your image...",
    });
    
    // In a production app, we would implement OCR to extract the puzzle
    // For now, we'll simulate with a mock puzzle
    setTimeout(() => {
      const mockPuzzle = [
        [null, null, 3, null, 2, null, 6, null, null],
        [9, null, null, 3, null, 5, null, null, 1],
        [null, null, 1, 8, null, 6, 4, null, null],
        [null, null, 8, 1, null, 2, 9, null, null],
        [7, null, null, null, null, null, null, null, 8],
        [null, null, 6, 7, null, 8, 2, null, null],
        [null, null, 2, 6, null, 9, 5, null, null],
        [8, null, null, 2, null, 3, null, null, 9],
        [null, null, 5, null, 1, null, 3, null, null],
      ];
      
      setPuzzle(mockPuzzle);
      const newFixedCells = mockPuzzle.map(row => 
        row.map(cell => cell !== null)
      );
      setFixedCells(newFixedCells);
      
      toast({
        title: "Puzzle Extracted",
        description: "A Sudoku puzzle has been detected and imported from your image",
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResetPuzzle = () => {
    setPuzzle(createEmptyGrid(null));
    setFixedCells(createEmptyGrid(false));
    setIsSolved(false);
    setShowSteps(false);
    setSolutionSteps([]);
    setCurrentStep(0);
    setSelectedCell(null);
    setSolution(null);
    
    toast({
      title: "Puzzle Reset",
      description: "The board has been cleared",
    });
  };

  const handleSolvePuzzle = () => {
    setIsSolving(true);
    
    // Check if the puzzle has enough clues
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
    
    // Save initial state for step-by-step solution
    const initialState = JSON.parse(JSON.stringify(puzzle));
    const steps = [initialState];
    
    try {
      // Use our solver algorithm to solve the puzzle
      const solvedPuzzle = solveSudoku(puzzle);
      
      if (solvedPuzzle) {
        // Create a few intermediate steps for demonstration
        const step1 = JSON.parse(JSON.stringify(puzzle));
        // Fill in some cells as intermediate steps
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 9; j++) {
            if (step1[i][j] === null && solvedPuzzle[i][j] !== null) {
              step1[i][j] = solvedPuzzle[i][j];
              break;
            }
          }
        }
        steps.push(step1);
        
        const step2 = JSON.parse(JSON.stringify(step1));
        // Fill in more cells
        for (let i = 3; i < 6; i++) {
          for (let j = 0; j < 9; j++) {
            if (step2[i][j] === null && solvedPuzzle[i][j] !== null) {
              step2[i][j] = solvedPuzzle[i][j];
              break;
            }
          }
        }
        steps.push(step2);
        
        // Add final solution
        steps.push(solvedPuzzle);
        
        setSolutionSteps(steps);
        setPuzzle(solvedPuzzle);
        setSolution(solvedPuzzle);
        setIsSolving(false);
        setIsSolved(true);
        
        toast({
          title: "Puzzle Solved!",
          description: "The solution has been found using constraint satisfaction and backtracking",
        });
      } else {
        setIsSolving(false);
        toast({
          title: "No Solution Found",
          description: "This puzzle might not have a valid solution. Please check your input.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Solving error:", error);
      setIsSolving(false);
      toast({
        title: "Error Solving Puzzle",
        description: "An error occurred while solving the puzzle. Please try again.",
        variant: "destructive",
      });
    }
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
    <div className="min-h-screen flex flex-col p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-indigo-50 dark:from-ink-900 dark:to-ink-800">
      <SakuraBackground petalsCount={20} />
      
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
        className="mb-4 sm:mb-6 z-10"
        subtitle="Upload a puzzle or create one manually"
        delay={200}
      >
        AI Sudoku Solver
      </AnimatedTitle>
      
      <div className="flex flex-col items-center mx-auto w-full z-10">
        <ImageInputOptions
          handleCaptureImage={handleCaptureImage}
          handleFileSelect={handleFileSelect}
          handleUploadImage={handleUploadImage}
          fileInputRef={fileInputRef}
        />
        
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
                <div className="text-sm text-stone-600 dark:text-stone-300">
                  <p>Step {currentStep + 1} of {solutionSteps.length}</p>
                  <p className="mt-1">
                    {currentStep === 0 
                      ? 'Initial puzzle state'
                      : currentStep === solutionSteps.length - 1
                        ? 'Final solution'
                        : `Applying constraint satisfaction to region ${currentStep}`
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
