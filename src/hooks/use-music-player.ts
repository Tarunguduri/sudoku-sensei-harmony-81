
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export type MusicTrack = {
  id: string;
  name: string;
  path: string;
};

export const musicOptions: MusicTrack[] = [
  { id: 'zen-garden', name: 'Zen Garden', path: '/audio/zen-garden.mp3' },
  { id: 'koto-melody', name: 'Koto Melody', path: '/audio/koto-melody.mp3' },
  { id: 'sakura-dreams', name: 'Sakura Dreams', path: '/audio/sakura-dreams.mp3' },
];

export const useMusicPlayer = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('soundEnabled') === 'true';
  });
  const [selectedMusic, setSelectedMusic] = useState<string | null>(() => {
    return localStorage.getItem('selectedMusic') || 'zen-garden';
  });
  const [volume, setVolume] = useState<number>(() => {
    return parseInt(localStorage.getItem('volume') || '50');
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const sfxRefs = useRef<{
    select: HTMLAudioElement | null;
    hint: HTMLAudioElement | null;
    complete: HTMLAudioElement | null;
    error: HTMLAudioElement | null;
  }>({
    select: null,
    hint: null,
    complete: null,
    error: null,
  });

  // Initialize audio elements
  useEffect(() => {
    try {
      // Setup music player
      if (!musicRef.current) {
        musicRef.current = new Audio();
        musicRef.current.loop = true;
        musicRef.current.volume = volume / 100;
        
        // Add error handling
        musicRef.current.addEventListener('error', (e) => {
          console.error('Music playback error:', e);
          setAudioError('Could not play background music');
        });
      }
      
      // Setup sound effects
      if (!sfxRefs.current.select) {
        sfxRefs.current.select = new Audio('/audio/select.mp3');
        sfxRefs.current.select.volume = volume / 100;
      }
      
      if (!sfxRefs.current.hint) {
        sfxRefs.current.hint = new Audio('/audio/hint.mp3');
        sfxRefs.current.hint.volume = volume / 100;
      }
      
      if (!sfxRefs.current.complete) {
        sfxRefs.current.complete = new Audio('/audio/complete.mp3');
        sfxRefs.current.complete.volume = volume / 100;
      }
      
      if (!sfxRefs.current.error) {
        sfxRefs.current.error = new Audio('/audio/error.mp3');
        sfxRefs.current.error.volume = volume / 100;
      }
      
      // Set the currently selected music if sound is enabled
      if (selectedMusic && soundEnabled) {
        const track = musicOptions.find(track => track.id === selectedMusic);
        if (track && musicRef.current) {
          musicRef.current.src = track.path;
          
          // Auto-play if previously playing
          if (isPlaying) {
            musicRef.current.play().catch(err => {
              console.error('Error auto-playing music:', err);
              setIsPlaying(false);
            });
          }
        }
      }
      
      return () => {
        // Cleanup audio elements on unmount
        if (musicRef.current) {
          musicRef.current.pause();
          musicRef.current = null;
        }
        
        Object.keys(sfxRefs.current).forEach(key => {
          const sfxKey = key as keyof typeof sfxRefs.current;
          if (sfxRefs.current[sfxKey]) {
            sfxRefs.current[sfxKey]!.pause();
            sfxRefs.current[sfxKey] = null;
          }
        });
      };
    } catch (error) {
      console.error('Error initializing audio:', error);
      setAudioError('Failed to initialize audio system');
      return () => {};
    }
  }, [selectedMusic, soundEnabled, isPlaying, volume]);

  // Handle volume changes
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = volume / 100;
    }
    
    Object.keys(sfxRefs.current).forEach(key => {
      const sfxKey = key as keyof typeof sfxRefs.current;
      if (sfxRefs.current[sfxKey]) {
        sfxRefs.current[sfxKey]!.volume = volume / 100;
      }
    });
    
    // Save volume preference
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  // Toggle sound on/off
  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('soundEnabled', enabled.toString());
    
    if (!enabled && musicRef.current && isPlaying) {
      musicRef.current.pause();
      setIsPlaying(false);
    } else if (enabled && musicRef.current && selectedMusic) {
      const track = musicOptions.find(track => track.id === selectedMusic);
      if (track) {
        musicRef.current.src = track.path;
        musicRef.current.play().catch(err => {
          console.error('Error playing music after enabling sound:', err);
        });
        setIsPlaying(true);
      }
    }
  };

  // Handle volume slider changes
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  // Select background music track
  const handleMusicSelect = (trackId: string) => {
    setSelectedMusic(trackId);
    localStorage.setItem('selectedMusic', trackId);
    
    if (soundEnabled && musicRef.current) {
      const track = musicOptions.find(track => track.id === trackId);
      if (track) {
        musicRef.current.src = track.path;
        if (isPlaying) {
          musicRef.current.play().catch(err => {
            console.error('Error playing newly selected music:', err);
            setIsPlaying(false);
          });
        }
      }
    }
  };

  // Toggle music playback
  const togglePlayback = () => {
    if (!soundEnabled) {
      toast({
        title: "Sound is disabled",
        description: "Enable sound in settings to play music",
        variant: "default",
      });
      return;
    }
    
    if (musicRef.current && selectedMusic) {
      if (isPlaying) {
        musicRef.current.pause();
        setIsPlaying(false);
      } else {
        const track = musicOptions.find(track => track.id === selectedMusic);
        if (track) {
          musicRef.current.src = track.path;
          musicRef.current.play().catch(err => {
            console.error('Error toggling music playback:', err);
            setIsPlaying(false);
            setAudioError('Could not play audio. Try interacting with the page first.');
          });
          setIsPlaying(true);
        }
      }
    }
  };

  // Play sound effects
  const playNumberSelect = () => {
    if (soundEnabled && sfxRefs.current.select) {
      sfxRefs.current.select.currentTime = 0;
      sfxRefs.current.select.play().catch(err => {
        console.error('Error playing select sound:', err);
      });
    }
  };

  const playHint = () => {
    if (soundEnabled && sfxRefs.current.hint) {
      sfxRefs.current.hint.currentTime = 0;
      sfxRefs.current.hint.play().catch(err => {
        console.error('Error playing hint sound:', err);
      });
    }
  };

  const playComplete = () => {
    if (soundEnabled && sfxRefs.current.complete) {
      sfxRefs.current.complete.currentTime = 0;
      sfxRefs.current.complete.play().catch(err => {
        console.error('Error playing complete sound:', err);
      });
    }
  };
  
  const playError = () => {
    if (soundEnabled && sfxRefs.current.error) {
      sfxRefs.current.error.currentTime = 0;
      sfxRefs.current.error.play().catch(err => {
        console.error('Error playing error sound:', err);
      });
    }
  };
  
  // Simple toggle function for quick access
  const toggleSound = () => {
    handleSoundToggle(!soundEnabled);
  };

  return {
    soundEnabled,
    selectedMusic,
    volume,
    isPlaying,
    audioError,
    handleSoundToggle,
    handleVolumeChange,
    handleMusicSelect,
    togglePlayback,
    playNumberSelect,
    playHint,
    playComplete,
    playError,
    toggleSound
  };
};
