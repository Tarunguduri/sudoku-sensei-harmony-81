
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import GlassCard from '@/components/GlassCard';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

interface AppearanceSettingsProps {
  animationDelay?: string;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ animationDelay = '400ms' }) => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleThemeToggle = (checked: boolean) => {
    toggleTheme();
    toast({
      title: checked ? 'Dark Mode Enabled' : 'Light Mode Enabled',
      description: 'Theme preference saved',
    });
  };

  return (
    <GlassCard className="w-full animate-scale-in" style={{ animationDelay }}>
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
  );
};

export default AppearanceSettings;
