
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  delay?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  children, 
  className, 
  subtitle,
  delay = 0 
}) => {
  return (
    <div className={cn("text-center", className)}>
      <h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 animate-fade-in opacity-0"
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </h1>
      {subtitle && (
        <p 
          className="text-lg md:text-xl text-muted-foreground mt-2 animate-fade-in opacity-0"
          style={{ animationDelay: `${delay + 200}ms` }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AnimatedTitle;
