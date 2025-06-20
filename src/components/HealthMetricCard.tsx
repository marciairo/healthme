
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

interface HealthMetricCardProps {
  title: string;
  metricType: string;
  unit?: string;
}

const HealthMetricCard = ({ title, metricType, unit }: HealthMetricCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);

  const { data: metricData, refetch } = useQuery({
    queryKey: ["healthMetric", metricType],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("health_metrics")
        .select("value, recorded_at")
        .eq("metric_type", metricType)
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching metric:", error);
        return null;
      }
      return data;
    },
    enabled: !!user?.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to save metrics",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("health_metrics").insert({
      metric_type: metricType,
      value: Number(newValue),
      unit,
      user_id: user.id,
    });

    if (error) {
      console.error("Error saving metric:", error);
      toast({
        title: "Error",
        description: "Failed to save metric",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Metric saved successfully",
    });
    
    setIsEditing(false);
    setNewValue("");
    refetch();
  };

  return (
    <Card className="p-6">
      <h3 className="heading-3 mb-4">{title}</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={`Enter ${title.toLowerCase()}`}
            required
          />
          <div className="flex space-x-2">
            <Button type="submit" size="sm">Save</Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p className="text-3xl font-bold text-primary">
            {metricData ? `${metricData.value}${unit || ""}` : "--"}
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Add New
          </Button>
        </div>
      )}
    </Card>
  );
};

export default HealthMetricCard;
