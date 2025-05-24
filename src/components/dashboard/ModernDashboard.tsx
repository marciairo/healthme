
import React from 'react';
import { motion } from 'framer-motion';
import { HealthScore } from '@/components/gamification/HealthScore';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { GlassCard } from '@/components/ui/glass-card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Bell } from 'lucide-react';
import { AddRecordModal } from '@/components/forms/AddRecordModal';

export const ModernDashboard: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  // Mock data - in real app this would come from API/store
  const achievements = [
    {
      title: 'Early Bird',
      description: 'Log 7 workouts before 8 AM',
      icon: 'star' as const,
      rarity: 'common' as const,
      unlocked: true,
    },
    {
      title: 'Streak Master',
      description: 'Maintain a 30-day logging streak',
      icon: 'award' as const,
      rarity: 'epic' as const,
      unlocked: false,
      progress: 73,
    },
    {
      title: 'Wellness Warrior',
      description: 'Complete all daily health goals for a week',
      icon: 'shield' as const,
      rarity: 'rare' as const,
      unlocked: true,
    },
  ];

  const todayStats = [
    { label: 'Water', value: 6, goal: 8, unit: 'glasses', color: '#06b6d4' },
    { label: 'Steps', value: 8547, goal: 10000, unit: 'steps', color: '#10b981' },
    { label: 'Sleep', value: 7.5, goal: 8, unit: 'hours', color: '#8b5cf6' },
    { label: 'Mood', value: 4, goal: 5, unit: '/5', color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Good morning, Alex! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Ready to make today amazing for your health?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Record
            </Button>
          </div>
        </motion.div>

        {/* Health Score & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HealthScore
              score={78}
              trend="up"
              level="Health Enthusiast"
              nextLevelProgress={65}
            />
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Today's Progress
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {todayStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <ProgressRing
                      progress={(stat.value / stat.goal) * 100}
                      size={80}
                      strokeWidth={6}
                      color={stat.color}
                      showText={false}
                    >
                      <div className="text-center">
                        <div className="text-sm font-bold">
                          {typeof stat.value === 'number' && stat.value % 1 !== 0
                            ? stat.value.toFixed(1)
                            : stat.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          /{stat.goal}
                        </div>
                      </div>
                    </ProgressRing>
                    <p className="text-sm font-medium mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Achievements
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <AchievementBadge {...achievement} />
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: 'Log Workout', icon: '💪', color: 'from-red-400 to-red-600' },
            { label: 'Track Meal', icon: '🍎', color: 'from-green-400 to-green-600' },
            { label: 'Mood Check', icon: '😊', color: 'from-yellow-400 to-yellow-600' },
            { label: 'Sleep Log', icon: '😴', color: 'from-purple-400 to-purple-600' },
          ].map((action, index) => (
            <motion.div
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-br ${action.color} p-6 rounded-xl text-white cursor-pointer shadow-lg`}
              onClick={() => setIsAddModalOpen(true)}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <h4 className="font-semibold">{action.label}</h4>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
