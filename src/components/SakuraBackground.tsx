
import React, { useEffect, useRef } from 'react';

interface SakuraBackgroundProps {
  petalsCount?: number;
  animationSpeed?: number;
  petalsSize?: 'small' | 'medium' | 'large' | 'mixed';
  showTree?: boolean;
}

const SakuraBackground: React.FC<SakuraBackgroundProps> = ({ 
  petalsCount = 15,
  animationSpeed = 1,
  petalsSize = 'mixed',
  showTree = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing petals
    container.innerHTML = '';

    // Add sakura tree if enabled
    if (showTree) {
      const tree = document.createElement('div');
      tree.className = 'sakura-tree';
      container.appendChild(tree);
      
      // Add tree branches
      const branches = document.createElement('div');
      branches.className = 'sakura-branches';
      tree.appendChild(branches);
      
      // Add blossoms to the tree
      for (let i = 0; i < 12; i++) {
        const blossom = document.createElement('div');
        blossom.className = 'sakura-blossom';
        blossom.style.left = `${Math.random() * 100}%`;
        blossom.style.top = `${Math.random() * 50}%`;
        blossom.style.animationDelay = `${Math.random() * 5}s`;
        branches.appendChild(blossom);
      }
    }

    // Create new petals
    for (let i = 0; i < petalsCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      
      // Random position
      petal.style.left = `${Math.random() * 100}%`;
      
      // Random delay
      const delay = Math.random();
      petal.style.setProperty('--fall-delay', `${delay}`);
      
      // Random animation duration (based on animationSpeed)
      const baseDuration = 15 / animationSpeed;
      const duration = baseDuration + (delay * 5);
      petal.style.setProperty('--fall-duration', `${duration}s`);
      
      // Size variation based on petalsSize prop
      let size: number;
      if (petalsSize === 'small') {
        size = 8 + Math.random() * 6; // 8-14px
      } else if (petalsSize === 'medium') {
        size = 12 + Math.random() * 8; // 12-20px
      } else if (petalsSize === 'large') {
        size = 16 + Math.random() * 10; // 16-26px
      } else { // mixed
        size = 8 + Math.random() * 18; // 8-26px
      }
      
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
  }, [petalsCount, animationSpeed, petalsSize, showTree]);

  return (
    <div className="sakura-container" ref={containerRef} />
  );
};

export default SakuraBackground;
