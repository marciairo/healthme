
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

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
          className="w-full max-w-md text-center"
        >
          <GlassCard className="p-8" variant="medium" glow>
            {/* 404 Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mb-8"
            >
              <div className="text-8xl font-bold bg-gradient-to-r from-teal-500 to-mint-500 bg-clip-text text-transparent">
                404
              </div>
            </motion.div>

            {/* Error message */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-teal-500 to-mint-500 hover:from-teal-600 hover:to-mint-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full bg-white/50 border-gray-200 hover:border-teal-500 hover:text-teal-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Additional help */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Need help? Try these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-sm text-teal-600 hover:text-teal-700 underline"
                >
                  Dashboard
                </button>
                <span className="text-gray-300">•</span>
                <button
                  onClick={() => navigate('/plans')}
                  className="text-sm text-teal-600 hover:text-teal-700 underline"
                >
                  Plans
                </button>
                <span className="text-gray-300">•</span>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-sm text-teal-600 hover:text-teal-700 underline"
                >
                  Sign In
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
