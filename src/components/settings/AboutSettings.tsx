
import React from 'react';
import { FileText } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

interface AboutSettingsProps {
  animationDelay?: string;
}

const AboutSettings: React.FC<AboutSettingsProps> = ({ animationDelay = '600ms' }) => {
  return (
    <GlassCard className="w-full animate-scale-in" style={{ animationDelay }}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-stone-500 dark:text-stone-400" />
        About
      </h2>
      
      <div className="space-y-2 text-stone-600 dark:text-stone-300">
        <p>Sudoku Sensei v1.0.0</p>
        <p className="text-sm">© 2023 Sudoku Sensei. All rights reserved.</p>
      </div>
    </GlassCard>
  );
};

export default AboutSettings;
