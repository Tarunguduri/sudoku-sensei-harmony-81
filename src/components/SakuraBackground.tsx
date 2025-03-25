
import React, { useEffect, useRef } from 'react';

interface SakuraBackgroundProps {
  petalsCount?: number;
}

const SakuraBackground: React.FC<SakuraBackgroundProps> = ({ petalsCount = 15 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing petals
    container.innerHTML = '';

    // Create new petals
    for (let i = 0; i < petalsCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      
      // Random position
      petal.style.left = `${Math.random() * 100}%`;
      
      // Random delay
      petal.style.setProperty('--fall-delay', `${Math.random()}`);
      
      // Random size variation
      const size = 10 + Math.random() * 10;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      
      // Random rotation
      petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Add to container
      container.appendChild(petal);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [petalsCount]);

  return (
    <div className="sakura-container" ref={containerRef} />
  );
};

export default SakuraBackground;
