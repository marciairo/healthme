
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Plans = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');

  const handleContinue = () => {
    navigate('/profile-setup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          {t('choosePlan')}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
              selectedPlan === 'free' 
                ? 'border-primary shadow-lg' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan('free')}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{t('freePlan')}</h2>
              {selectedPlan === 'free' && (
                <Check className="text-primary" />
              )}
            </div>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {t('freePlan.feature1')}
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {t('freePlan.feature2')}
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {t('freePlan.feature3')}
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
              selectedPlan === 'premium' 
                ? 'border-primary shadow-lg' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan('premium')}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{t('premiumPlan')}</h2>
              {selectedPlan === 'premium' && (
                <Check className="text-primary" />
              )}
            </div>
            <p className="text-3xl font-bold mb-4">$9.99</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {t('premiumPlan.feature1')}
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {t('premiumPlan.feature2')}
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {t('premiumPlan.feature3')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            size="lg"
            onClick={handleContinue}
          >
            {t('continue')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Plans;
