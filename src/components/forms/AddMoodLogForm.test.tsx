import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMoodLogForm from './AddMoodLogForm';
import { vi } from 'vitest';
import { addMoodLog } from '@/integrations/supabase/api';
import { mockToast } from '@/test-setup';

describe('AddMoodLogForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockToast.mockClear();
    (addMoodLog as vi.Mock).mockClear();
  });

  const renderForm = () => {
    render(<AddMoodLogForm onSuccess={mockOnSuccess} />);
  };

  test('renders all form fields and submit button', () => {
    renderForm();
    expect(screen.getByLabelText(/forms.mood.rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.mood.notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forms.mood.submit/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /forms.mood.submit/i }));

    expect(await screen.findByText(/Mood rating is required./i)).toBeInTheDocument();
  });
  
  test('successful submission calls addMoodLog, onSuccess, and success toast', async () => {
    (addMoodLog as vi.Mock).mockResolvedValueOnce({ message: 'Mood log added successfully' });
    renderForm();

    await userEvent.click(screen.getByLabelText(/forms.mood.rating/i));
    await userEvent.click(await screen.findByText(/enums.moodRating.5/i)); // Assuming '5'
    await userEvent.type(screen.getByLabelText(/forms.mood.notes/i), 'Feeling great today!');

    await userEvent.click(screen.getByRole('button', { name: /forms.mood.submit/i }));

    await waitFor(() => {
      expect(addMoodLog).toHaveBeenCalledTimes(1);
      expect(addMoodLog).toHaveBeenCalledWith('test-user-id', expect.objectContaining({ 
        moodRating: '5', 
        notes: 'Feeling great today!'
      }));
    });
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'recordAdded' })));
  });

  test('API error on submission calls error toast and not onSuccess', async () => {
    (addMoodLog as vi.Mock).mockRejectedValueOnce(new Error('Server connection failed'));
    renderForm();

    await userEvent.click(screen.getByLabelText(/forms.mood.rating/i));
    await userEvent.click(await screen.findByText(/enums.moodRating.2/i));

    await userEvent.click(screen.getByRole('button', { name: /forms.mood.submit/i }));

    await waitFor(() => expect(addMoodLog).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'genericError', variant: 'destructive' })));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
