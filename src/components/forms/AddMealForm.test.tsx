import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMealForm from './AddMealForm';
import { vi } from 'vitest';
import { addMeal } from '@/integrations/supabase/api';
import { mockToast } from '@/test-setup';
import { Database } from '@/integrations/supabase/types';

describe('AddMealForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockToast.mockClear();
    (addMeal as vi.Mock).mockClear();
  });

  const renderForm = () => {
    render(<AddMealForm onSuccess={mockOnSuccess} />);
  };

  test('renders all form fields and submit button', () => {
    renderForm();
    expect(screen.getByLabelText(/forms.meal.description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.meal.calories/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.meal.mealType/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forms.common.time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forms.meal.submit/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /forms.meal.submit/i }));

    expect(await screen.findByText(/Description is required./i)).toBeInTheDocument();
    expect(await screen.findByText(/Meal type is required./i)).toBeInTheDocument();
    // Calories has default, Date has default, Time has default.
  });

  test('shows validation error for invalid calories (e.g., negative)', async () => {
    renderForm();
    await userEvent.clear(screen.getByLabelText(/forms.meal.calories/i));
    await userEvent.type(screen.getByLabelText(/forms.meal.calories/i), '-100');
    await userEvent.click(screen.getByRole('button', { name: /forms.meal.submit/i }));
    
    expect(await screen.findByText(/Calories must be 0 or more./i)).toBeInTheDocument();
  });

  test('successful submission calls addMeal, onSuccess, and success toast', async () => {
    (addMeal as vi.Mock).mockResolvedValueOnce({ message: 'Meal added successfully' });
    renderForm();

    await userEvent.type(screen.getByLabelText(/forms.meal.description/i), 'Chicken Salad');
    await userEvent.clear(screen.getByLabelText(/forms.meal.calories/i));
    await userEvent.type(screen.getByLabelText(/forms.meal.calories/i), '350');
    
    // Select meal type
    await userEvent.click(screen.getByLabelText(/forms.meal.mealType/i));
    await userEvent.click(await screen.findByText(/enums.mealType.lunch/i)); // Assuming 'lunch' is an option

    await userEvent.click(screen.getByRole('button', { name: /forms.meal.submit/i }));

    await waitFor(() => {
      expect(addMeal).toHaveBeenCalledTimes(1);
      expect(addMeal).toHaveBeenCalledWith('test-user-id', expect.objectContaining({ 
        description: 'Chicken Salad', 
        calories: 350,
        mealType: 'lunch' as Database['public']['Enums']['meal_type'] // Ensure type cast if needed
      }));
    });
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'recordAdded' })));
  });

  test('API error on submission calls error toast and not onSuccess', async () => {
    (addMeal as vi.Mock).mockRejectedValueOnce(new Error('Server error'));
    renderForm();

    await userEvent.type(screen.getByLabelText(/forms.meal.description/i), 'Apple Pie');
    await userEvent.clear(screen.getByLabelText(/forms.meal.calories/i));
    await userEvent.type(screen.getByLabelText(/forms.meal.calories/i), '400');
    await userEvent.click(screen.getByLabelText(/forms.meal.mealType/i));
    await userEvent.click(await screen.findByText(/enums.mealType.snack/i));


    await userEvent.click(screen.getByRole('button', { name: /forms.meal.submit/i }));

    await waitFor(() => expect(addMeal).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ title: 'genericError', variant: 'destructive' })));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
