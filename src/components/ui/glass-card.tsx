
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'medium' | 'strong';
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'medium', hover = true, glow = false, children, ...props }, ref) => {
    const variants = {
      light: 'bg-white/10 backdrop-blur-sm border-white/20',
      medium: 'bg-white/20 backdrop-blur-md border-white/30',
      strong: 'bg-white/30 backdrop-blur-lg border-white/40',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        whileTap={hover ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          'rounded-xl border backdrop-saturate-150',
          variants[variant],
          glow && 'shadow-2xl shadow-primary/20',
          hover && 'transition-all duration-300 hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
