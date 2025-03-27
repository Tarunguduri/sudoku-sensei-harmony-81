
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Levels from "./pages/Levels";
import GameBoard from "./pages/GameBoard";
import NotFound from "./pages/NotFound";
import LevelCategories from "./pages/LevelCategories";
import AISolver from "./pages/AISolver";
import HowToPlay from "./pages/HowToPlay";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./hooks/use-theme";
import { LanguageProvider } from "./components/settings/LanguageSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/levels" element={<LevelCategories />} />
              <Route path="/levels/:category" element={<Levels />} />
              <Route path="/play/:difficulty/:level" element={<GameBoard />} />
              <Route path="/ai-solver" element={<AISolver />} />
              <Route path="/how-to-play" element={<HowToPlay />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
