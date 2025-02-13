
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { Plus, Activity, Utensils, Brain, LightbulbIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import HealthMetricCard from "@/components/HealthMetricCard";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("daily");

  // Fetch latest symptoms
  const { data: symptoms } = useQuery({
    queryKey: ["symptoms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("symptoms")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch latest meals
  const { data: meals } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch health tips
  const { data: healthTips } = useQuery({
    queryKey: ["healthTips"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_tips")
        .select("*")
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

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
        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList>
            <TabsTrigger value="daily">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            {/* Health Metrics */}
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

            {/* Latest Symptoms */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="heading-3">Latest Symptoms</h2>
              </div>
              <div className="space-y-2">
                {symptoms?.map((symptom) => (
                  <div key={symptom.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                    <span>{symptom.symptom_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(symptom.recorded_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Latest Meals */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-5 w-5 text-primary" />
                <h2 className="heading-3">Latest Meals</h2>
              </div>
              <div className="space-y-2">
                {meals?.map((meal) => (
                  <div key={meal.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                    <span>{meal.description}</span>
                    <span className="text-sm text-muted-foreground">
                      {meal.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Health Tips */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <LightbulbIcon className="h-5 w-5 text-primary" />
                <h2 className="heading-3">Health Tips</h2>
              </div>
              <div className="space-y-4">
                {healthTips?.map((tip) => (
                  <div key={tip.id} className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Basic Reports Section */}
            <Card className="p-6">
              <h2 className="heading-3 mb-4">Basic Reports</h2>
              <p className="text-muted-foreground">
                View your basic health metrics and trends.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Record Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </motion.div>
  );
};

export default Dashboard;
