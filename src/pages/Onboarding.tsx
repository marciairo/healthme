
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, X } from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  lottieUrl: string;
}

const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
      lottieUrl: "/animations/tracking.json"
    },
    {
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
      lottieUrl: "/animations/eating.json"
    },
    {
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
      lottieUrl: "/animations/goals.json"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/plans');
    }
  };

  const handleSkip = () => {
    navigate('/plans');
  };

  return (
    <div data-testid="onboarding-container" className="min-h-screen flex flex-col bg-[url('/images/onboarding_background.jpg')] bg-cover bg-center">
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center p-6 bg-black bg-opacity-50" // Added a semi-transparent overlay for better text readability
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-md space-y-8">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl font-bold">{steps[currentStep].title}</h1>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </motion.div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 mt-8">
            <Button onClick={handleNext} className="w-full">
              {currentStep === steps.length - 1 ? (
                <>
                  {t('getStarted')} <Check className="ml-2" />
                </>
              ) : (
                <>
                  {t('next')} <ChevronRight className="ml-2" />
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="w-full"
            >
              {t('skip')} <X className="ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
