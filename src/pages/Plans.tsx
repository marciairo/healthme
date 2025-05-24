
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Check, Star, Zap, Shield } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

const Plans = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleContinue = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      navigate('/profile-setup');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const planFeatures = {
    free: [
      { text: "Basic health tracking", included: true },
      { text: "Simple analytics", included: true },
      { text: "Data export", included: true },
      { text: "AI health insights", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Premium support", included: false },
    ],
    premium: [
      { text: "Advanced health tracking", included: true },
      { text: "AI-powered insights", included: true },
      { text: "Predictive analytics", included: true },
      { text: "Personalized recommendations", included: true },
      { text: "Priority support", included: true },
      { text: "Family sharing", included: true },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Choose Your Health Journey
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Unlock the power of personalized health tracking with AI-driven insights
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard
              className={`p-8 cursor-pointer transition-all duration-300 ${
                selectedPlan === 'free' 
                  ? 'ring-2 ring-primary-500 shadow-xl shadow-primary/20' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedPlan('free')}
              hover={false}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h2>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">forever</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {planFeatures.free.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                      feature.included ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {selectedPlan === 'free' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
              
              <GlassCard
                className={`p-8 cursor-pointer transition-all duration-300 ${
                  selectedPlan === 'premium' 
                    ? 'ring-2 ring-primary-500 shadow-xl shadow-primary/20' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedPlan('premium')}
                hover={false}
                glow
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h2>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-primary-600 mt-2">First month free!</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {planFeatures.premium.map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-900">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {selectedPlan === 'premium' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </GlassCard>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            size="lg"
            onClick={handleContinue}
            disabled={loading}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-12 py-4 text-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              `Start with ${selectedPlan === 'free' ? 'Free' : 'Premium'} Plan`
            )}
          </Button>
        </motion.div>

        <motion.p 
          className="text-center text-gray-600 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          You can upgrade or downgrade anytime. No long-term commitments.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Plans;
