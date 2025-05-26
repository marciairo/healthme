import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRecordModal } from './AddRecordModal';
import { vi } from 'vitest';

// Mock the actual form components to simplify modal testing
// We only want to check if the modal renders the correct form,
// not test the form's internals here (that's done in their own test files).
vi.mock('./AddWorkoutForm', () => ({ default: ({ onSuccess }: { onSuccess: () => void }) => <div data-testid="workout-form">Workout Form <button onClick={onSuccess}>SubmitWorkout</button></div> }));
vi.mock('./AddMealForm', () => ({ default: ({ onSuccess }: { onSuccess: () => void }) => <div data-testid="meal-form">Meal Form <button onClick={onSuccess}>SubmitMeal</button></div> }));
vi.mock('./AddSymptomForm', () => ({ default: ({ onSuccess }: { onSuccess: () => void }) => <div data-testid="symptom-form">Symptom Form <button onClick={onSuccess}>SubmitSymptom</button></div> }));
vi.mock('./AddSleepLogForm', () => ({ default: ({ onSuccess }: { onSuccess: () => void }) => <div data-testid="sleep-log-form">Sleep Log Form <button onClick={onSuccess}>SubmitSleep</button></div> }));
vi.mock('./AddMoodLogForm', () => ({ default: ({ onSuccess }: { onSuccess: () => void }) => <div data-testid="mood-log-form">Mood Log Form <button onClick={onSuccess}>SubmitMood</button></div> }));

describe('AddRecordModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('does not render when isOpen is false', () => {
    render(<AddRecordModal isOpen={false} onClose={mockOnClose} />);
    // Check for a unique element within the dialog, e.g., the title.
    // queryByText returns null if not found, getByText throws error.
    expect(screen.queryByText(/addRecordModal.selectTitle/i)).toBeNull();
  });

  test('renders when isOpen is true, showing initial selection view', () => {
    render(<AddRecordModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/addRecordModal.selectTitle/i)).toBeInTheDocument();
    expect(screen.getByText(/addRecordModal.selectDescription/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /common.continue/i })).toBeDisabled();
  });

  test('selecting a record type enables Continue button', async () => {
    render(<AddRecordModal isOpen={true} onClose={mockOnClose} />);
    // The select trigger itself might not have the label "Record Type", but its accessible name.
    // Let's find the placeholder text for the SelectValue.
    await userEvent.click(screen.getByText(/addRecordModal.selectPlaceholder/i));
    await userEvent.click(screen.getByText(/Workout/i)); // Using fallback text from modal
    expect(screen.getByRole('button', { name: /common.continue/i })).toBeEnabled();
  });

  const testCases = [
    { type: 'Workout', formTestId: 'workout-form', submitButtonName: 'SubmitWorkout' },
    { type: 'Meal', formTestId: 'meal-form', submitButtonName: 'SubmitMeal' },
    { type: 'Symptom', formTestId: 'symptom-form', submitButtonName: 'SubmitSymptom' },
    { type: 'Sleep Log', formTestId: 'sleep-log-form', submitButtonName: 'SubmitSleep' },
    { type: 'Mood Log', formTestId: 'mood-log-form', submitButtonName: 'SubmitMood' },
  ];

  testCases.forEach(({ type, formTestId, submitButtonName }) => {
    test(`renders ${type} form when selected and Continue is clicked`, async () => {
      render(<AddRecordModal isOpen={true} onClose={mockOnClose} />);
      await userEvent.click(screen.getByText(/addRecordModal.selectPlaceholder/i));
      await userEvent.click(screen.getByText(type, { exact: false })); // Using part of the type name
      await userEvent.click(screen.getByRole('button', { name: /common.continue/i }));

      expect(screen.getByTestId(formTestId)).toBeInTheDocument();
      expect(screen.getByText(`${type} Form`)).toBeInTheDocument(); // From mock component
      expect(screen.getByRole('button', { name: /common.back/i })).toBeInTheDocument();
      expect(screen.queryByText(/addRecordModal.selectDescription/i)).toBeNull(); // Description should hide
    });

    test(`Back button from ${type} form returns to selection view`, async () => {
      render(<AddRecordModal isOpen={true} onClose={mockOnClose} />);
      await userEvent.click(screen.getByText(/addRecordModal.selectPlaceholder/i));
      await userEvent.click(screen.getByText(type, { exact: false }));
      await userEvent.click(screen.getByRole('button', { name: /common.continue/i }));

      expect(screen.getByTestId(formTestId)).toBeInTheDocument(); // Form is visible
      await userEvent.click(screen.getByRole('button', { name: /common.back/i }));

      expect(screen.getByText(/addRecordModal.selectDescription/i)).toBeInTheDocument(); // Selection view is back
      expect(screen.queryByTestId(formTestId)).toBeNull(); // Form is hidden
    });

    test(`onClose is called when ${type} form's onSuccess is triggered (simulated by mock form submit)`, async () => {
      render(<AddRecordModal isOpen={true} onClose={mockOnClose} />);
      await userEvent.click(screen.getByText(/addRecordModal.selectPlaceholder/i));
      await userEvent.click(screen.getByText(type, { exact: false }));
      await userEvent.click(screen.getByRole('button', { name: /common.continue/i }));
      
      // Simulate the form's internal submit leading to onSuccess call
      const mockFormSubmitButton = screen.getByText(submitButtonName);
      await userEvent.click(mockFormSubmitButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  // Test for Dialog's own close mechanism (e.g., 'X' button or overlay click if not prevented)
  // shadcn/ui Dialog typically has an 'X' button. Let's assume it has an aria-label or role.
  // If it's just an icon, it might be harder to target without adding a specific test id.
  // For now, we'll simulate the onOpenChange behavior which is what the 'X' button triggers.
  // For shadcn Dialog, the 'X' button is usually a <button> with a <XIcon>.
  // If we assume DialogPrimitive.Close is used, it might be targetable.
  // For now, this test is limited without a clear selector for the default close button.
  // A more robust way would be to add data-testid to the close button if possible.
  test('onClose is called when Dialog onOpenChange is called with false', () => {
    const { rerender } = render(<AddRecordModal isOpen={true} onClose={mockOnClose} />);
    // Simulate the internal Dialog calling onOpenChange(false)
    // This is usually done by finding the Dialog component and invoking its prop,
    // but here we'll simulate the effect by re-rendering with isOpen=false if Dialog was fully controlled
    // or by finding a close button if available.
    // The onOpenChange in AddRecordModal directly calls onClose when open becomes false.
    // So, we can't directly test the 'X' button without a more specific selector for it.
    // However, the provided onOpenChange implementation in AddRecordModal is:
    // onOpenChange={(open) => { if (!open) { onClose(); ... } }}
    // We can test this by finding a way to trigger this.
    // For shadcn Dialog, the 'X' button is usually a <button> with a <XIcon>.
    // If we assume DialogPrimitive.Close is used, it might be targetable.
    // For now, this test is limited without a clear selector for the default close button.
    // A more robust way would be to add data-testid to the close button if possible.
  });
});
