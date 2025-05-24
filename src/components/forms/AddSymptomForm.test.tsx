import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSymptomForm from './AddSymptomForm';
import { vi } from 'vitest';
import { addSymptom } from '@/integrations/supabase/api';
import { mockToast } from '@/test-setup';
import { Database } from '@/integrations/supabase/types';

describe('AddSymptomForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockToast.mockClear();
    (addSymptom as vi.Mock).mockClear();
  });

  const renderForm = () => {
    render(<AddSymptomForm onSuccess={mockOnSuccess} />);
  };

  test('renders all form fields and submit button', () => {
    renderForm();
    expect(screen.getByLabelText(/forms.symptom.name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.symptom.severity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.symptom.notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forms.symptom.submit/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /forms.symptom.submit/i }));

    expect(await screen.findByText(/Symptom name is required./i)).toBeInTheDocument();
    expect(await screen.findByText(/Severity is required./i)).toBeInTheDocument();
  });
  
  test('successful submission calls addSymptom, onSuccess, and success toast', async () => {
    (addSymptom as vi.Mock).mockResolvedValueOnce({ message: 'Symptom added successfully' });
    renderForm();

    await userEvent.type(screen.getByLabelText(/forms.symptom.name/i), 'Headache');
    await userEvent.click(screen.getByLabelText(/forms.symptom.severity/i));
    await userEvent.click(await screen.findByText(/enums.symptomSeverity.moderate/i)); // Assuming 'moderate'
    await userEvent.type(screen.getByLabelText(/forms.symptom.notes/i), 'Started after lunch.');

    await userEvent.click(screen.getByRole('button', { name: /forms.symptom.submit/i }));

    await waitFor(() => {
      expect(addSymptom).toHaveBeenCalledTimes(1);
      expect(addSymptom).toHaveBeenCalledWith('test-user-id', expect.objectContaining({ 
        symptomName: 'Headache', 
        severity: 'moderate' as Database['public']['Enums']['symptom_severity'],
        notes: 'Started after lunch.'
      }));
    });
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'recordAdded' })));
  });

  test('API error on submission calls error toast and not onSuccess', async () => {
    (addSymptom as vi.Mock).mockRejectedValueOnce(new Error('Database unavailable'));
    renderForm();

    await userEvent.type(screen.getByLabelText(/forms.symptom.name/i), 'Fatigue');
    await userEvent.click(screen.getByLabelText(/forms.symptom.severity/i));
    await userEvent.click(await screen.findByText(/enums.symptomSeverity.severe/i));

    await userEvent.click(screen.getByRole('button', { name: /forms.symptom.submit/i }));

    await waitFor(() => expect(addSymptom).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'genericError', variant: 'destructive' })));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
