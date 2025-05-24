
import React from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/ui/progress-ring';
import { GlassCard } from '@/components/ui/glass-card';
import { Star, TrendingUp, Award } from 'lucide-react';

interface HealthScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  level: string;
  nextLevelProgress: number;
}

export const HealthScore: React.FC<HealthScoreProps> = ({
  score,
  trend,
  level,
  nextLevelProgress,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-yellow-500" />;
    }
  };

  const getScoreColor = () => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-600">{level}</span>
            {getTrendIcon()}
          </div>
        </div>
        <Award className="h-6 w-6 text-primary-600" />
      </div>

      <div className="flex items-center justify-center mb-6">
        <ProgressRing
          progress={score}
          size={140}
          strokeWidth={10}
          color={getScoreColor()}
          showText={false}
        >
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold"
              style={{ color: getScoreColor() }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {score}
            </motion.div>
            <div className="text-sm text-gray-600">/ 100</div>
          </div>
        </ProgressRing>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next Level Progress</span>
          <span className="font-medium">{nextLevelProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${nextLevelProgress}%` }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </div>
    </GlassCard>
  );
};
