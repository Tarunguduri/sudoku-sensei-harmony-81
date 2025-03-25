
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Sun, Moon, FileText, Languages } from 'lucide-react';
import Logo from '@/components/Logo';
import CustomButton from '@/components/CustomButton';
import SakuraBackground from '@/components/SakuraBackground';
import AnimatedTitle from '@/components/AnimatedTitle';
import GlassCard from '@/components/GlassCard';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(80);
  const [language, setLanguage] = useState('english');

  const handleSoundToggle = (checked: boolean) => {
    setSoundEnabled(checked);
    toast({
      title: checked ? 'Sound Enabled' : 'Sound Disabled',
      description: checked ? 'Game sounds are now on' : 'Game sounds are now off',
    });
  };

  const handleThemeToggle = (checked: boolean) => {
    toggleTheme();
    toast({
      title: checked ? 'Dark Mode Enabled' : 'Light Mode Enabled',
      description: 'Theme preference saved',
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    toast({
      title: 'Language Updated',
      description: `Language set to ${e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-6 overflow-hidden bg-gradient-to-b from-stone-50 to-pink-50 dark:from-ink-900 dark:to-ink-800">
      <SakuraBackground petalsCount={10} />
      
      <header className="flex justify-between items-center mb-6 z-10">
        <Link to="/">
          <CustomButton variant="ghost" size="sm" Icon={ArrowLeft}>
            Back
          </CustomButton>
        </Link>
        <Logo size="sm" />
      </header>
      
      <AnimatedTitle
        className="mb-6"
        subtitle="Customize your experience"
        delay={200}
      >
        Settings
      </AnimatedTitle>
      
      <div className="flex flex-col items-center max-w-md mx-auto w-full space-y-6 z-10 pb-8">
        {/* Sound Settings */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 mr-2 text-sakura-500" />
            ) : (
              <VolumeX className="w-5 h-5 mr-2 text-stone-500" />
            )}
            Sound Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Sounds</span>
              <Switch 
                checked={soundEnabled} 
                onCheckedChange={handleSoundToggle}
                className={soundEnabled ? "bg-sakura-500" : ""}
              />
            </div>
            
            {soundEnabled && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Volume</span>
                  <span className="text-sm text-stone-500 dark:text-stone-400">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-600 rounded-lg appearance-none cursor-pointer accent-sakura-500"
                />
              </div>
            )}
          </div>
        </GlassCard>
        
        {/* Appearance Settings */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 mr-2 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 mr-2 text-amber-500" />
            )}
            Appearance
          </h2>
          
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={handleThemeToggle}
              className={theme === 'dark' ? "bg-indigo-600" : ""}
            />
          </div>
        </GlassCard>
        
        {/* Language Settings */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '500ms' }}>
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
        
        {/* About Section */}
        <GlassCard className="w-full animate-scale-in" style={{ animationDelay: '600ms' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-stone-500 dark:text-stone-400" />
            About
          </h2>
          
          <div className="space-y-2 text-stone-600 dark:text-stone-300">
            <p>Sudoku Sensei v1.0.0</p>
            <p className="text-sm">© 2023 Sudoku Sensei. All rights reserved.</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Settings;
