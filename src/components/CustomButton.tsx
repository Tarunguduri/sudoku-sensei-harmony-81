
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
  asChild?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(({
  children,
  variant = 'default',
  size = 'md',
  className,
  fullWidth = false,
  Icon,
  asChild = false,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-sakura-500 text-white hover:bg-sakura-600 active:bg-sakura-700',
    outline: 'border border-sakura-200 text-sakura-700 hover:bg-sakura-50 active:bg-sakura-100',
    ghost: 'text-sakura-700 hover:bg-sakura-50 active:bg-sakura-100',
    link: 'text-sakura-600 underline-offset-4 hover:underline p-0',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'px-4 py-2 rounded-lg',
    lg: 'text-lg px-6 py-3 rounded-lg',
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sakura-500/50 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        variant !== 'link' ? 'shadow-sm' : '',
        className
      )}
      ref={ref}
      {...props}
    >
      {Icon && <Icon className={cn("w-5 h-5", size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : '')} />}
      {children}
    </Comp>
  );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;
