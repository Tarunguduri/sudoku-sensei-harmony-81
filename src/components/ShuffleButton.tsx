
import React from 'react';
import { Shuffle } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import { useToast } from '@/hooks/use-toast';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { useLanguage } from '@/components/settings/LanguageSettings';

interface ShuffleButtonProps {
  onShuffle: () => void;
  shufflesUsed: number;
  maxShuffles: number;
}

const ShuffleButton: React.FC<ShuffleButtonProps> = ({
  onShuffle,
  shufflesUsed,
  maxShuffles,
}) => {
  const { toast } = useToast();
  const { soundEnabled, playHint } = useMusicPlayer();
  const { t } = useLanguage();
  
  const handleShuffle = () => {
    if (shufflesUsed >= maxShuffles) {
      toast({
        title: t('shuffleLimitReached'),
        description: t('shuffleLimitMessage'),
        variant: 'default',
      });
      return;
    }
    
    if (soundEnabled) {
      playHint();
    }
    
    onShuffle();
  };
  
  return (
    <CustomButton
      variant="outline"
      Icon={Shuffle}
      onClick={handleShuffle}
      disabled={shufflesUsed >= maxShuffles}
    >
      {t('shuffle')} ({maxShuffles - shufflesUsed} {t('left')})
    </CustomButton>
  );
};

export default ShuffleButton;
