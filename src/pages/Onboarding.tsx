
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Heart, Target, TrendingUp } from "lucide-react";

const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Heart,
      title: "Welcome to HealthTrack",
      description: "Your journey to better health starts here. Track, analyze, and improve your wellness with AI-powered insights.",
      color: "from-teal-500 to-mint-500"
    },
    {
      icon: Target,
      title: "Set Your Goals",
      description: "Define personalized health objectives and let our intelligent system guide you towards achieving them.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your daily activities, mood, sleep, and nutrition with beautiful visualizations and insights.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/auth');
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-mint-200/30 to-green-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-12">
            <motion.div
              key={currentStep}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentStepData.color} mb-6 text-white shadow-lg`}
            >
              <IconComponent className="h-10 w-10" />
            </motion.div>

            <motion.h1
              key={`title-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {currentStepData.title}
            </motion.h1>

            <motion.p
              key={`desc-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {currentStepData.description}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <GlassCard
                  key={index}
                  className={`p-6 transition-all duration-300 ${
                    index === currentStep
                      ? 'ring-2 ring-primary/50 shadow-lg'
                      : index < currentStep
                      ? 'opacity-75'
                      : 'opacity-50'
                  }`}
                  variant={index === currentStep ? "strong" : "light"}
                  hover={false}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}>
                      <StepIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i <= index ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-mint-500 hover:from-teal-600 hover:to-mint-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
