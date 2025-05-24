import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AddWorkoutForm from './AddWorkoutForm';
import { addWorkout } from '@/integrations/supabase/api';
import { mockToast } from '@/test-setup';

// Mock i18next translations just for these tests if not fully covered by global setup
// For simplicity, assuming global setup's t function is sufficient.

describe('AddWorkoutForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockToast.mockClear();
    (addWorkout as vi.Mock).mockClear(); // Clear mock history for addWorkout
  });

  const renderForm = () => {
    render(<AddWorkoutForm onSuccess={mockOnSuccess} />);
  };

  test('renders all form fields and submit button', () => {
    renderForm();
    expect(screen.getByLabelText(/forms.workout.type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.workout.duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.workout.calories/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forms.workout.submit/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /forms.workout.submit/i }));

    expect(await screen.findByText(/Workout type is required./i)).toBeInTheDocument();
    // Duration and Calories have default values, so they won't show empty errors initially
    // Date has a default, Time has a default.
    // Zod schema ensures duration > 0, calories >= 0.
    // If default values were empty, we'd test those too.
  });

  test('shows validation error for invalid duration (e.g., negative)', async () => {
    renderForm();
    await userEvent.clear(screen.getByLabelText(/forms.workout.duration/i));
    await userEvent.type(screen.getByLabelText(/forms.workout.duration/i), '-5');
    await userEvent.click(screen.getByRole('button', { name: /forms.workout.submit/i }));
    
    expect(await screen.findByText(/Duration must be at least 1 minute./i)).toBeInTheDocument();
  });

  test('shows validation error for invalid time format', async () => {
    renderForm();
    // Clear existing valid time and type an invalid one
    const timeInput = screen.getByLabelText(/forms.common.time/i);
    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '99:99');
    await userEvent.click(screen.getByRole('button', { name: /forms.workout.submit/i }));

    expect(await screen.findByText(/Invalid time format \(HH:MM\)/i)).toBeInTheDocument();
  });
  
  test('successful submission calls addWorkout, onSuccess, and success toast', async () => {
    (addWorkout as vi.Mock).mockResolvedValueOnce({ message: 'Workout added successfully' });
    renderForm();

    await userEvent.type(screen.getByLabelText(/forms.workout.type/i), 'Running');
    await userEvent.clear(screen.getByLabelText(/forms.workout.duration/i));
    await userEvent.type(screen.getByLabelText(/forms.workout.duration/i), '30');
    await userEvent.clear(screen.getByLabelText(/forms.workout.calories/i));
    await userEvent.type(screen.getByLabelText(/forms.workout.calories/i), '250');
    // Date and Time have defaults, let's assume they are fine for this test.

    await userEvent.click(screen.getByRole('button', { name: /forms.workout.submit/i }));

    await waitFor(() => {
      expect(addWorkout).toHaveBeenCalledTimes(1);
      // We can be more specific about the payload if needed, but the form values are passed
      // and the api.ts function does the transformation.
      // Example check: expect(addWorkout).toHaveBeenCalledWith('test-user-id', expect.objectContaining({ workoutType: 'Running' }));
    });
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'recordAdded' })));
  });

  test('API error on submission calls error toast and not onSuccess', async () => {
    (addWorkout as vi.Mock).mockRejectedValueOnce(new Error('Network error'));
    renderForm();

    await userEvent.type(screen.getByLabelText(/forms.workout.type/i), 'Yoga');
    await userEvent.type(screen.getByLabelText(/forms.workout.duration/i), '60');
    await userEvent.type(screen.getByLabelText(/forms.workout.calories/i), '150');

    await userEvent.click(screen.getByRole('button', { name: /forms.workout.submit/i }));

    await waitFor(() => expect(addWorkout).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'genericError', variant: 'destructive' })));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
