
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileSetup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = () => {
    // Here we would typically save the user preferences
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t('personalizeYourExperience')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('personalizeDescription')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Goals Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('whatAreYourGoals')}
            </label>
            <Select
              value={goal}
              onValueChange={setGoal}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectGoal')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight_loss">{t('goals.weightLoss')}</SelectItem>
                <SelectItem value="mental_health">{t('goals.mentalHealth')}</SelectItem>
                <SelectItem value="symptom_tracking">{t('goals.symptomTracking')}</SelectItem>
                <SelectItem value="fitness">{t('goals.fitness')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frequency Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('howOftenWantRecommendations')}
            </label>
            <Select
              value={frequency}
              onValueChange={setFrequency}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectFrequency')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">{t('frequency.daily')}</SelectItem>
                <SelectItem value="weekly">{t('frequency.weekly')}</SelectItem>
                <SelectItem value="monthly">{t('frequency.monthly')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          className="w-full" 
          size="lg"
          onClick={handleSubmit}
        >
          {t('finishSetup')}
        </Button>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
