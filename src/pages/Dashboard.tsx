
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";

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
          {/* Placeholder cards for health metrics */}
          <div className="card p-6">
            <h3 className="heading-3 mb-4">Steps</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="card p-6">
            <h3 className="heading-3 mb-4">Heart Rate</h3>
            <p className="text-3xl font-bold text-primary">--</p>
          </div>
          <div className="card p-6">
            <h3 className="heading-3 mb-4">Sleep</h3>
            <p className="text-3xl font-bold text-primary">--</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
