
import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useToast } from '@/hooks/use-toast';

interface LanguageSettingsProps {
  animationDelay?: string;
}

const LanguageSettings: React.FC<LanguageSettingsProps> = ({ animationDelay = '500ms' }) => {
  const { toast } = useToast();
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'english';
  });

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
    toast({
      title: 'Language Updated',
      description: `Language set to ${e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)}`,
    });
  };

  return (
    <GlassCard className="w-full animate-scale-in" style={{ animationDelay }}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Languages className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
        Language
      </h2>
      
      <select
        value={language}
        onChange={handleLanguageChange}
        className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-ink-700 focus:outline-none focus:ring-2 focus:ring-sakura-500 dark:text-white"
      >
        <option value="english">English</option>
        <option value="japanese">日本語 (Japanese)</option>
      </select>
    </GlassCard>
  );
};

export default LanguageSettings;
