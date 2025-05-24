import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { addWorkout, WorkoutData } from '@/integrations/supabase/api';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const workoutFormSchema = z.object({
  workoutType: z.string().min(1, { message: 'Workout type is required.' }),
  duration: z.coerce.number().min(1, { message: 'Duration must be at least 1 minute.' }),
  caloriesBurned: z.coerce.number().min(0, { message: 'Calories burned must be 0 or more.' }),
  recordedAtDate: z.date({ required_error: 'Date is required.' }),
  recordedAtTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format (HH:MM).' })
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

interface AddWorkoutFormProps {
  onSuccess: () => void;
}

const AddWorkoutForm: React.FC<AddWorkoutFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      workoutType: '',
      duration: 60,
      caloriesBurned: 300,
      recordedAtDate: new Date(),
      recordedAtTime: format(new Date(), 'HH:mm'),
    },
  });

  const onSubmit = async (data: WorkoutFormValues) => {
    if (!user) {
      toast({ title: t('errors.unauthenticated'), description: t('errors.signInRequired'), variant: 'destructive' });
      return;
    }
    try {
      // WorkoutData type in api.ts expects duration, caloriesBurned etc. directly
      // The Zod schema coerces them to numbers, so they should be fine.
      await addWorkout(user.id, data as unknown as WorkoutData); // Cast needed if Zod type slightly differs from API type
      toast({ title: t('success.recordAdded'), description: t('forms.workout.successMessage') });
      onSuccess();
    } catch (error) {
      console.error('Error adding workout:', error);
      toast({ title: t('errors.genericError'), description: (error as Error).message, variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="workoutType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forms.workout.type')}</FormLabel>
              <FormControl>
                <Input placeholder={t('forms.workout.typePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.workout.duration')}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caloriesBurned"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.workout.calories')}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="recordedAtDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('forms.common.date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>{t('forms.common.pickDate')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recordedAtTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.common.time')}</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {t('forms.workout.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default AddWorkoutForm;
