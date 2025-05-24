
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, Award, Shield, TrendingUp } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: 'star' | 'award' | 'shield' | 'trending';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: number;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon,
  rarity,
  unlocked,
  progress = 0,
  className,
}) => {
  const icons = {
    star: Star,
    award: Award,
    shield: Shield,
    trending: TrendingUp,
  };

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600',
  };

  const IconComponent = icons[icon];

  return (
    <motion.div
      className={cn(
        'relative p-4 rounded-xl border transition-all duration-300',
        unlocked
          ? `bg-gradient-to-br ${rarityColors[rarity]} text-white shadow-lg`
          : 'bg-gray-100 border-gray-200 text-gray-400',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        </motion.div>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-shrink-0">
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{title}</h4>
            <p className="text-sm opacity-90 line-clamp-2">{description}</p>
          </div>
        </div>

        {!unlocked && progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {unlocked && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <motion.div
              className="w-3 h-3 bg-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
