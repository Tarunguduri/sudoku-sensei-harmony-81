
import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CustomButton from '@/components/CustomButton';
import GlassCard from '@/components/GlassCard';
import { useToast } from '@/hooks/use-toast';
import { useMusicPlayer } from '@/hooks/use-music-player';

// Define the music options
const musicOptions = [
  { id: 'sakura', name: 'Sakura Dreams', src: '/audio/sakura-dreams.mp3' },
  { id: 'zen', name: 'Zen Garden', src: '/audio/zen-garden.mp3' },
  { id: 'koto', name: 'Koto Melody', src: '/audio/koto-melody.mp3' },
];

interface SoundSettingsProps {
  animationDelay?: string;
}

const SoundSettings: React.FC<SoundSettingsProps> = ({ animationDelay = '300ms' }) => {
  const { toast } = useToast();
  const { 
    soundEnabled, 
    volume, 
    selectedMusic, 
    isPlaying,
    handleSoundToggle,
    handleVolumeChange,
    handleMusicSelect,
    togglePlayback
  } = useMusicPlayer();

  return (
    <GlassCard className="w-full animate-scale-in" style={{ animationDelay }}>
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
            onCheckedChange={(checked) => {
              handleSoundToggle(checked);
              toast({
                title: checked ? 'Sound Enabled' : 'Sound Disabled',
                description: checked ? 'Game sounds are now on' : 'Game sounds are now off',
              });
            }}
            className={soundEnabled ? "bg-sakura-500" : ""}
          />
        </div>
        
        {soundEnabled && (
          <div className="space-y-4">
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
            
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <Music className="w-5 h-5 mr-2 text-sakura-500" />
                <span>Background Music</span>
              </div>
              
              <RadioGroup
                value={selectedMusic || ''}
                onValueChange={(value) => {
                  handleMusicSelect(value);
                  toast({
                    title: 'Music Selected',
                    description: `${musicOptions.find(track => track.id === value)?.name} will now play in the background`,
                  });
                }}
                className="space-y-3"
              >
                {musicOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {selectedMusic && (
                <CustomButton 
                  variant="outline" 
                  size="sm" 
                  onClick={togglePlayback}
                  className="mt-2"
                  disabled={!soundEnabled}
                >
                  {isPlaying ? 'Pause' : 'Play'} Preview
                </CustomButton>
              )}
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default SoundSettings;
