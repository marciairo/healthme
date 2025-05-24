
import { supabase } from './client';
import { format } from 'date-fns';

// Define types for form data based on what the forms will provide
// These might be slightly different from the Zod schemas if transformations occur

// Workout Data
export type WorkoutData = {
  workoutType: string; // This will be used as part of metric_type or stored in notes if no direct column
  duration: number;
  caloriesBurned: number;
  recordedAtDate: Date;
  recordedAtTime: string;
};

// Meal Data (Matches structure from AddMealForm.tsx)
export type MealData = {
  description: string;
  calories: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recordedAtDate: Date;
  recordedAtTime: string;
};

// Symptom Data
export type SymptomData = {
  symptomName: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
  recordedAtDate: Date;
  recordedAtTime: string;
};

// Sleep Log Data
export type SleepLogData = {
  sleepDate: Date; // This is 'date' in the DB
  duration: number; // This is 'duration_hours'
  quality: string; // This is 'quality_rating' (needs conversion to number)
};

// Mood Log Data
export type MoodLogData = {
  moodRating: string; // Needs conversion to number
  notes?: string;
  recordedAtDate: Date;
  recordedAtTime: string;
};

// Helper to combine date and time
const getCombinedDateTime = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const combined = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
  return combined.toISOString();
};


// --- API Functions ---

export const addWorkout = async (userId: string, data: WorkoutData) => {
  const recordedAt = getCombinedDateTime(data.recordedAtDate, data.recordedAtTime);

  // Insert duration metric
  const { error: durationError } = await supabase.from('health_metrics').insert({
    user_id: userId,
    metric_type: `workout_duration_${data.workoutType.toLowerCase().replace(/\s+/g, '_')}`, // e.g., workout_duration_running
    value: data.duration,
    unit: 'minutes',
    recorded_at: recordedAt,
  });

  if (durationError) throw durationError;

  // Insert calories metric
  const { error: caloriesError } = await supabase.from('health_metrics').insert({
    user_id: userId,
    metric_type: `workout_calories_${data.workoutType.toLowerCase().replace(/\s+/g, '_')}`, // e.g., workout_calories_running
    value: data.caloriesBurned,
    unit: 'kcal',
    recorded_at: recordedAt,
  });

  if (caloriesError) throw caloriesError;

  return { message: 'Workout added successfully' };
};

export const addMeal = async (userId: string, data: MealData) => {
  const recordedAt = getCombinedDateTime(data.recordedAtDate, data.recordedAtTime);

  const { error } = await supabase.from('meals').insert({
    user_id: userId,
    description: data.description,
    calories: data.calories,
    meal_type: data.mealType,
    recorded_at: recordedAt,
  });

  if (error) throw error;
  return { message: 'Meal added successfully' };
};

export const addSymptom = async (userId: string, data: SymptomData) => {
  const recordedAt = getCombinedDateTime(data.recordedAtDate, data.recordedAtTime);

  const { error } = await supabase.from('symptoms').insert({
    user_id: userId,
    symptom_name: data.symptomName,
    severity: data.severity,
    notes: data.notes,
    recorded_at: recordedAt,
  });

  if (error) throw error;
  return { message: 'Symptom added successfully' };
};

export const addSleepLog = async (userId: string, data: SleepLogData) => {
  const { error } = await supabase.from('sleep_logs').insert({
    user_id: userId,
    date: format(data.sleepDate, 'yyyy-MM-dd'), // Format date as YYYY-MM-DD for DATE type
    duration_hours: data.duration,
    quality_rating: parseInt(data.quality, 10), // Convert string rating to number
    // notes: data.notes, // Assuming notes might be added to SleepLogData later
  });

  if (error) throw error;
  return { message: 'Sleep log added successfully' };
};

export const addMoodLog = async (userId: string, data: MoodLogData) => {
  const recordedAt = getCombinedDateTime(data.recordedAtDate, data.recordedAtTime);

  const { error } = await supabase.from('mood_logs').insert({
    user_id: userId,
    mood_rating: parseInt(data.moodRating, 10), // Convert string rating to number
    notes: data.notes,
    recorded_at: recordedAt,
  });

  if (error) throw error;
  return { message: 'Mood log added successfully' };
};
