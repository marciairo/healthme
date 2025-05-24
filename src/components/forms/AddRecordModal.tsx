import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import AddWorkoutForm from './AddWorkoutForm';
import AddMealForm from './AddMealForm';
import AddSymptomForm from './AddSymptomForm';
import AddSleepLogForm from './AddSleepLogForm';
import AddMoodLogForm from './AddMoodLogForm';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type RecordType = 'workout' | 'meal' | 'symptom' | 'sleep' | 'mood' | '';

export const AddRecordModal = ({ isOpen, onClose }: AddRecordModalProps) => {
  const { t } = useTranslation();
  const [selectedRecordType, setSelectedRecordType] = useState<RecordType>('');
  const [showForm, setShowForm] = useState(false);

  const handleRecordTypeChange = (value: string) => {
    setSelectedRecordType(value as RecordType);
    setShowForm(false); // Reset form display when type changes
  };

  const handleContinue = () => {
    if (selectedRecordType) {
      setShowForm(true);
    }
  };
  
  const handleBack = () => {
    setShowForm(false);
  };

  const renderForm = () => {
    if (!showForm) return null;

    const formProps = {
      onSuccess: () => {
        onClose(); // Close the modal
        // Optionally, reset local state if needed, though onOpenChange handles it for full close
        setShowForm(false);
        setSelectedRecordType('');
      }
    };

    switch (selectedRecordType) {
      case 'workout':
        return <AddWorkoutForm {...formProps} />;
      case 'meal':
        return <AddMealForm {...formProps} />;
      case 'symptom':
        return <AddSymptomForm {...formProps} />;
      case 'sleep':
        return <AddSleepLogForm {...formProps} />;
      case 'mood':
        return <AddMoodLogForm {...formProps} />;
      default:
        return null;
    }
  };

  const recordTypeOptions = [
    { value: 'workout', label: t('recordTypes.workout') },
    { value: 'meal', label: t('recordTypes.meal') },
    { value: 'symptom', label: t('recordTypes.symptom') },
    { value: 'sleep', label: t('recordTypes.sleep') },
    { value: 'mood', label: t('recordTypes.mood') },
  ];
  
  // Fallback if translation is not ready
  if (!recordTypeOptions[0].label || recordTypeOptions[0].label === 'recordTypes.workout') {
    recordTypeOptions[0].label = 'Workout';
    recordTypeOptions[1].label = 'Meal';
    recordTypeOptions[2].label = 'Symptom';
    recordTypeOptions[3].label = 'Sleep Log';
    recordTypeOptions[4].label = 'Mood Log';
  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setShowForm(false);
        setSelectedRecordType('');
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showForm ? `${t('addRecordModal.title')} - ${recordTypeOptions.find(opt => opt.value === selectedRecordType)?.label}` : t('addRecordModal.selectTitle')}
          </DialogTitle>
          {!showForm && (
            <DialogDescription>
              {t('addRecordModal.selectDescription')}
            </DialogDescription>
          )}
        </DialogHeader>

        {!showForm ? (
          <div className="grid gap-4 py-4">
            <Select onValueChange={handleRecordTypeChange} value={selectedRecordType}>
              <SelectTrigger>
                <SelectValue placeholder={t('addRecordModal.selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {recordTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          renderForm()
        )}

        <DialogFooter>
          {showForm ? (
            <>
              <Button variant="outline" onClick={handleBack}>{t('common.back')}</Button>
              {/* Submit button will be part of individual forms */}
            </>
          ) : (
            <Button onClick={handleContinue} disabled={!selectedRecordType}>
              {t('common.continue')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
