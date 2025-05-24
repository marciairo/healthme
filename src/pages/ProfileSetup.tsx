
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/components/ui/use-toast";
import { User, Calendar, Weight, Target, ArrowLeft, ArrowRight } from "lucide-react";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    healthGoals: [] as string[],
    conditions: "",
  });

  const steps = [
    {
      title: "Basic Information",
      description: "Tell us a bit about yourself",
      fields: ["age", "height", "weight"]
    },
    {
      title: "Activity & Goals",
      description: "What are your health objectives?",
      fields: ["activityLevel", "healthGoals"]
    },
    {
      title: "Health Conditions",
      description: "Any medical conditions we should know about?",
      fields: ["conditions"]
    }
  ];

  const activityLevels = [
    { value: "sedentary", label: "Sedentary (little to no exercise)" },
    { value: "light", label: "Light (exercise 1-3 days/week)" },
    { value: "moderate", label: "Moderate (exercise 3-5 days/week)" },
    { value: "active", label: "Active (exercise 6-7 days/week)" },
    { value: "very_active", label: "Very Active (2x/day or intense exercise)" }
  ];

  const healthGoalOptions = [
    "Weight Loss",
    "Muscle Gain",
    "Improve Sleep",
    "Reduce Stress",
    "Better Nutrition",
    "Increase Energy",
    "Mental Health",
    "Disease Prevention"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Profile Created!",
      description: "Your health profile has been set up successfully.",
    });
    navigate('/dashboard');
  };

  const toggleHealthGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goal)
        ? prev.healthGoals.filter(g => g !== goal)
        : [...prev.healthGoals, goal]
    }));
  };

  const isStepValid = () => {
    const currentStepFields = steps[currentStep].fields;
    if (currentStep === 0) {
      return formData.age && formData.height && formData.weight;
    }
    if (currentStep === 1) {
      return formData.activityLevel && formData.healthGoals.length > 0;
    }
    return true; // Last step is optional
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-mint-200/30 to-green-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/plans')}
            className="mb-8 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStep
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-mint-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8" variant="medium" glow>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h1>
                <p className="text-gray-600">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="space-y-6">
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                          placeholder="Enter your age"
                          className="pl-10 bg-white/50 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Height (cm)
                        </label>
                        <Input
                          type="number"
                          value={formData.height}
                          onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                          placeholder="170"
                          className="bg-white/50 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Weight (kg)
                        </label>
                        <div className="relative">
                          <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="number"
                            value={formData.weight}
                            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                            placeholder="70"
                            className="pl-10 bg-white/50 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Activity Level
                      </label>
                      {activityLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setFormData(prev => ({ ...prev, activityLevel: level.value }))}
                          className={`w-full p-4 text-left rounded-lg border transition-colors ${
                            formData.activityLevel === level.value
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-200 bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium">{level.label}</div>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Health Goals (select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {healthGoalOptions.map((goal) => (
                          <button
                            key={goal}
                            onClick={() => toggleHealthGoal(goal)}
                            className={`p-3 text-sm rounded-lg border transition-colors ${
                              formData.healthGoals.includes(goal)
                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                : 'border-gray-200 bg-white/50 hover:border-gray-300'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Health Conditions (optional)
                    </label>
                    <textarea
                      value={formData.conditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                      placeholder="List any medical conditions, allergies, or medications we should be aware of..."
                      className="w-full p-4 border border-gray-200 rounded-lg bg-white/50 focus:border-teal-500 focus:ring-teal-500 resize-none"
                      rows={4}
                    />
                    <p className="text-sm text-gray-500">
                      This information helps us provide more personalized recommendations.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="bg-white/50 border-gray-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-teal-500 to-mint-500 hover:from-teal-600 hover:to-mint-600 text-white"
                >
                  {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
