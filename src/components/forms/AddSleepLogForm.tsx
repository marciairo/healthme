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
import { addSleepLog, SleepLogData } from '@/integrations/supabase/api';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const sleepQualityLevels = ['1', '2', '3', '4', '5'] as const; // 1: Poor, 5: Excellent

const sleepLogFormSchema = z.object({
  sleepDate: z.date({ required_error: 'Date of sleep is required.' }),
  duration: z.coerce.number().min(0.5, { message: 'Duration must be at least 0.5 hours.' }).max(24, { message: 'Duration cannot exceed 24 hours.' }),
  quality: z.enum(sleepQualityLevels, { required_error: 'Sleep quality is required.' }),
});

type SleepLogFormValues = z.infer<typeof sleepLogFormSchema>;

interface AddSleepLogFormProps {
  onSuccess: () => void;
}

const AddSleepLogForm: React.FC<AddSleepLogFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<SleepLogFormValues>({
    resolver: zodResolver(sleepLogFormSchema),
    defaultValues: {
      sleepDate: new Date(),
      duration: 8,
      // quality: '3', // Let user select
    },
  });

  const onSubmit = async (data: SleepLogFormValues) => {
    if (!user) {
      toast({ title: t('errors.unauthenticated'), description: t('errors.signInRequired'), variant: 'destructive' });
      return;
    }
    try {
      // The API function addSleepLog expects data.quality to be a string '1'-'5'
      // and will parseInt it. It also expects data.duration.
      await addSleepLog(user.id, data as SleepLogData); // SleepLogData in api.ts expects 'duration' and 'quality'
      toast({ title: t('success.recordAdded'), description: t('forms.sleep.successMessage') });
      onSuccess();
    } catch (error) {
      console.error('Error adding sleep log:', error);
      toast({ title: t('errors.genericError'), description: (error as Error).message, variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sleepDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('forms.sleep.date')}</FormLabel>
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
                    // You might want to disable future dates for sleep logs
                    disabled={(date) => date > new Date()} 
                  />
                </PopoverContent>
              </Popover>
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
                <FormLabel>{t('forms.sleep.duration')}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.5" placeholder="8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.sleep.quality')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('forms.sleep.qualityPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sleepQualityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {t(`enums.sleepQuality.${level}`)} 
                        {/* Example: enums.sleepQuality.1 = Poor, ... 5 = Excellent */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {t('forms.sleep.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default AddSleepLogForm;
