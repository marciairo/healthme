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
import { addMoodLog, MoodLogData } from '@/integrations/supabase/api';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const moodRatingLevels = ['1', '2', '3', '4', '5'] as const; // 1: Very Poor, 5: Very Good

const moodLogFormSchema = z.object({
  moodRating: z.enum(moodRatingLevels, { required_error: 'Mood rating is required.' }),
  notes: z.string().optional(),
  recordedAtDate: z.date({ required_error: 'Date is required.' }),
  recordedAtTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format (HH:MM).' })
});

type MoodLogFormValues = z.infer<typeof moodLogFormSchema>;

interface AddMoodLogFormProps {
  onSuccess: () => void;
}

const AddMoodLogForm: React.FC<AddMoodLogFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<MoodLogFormValues>({
    resolver: zodResolver(moodLogFormSchema),
    defaultValues: {
      // moodRating: '3', // Let user select
      notes: '',
      recordedAtDate: new Date(),
      recordedAtTime: format(new Date(), 'HH:mm'),
    },
  });

  const onSubmit = async (data: MoodLogFormValues) => {
    if (!user) {
      toast({ title: t('errors.unauthenticated'), description: t('errors.signInRequired'), variant: 'destructive' });
      return;
    }
    try {
      // The API function addMoodLog expects data.moodRating to be a string '1'-'5'
      // and will parseInt it.
      await addMoodLog(user.id, data as unknown as MoodLogData); // Cast if Zod type differs
      toast({ title: t('success.recordAdded'), description: t('forms.mood.successMessage') });
      onSuccess();
    } catch (error) {
      console.error('Error adding mood log:', error);
      toast({ title: t('errors.genericError'), description: (error as Error).message, variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="moodRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forms.mood.rating')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('forms.mood.ratingPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {moodRatingLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {t(`enums.moodRating.${level}`)} 
                      {/* Example: enums.moodRating.1 = Very Poor, ... 5 = Very Good */}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forms.mood.notes')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('forms.mood.notesPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          {t('forms.mood.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default AddMoodLogForm;
