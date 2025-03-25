
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "glass rounded-xl p-6 backdrop-blur-md bg-white/30 border border-white/50 shadow-md", 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
