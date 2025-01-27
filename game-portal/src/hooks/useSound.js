import { useEffect, useRef } from 'react';
import { SOUND_CONFIG } from '../games/MiniMetro/constants';

export const useSound = (sounds) => {
  const audioRefs = useRef({});

  useEffect(() => {
    // Preload all sounds
    Object.entries(sounds).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = SOUND_CONFIG.VOLUME;
      audioRefs.current[key] = audio;
    });

    // Cleanup
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [sounds]);

  const playSound = (key) => {
    const audio = audioRefs.current[key];
    if (audio) {
      // Reset and play
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Handle autoplay restrictions
        console.warn('Audio playback failed:', error);
      });
    }
  };

  return { playSound };
}; 