
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap, ArrowLeft } from "lucide-react";

const Plans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for getting started with health tracking",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      features: [
        "Basic health tracking",
        "Daily mood logging",
        "Sleep monitoring",
        "7-day history",
        "Basic insights",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Advanced features for serious health enthusiasts",
      icon: Star,
      color: "from-teal-500 to-mint-500",
      features: [
        "All Starter features",
        "AI-powered insights",
        "Custom goals & challenges",
        "Unlimited history",
        "Advanced analytics",
        "Export data",
        "Priority support",
      ],
      recommended: true,
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/month",
      description: "The ultimate health optimization experience",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        "All Pro features",
        "Personal health coach AI",
        "Medical report analysis",
        "Nutrition recommendations",
        "Fitness plan generation",
        "Health risk predictions",
        "24/7 health monitoring",
        "White-glove support",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-mint-200/30 to-green-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Health Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect plan to unlock your health potential with AI-powered insights and personalized recommendations.
            </p>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${plan.recommended ? 'md:-mt-4' : ''}`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-teal-500 to-mint-500 text-white px-4 py-1 text-sm font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <GlassCard
                    className={`p-8 h-full ${
                      plan.recommended
                        ? 'ring-2 ring-teal-500/50 shadow-xl'
                        : ''
                    }`}
                    variant={plan.recommended ? "strong" : "medium"}
                    glow={plan.recommended}
                  >
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mb-4 text-white shadow-lg`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-1">{plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => navigate('/profile-setup')}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                        plan.recommended
                          ? 'bg-gradient-to-r from-teal-500 to-mint-500 hover:from-teal-600 hover:to-mint-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-teal-500 hover:text-teal-600'
                      }`}
                    >
                      {plan.price === "Free" ? "Get Started" : "Choose Plan"}
                    </Button>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 mb-4">
              All plans include a 14-day free trial. Cancel anytime.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>✓ HIPAA Compliant</span>
              <span>✓ 256-bit Encryption</span>
              <span>✓ 24/7 Security Monitoring</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
