import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSleepLogForm from './AddSleepLogForm';
import { addSleepLog } from '@/integrations/supabase/api';
import { mockToast } from '@/test-setup';

describe('AddSleepLogForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockToast.mockClear();
    (addSleepLog as vi.Mock).mockClear();
  });

  const renderForm = () => {
    render(<AddSleepLogForm onSuccess={mockOnSuccess} />);
  };

  test('renders all form fields and submit button', () => {
    renderForm();
    expect(screen.getByLabelText(/forms.sleep.date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.sleep.duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.sleep.quality/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forms.sleep.submit/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    renderForm();
    // Clear default values to trigger validation for empty
    await userEvent.clear(screen.getByLabelText(/forms.sleep.duration/i));
    // For select, need to ensure no default selection or select a "null" option if available
    // In this case, the schema requires a selection, so submitting without touching quality select should fail.
    
    await userEvent.click(screen.getByRole('button', { name: /forms.sleep.submit/i }));

    // Date has a default.
    expect(await screen.findByText(/Duration must be at least 0.5 hours./i)).toBeInTheDocument(); // from clear
    expect(await screen.findByText(/Sleep quality is required./i)).toBeInTheDocument();
  });

  test('shows validation error for invalid duration (e.g., negative)', async () => {
    renderForm();
    await userEvent.clear(screen.getByLabelText(/forms.sleep.duration/i));
    await userEvent.type(screen.getByLabelText(/forms.sleep.duration/i), '-2');
    await userEvent.click(screen.getByRole('button', { name: /forms.sleep.submit/i }));
    
    expect(await screen.findByText(/Duration must be at least 0.5 hours./i)).toBeInTheDocument();
  });

  test('shows validation error for duration exceeding 24 hours', async () => {
    renderForm();
    await userEvent.clear(screen.getByLabelText(/forms.sleep.duration/i));
    await userEvent.type(screen.getByLabelText(/forms.sleep.duration/i), '25');
    await userEvent.click(screen.getByRole('button', { name: /forms.sleep.submit/i }));
    
    expect(await screen.findByText(/Duration cannot exceed 24 hours./i)).toBeInTheDocument();
  });

  test('successful submission calls addSleepLog, onSuccess, and success toast', async () => {
    (addSleepLog as vi.Mock).mockResolvedValueOnce({ message: 'Sleep log added successfully' });
    renderForm();

    // Date has default.
    await userEvent.clear(screen.getByLabelText(/forms.sleep.duration/i));
    await userEvent.type(screen.getByLabelText(/forms.sleep.duration/i), '7.5');
    await userEvent.click(screen.getByLabelText(/forms.sleep.quality/i));
    await userEvent.click(await screen.findByText(/enums.sleepQuality.4/i)); // Assuming '4'

    await userEvent.click(screen.getByRole('button', { name: /forms.sleep.submit/i }));

    await waitFor(() => {
      expect(addSleepLog).toHaveBeenCalledTimes(1);
      expect(addSleepLog).toHaveBeenCalledWith('test-user-id', expect.objectContaining({ 
        duration: 7.5, 
        quality: '4'
      }));
    });
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'recordAdded' })));
  });

  test('API error on submission calls error toast and not onSuccess', async () => {
    (addSleepLog as vi.Mock).mockRejectedValueOnce(new Error('Internal server error'));
    renderForm();

    await userEvent.clear(screen.getByLabelText(/forms.sleep.duration/i));
    await userEvent.type(screen.getByLabelText(/forms.sleep.duration/i), '6');
    await userEvent.click(screen.getByLabelText(/forms.sleep.quality/i));
    await userEvent.click(await screen.findByText(/enums.sleepQuality.2/i));

    await userEvent.click(screen.getByRole('button', { name: /forms.sleep.submit/i }));

    await waitFor(() => expect(addSleepLog).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'genericError', variant: 'destructive' })));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
