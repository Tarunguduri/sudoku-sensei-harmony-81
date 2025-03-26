
import React, { useEffect, useRef } from 'react';

interface SakuraBackgroundProps {
  petalsCount?: number;
  animationSpeed?: number;
  petalsSize?: 'small' | 'medium' | 'large' | 'mixed';
  showTree?: boolean;
  treePosition?: 'left' | 'right';
  petalsColor?: 'pink' | 'white' | 'mixed';
  animationStyle?: 'fall' | 'swirl' | 'breeze';
  density?: 'sparse' | 'normal' | 'dense';
  interactive?: boolean;
}

const SakuraBackground: React.FC<SakuraBackgroundProps> = ({ 
  petalsCount = 15,
  animationSpeed = 1,
  petalsSize = 'mixed',
  showTree = false,
  treePosition = 'left',
  petalsColor = 'pink',
  animationStyle = 'fall',
  density = 'normal',
  interactive = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing petals
    container.innerHTML = '';

    // Adjust petal count based on density
    let actualPetalCount = petalsCount;
    if (density === 'sparse') actualPetalCount = Math.max(5, Math.floor(petalsCount * 0.6));
    if (density === 'dense') actualPetalCount = Math.floor(petalsCount * 1.5);

    // Add sakura tree if enabled
    if (showTree) {
      const tree = document.createElement('div');
      tree.className = 'sakura-tree';
      
      // Set tree position based on prop
      if (treePosition === 'right') {
        tree.style.right = '5%';
        tree.style.left = 'auto';
      } else {
        tree.style.left = '5%';
        tree.style.right = 'auto';
      }
      
      container.appendChild(tree);
      
      // Add tree branches
      const branches = document.createElement('div');
      branches.className = 'sakura-branches';
      tree.appendChild(branches);
      
      // Add blossoms to the tree
      for (let i = 0; i < 15; i++) {
        const blossom = document.createElement('div');
        blossom.className = 'sakura-blossom';
        
        // Apply petal color
        if (petalsColor === 'white') {
          blossom.style.backgroundColor = '#fff';
          blossom.style.opacity = '0.8';
        } else if (petalsColor === 'mixed') {
          blossom.style.backgroundColor = Math.random() > 0.5 ? '#fdd0e0' : '#fff';
          blossom.style.opacity = `${0.7 + Math.random() * 0.3}`;
        }
        
        blossom.style.left = `${Math.random() * 100}%`;
        blossom.style.top = `${Math.random() * 80}%`;
        blossom.style.animationDelay = `${Math.random() * 5}s`;
        branches.appendChild(blossom);
      }
    }

    // Create new petals
    for (let i = 0; i < actualPetalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      
      // Apply animation styles
      if (animationStyle === 'swirl') {
        petal.classList.add('sakura-swirl');
      } else if (animationStyle === 'breeze') {
        petal.classList.add('sakura-breeze');
      }
      
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
      
      // Apply petal color
      if (petalsColor === 'white') {
        petal.style.backgroundColor = '#fff';
        petal.style.opacity = '0.8';
      } else if (petalsColor === 'mixed') {
        petal.style.backgroundColor = Math.random() > 0.5 ? '#fdd0e0' : '#fff';
        petal.style.opacity = `${0.7 + Math.random() * 0.3}`;
      }
      
      // Interactive elements
      if (interactive) {
        petal.classList.add('interactive');
      }
      
      // Add to container
      container.appendChild(petal);
    }

    // Add interactive event listeners if enabled
    if (interactive && container) {
      const handleMouseMove = (e: MouseEvent) => {
        const petals = container.querySelectorAll('.sakura-petal.interactive');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        petals.forEach((petal: Element) => {
          const randomFactor = Math.random() * 20 - 10;
          if (petal instanceof HTMLElement) {
            petal.style.transform = `translate(${randomFactor * mouseX}px, ${randomFactor * mouseY}px) rotate(${Math.random() * 360}deg)`;
          }
        });
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        if (container) {
          container.innerHTML = '';
        }
      };
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [petalsCount, animationSpeed, petalsSize, showTree, treePosition, petalsColor, animationStyle, density, interactive]);

  return (
    <div className="sakura-container" ref={containerRef} />
  );
};

export default SakuraBackground;
