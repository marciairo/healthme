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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Database } from '@/integrations/supabase/types'; // For enum type
import { addMeal, MealData } from '@/integrations/supabase/api';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

// Define the meal types based on Supabase enum
const mealTypes: Database['public']['Enums']['meal_type'][] = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
];

const mealFormSchema = z.object({
  description: z.string().min(1, { message: 'Description is required.' }),
  calories: z.coerce.number().min(0, { message: 'Calories must be 0 or more.' }),
  mealType: z.enum(mealTypes, { required_error: 'Meal type is required.' }),
  recordedAtDate: z.date({ required_error: 'Date is required.' }),
  recordedAtTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format (HH:MM).' })
});

type MealFormValues = z.infer<typeof mealFormSchema>;

interface AddMealFormProps {
  onSuccess: () => void;
}

const AddMealForm: React.FC<AddMealFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      description: '',
      calories: 0,
      // mealType: 'lunch', // Let user select
      recordedAtDate: new Date(),
      recordedAtTime: format(new Date(), 'HH:mm'),
    },
  });

  const onSubmit = async (data: MealFormValues) => {
    if (!user) {
      toast({ title: t('errors.unauthenticated'), description: t('errors.signInRequired'), variant: 'destructive' });
      return;
    }
    try {
      await addMeal(user.id, data as unknown as MealData); // Cast if Zod type differs slightly
      toast({ title: t('success.recordAdded'), description: t('forms.meal.successMessage') });
      onSuccess();
    } catch (error) {
      console.error('Error adding meal:', error);
      toast({ title: t('errors.genericError'), description: (error as Error).message, variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forms.meal.description')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('forms.meal.descriptionPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.meal.calories')}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.meal.mealType')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('forms.meal.mealTypePlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mealTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(`enums.mealType.${type}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          {t('forms.meal.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default AddMealForm;
