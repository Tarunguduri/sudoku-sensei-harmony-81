
import { useState, useRef, useEffect } from 'react';

// Define the music options
export const musicOptions = [
  { id: 'sakura', name: 'Sakura Dreams', src: '/audio/sakura-dreams.mp3' },
  { id: 'zen', name: 'Zen Garden', src: '/audio/zen-garden.mp3' },
  { id: 'koto', name: 'Koto Melody', src: '/audio/koto-melody.mp3' },
];

export const useMusicPlayer = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(80);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSound = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('volume');
    const savedMusic = localStorage.getItem('selectedMusic');
    
    if (savedSound) setSoundEnabled(savedSound === 'true');
    if (savedVolume) setVolume(parseInt(savedVolume));
    if (savedMusic) setSelectedMusic(savedMusic);
    
    // Initialize audio object
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Add error handling
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setAudioError('Failed to load audio file');
        setIsPlaying(false);
      });
      
      // Add load handling
      audioRef.current.addEventListener('canplaythrough', () => {
        setAudioError(null);
      });
    }
    
    if (savedMusic && savedSound === 'true') {
      const musicTrack = musicOptions.find(track => track.id === savedMusic);
      if (musicTrack) {
        audioRef.current.src = musicTrack.src;
        audioRef.current.loop = true;
        audioRef.current.volume = parseInt(savedVolume || '80') / 100;
        
        // Auto-play if selected (may be blocked by browser)
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          if (error.name === 'NotAllowedError') {
            setAudioError('Browser blocked autoplay. Click play to start music.');
          } else if (error.name === 'NotSupportedError') {
            setAudioError('Audio format not supported by your browser.');
          } else {
            setAudioError('Failed to play audio: ' + error.message);
          }
        });
        setIsPlaying(true);
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current.removeEventListener('canplaythrough', () => {});
      }
    };
  }, []);

  const handleSoundToggle = (checked: boolean) => {
    setSoundEnabled(checked);
    localStorage.setItem('soundEnabled', checked.toString());
    
    if (checked && selectedMusic && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
        setAudioError('Failed to play audio: ' + error.message);
      });
      setIsPlaying(true);
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleMusicSelect = (value: string) => {
    setSelectedMusic(value);
    localStorage.setItem('selectedMusic', value);
    setAudioError(null);
    
    if (soundEnabled && audioRef.current) {
      const musicTrack = musicOptions.find(track => track.id === value);
      if (musicTrack) {
        // Reset audio element
        if (audioRef.current.src) {
          audioRef.current.pause();
        }
        
        // Set new source and play
        audioRef.current.src = musicTrack.src;
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;
        
        // Test if audio exists
        audioRef.current.addEventListener('loadeddata', () => {
          console.log('Audio loaded successfully');
        });
        
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          if (error.name === 'NotAllowedError') {
            setAudioError('Browser blocked autoplay. Click play to start music.');
          } else if (error.name === 'NotSupportedError') {
            setAudioError('Audio format not supported by your browser.');
          } else {
            setAudioError('Failed to play audio: ' + error.message);
          }
        });
        setIsPlaying(true);
      }
    }
  };
  
  const togglePlayback = () => {
    if (!selectedMusic || !soundEnabled) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          setAudioError('Failed to play audio: ' + error.message);
        });
        setIsPlaying(true);
      }
    }
  };

  return {
    soundEnabled,
    volume,
    selectedMusic,
    isPlaying,
    audioError,
    handleSoundToggle,
    handleVolumeChange,
    handleMusicSelect,
    togglePlayback
  };
};
