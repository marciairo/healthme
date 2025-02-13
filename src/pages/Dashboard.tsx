
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import HealthMetricCard from "@/components/HealthMetricCard";

const Dashboard = () => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <header className="bg-white shadow-sm">
        <div className="health-track-container py-4">
          <h1 className="heading-2">Dashboard</h1>
        </div>
      </header>
      <div className="health-track-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HealthMetricCard 
            title="Steps"
            metricType="steps"
            unit=" steps"
          />
          <HealthMetricCard 
            title="Heart Rate"
            metricType="heart_rate"
            unit=" bpm"
          />
          <HealthMetricCard 
            title="Sleep"
            metricType="sleep"
            unit="h"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
