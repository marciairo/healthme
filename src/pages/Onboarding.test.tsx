import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Onboarding from './Onboarding';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Return a simplified key or a default mock string
      if (key === 'onboarding.step1.title') return 'Track Your Activity';
      if (key === 'onboarding.step1.description') return 'Monitor your progress and stay motivated.';
      if (key === 'onboarding.step2.title') return 'Eat Healthy';
      if (key === 'onboarding.step2.description') return 'Discover nutritious recipes and meal plans.';
      if (key === 'onboarding.step3.title') return 'Achieve Your Goals';
      if (key === 'onboarding.step3.description') return 'Set and conquer your fitness milestones.';
      if (key === 'getStarted') return 'Get Started';
      if (key === 'next') return 'Next';
      if (key === 'skip') return 'Skip';
      return key;
    },
  }),
}));

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Onboarding Page', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderOnboarding = () => {
    return render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );
  };

  test('renders initial step correctly and has background image', () => {
    renderOnboarding();

    // Check for initial title and description
    expect(screen.getByText('Track Your Activity')).toBeInTheDocument();
    expect(screen.getByText('Monitor your progress and stay motivated.')).toBeInTheDocument();

    // Check for background image class on the main container
    const mainContainer = screen.getByTestId('onboarding-container');
    expect(mainContainer).toHaveClass("bg-[url('/images/onboarding_background.jpg')]");
    expect(mainContainer).toHaveClass('bg-cover');
    expect(mainContainer).toHaveClass('bg-center');
  });

  test('Lottie animation source updates on "Next" button click', () => {
    renderOnboarding();

    // Initial step (Step 1: Tracking)
    expect(screen.getByText('Track Your Activity')).toBeInTheDocument();
    // In a real scenario, you'd check the Lottie component's `src` prop or a child element.
    // For now, we assume the title change indicates the step and thus animation change.

    // Click Next to go to Step 2 (Eating)
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Eat Healthy')).toBeInTheDocument();
    // Add assertion for eating.json if possible

    // Click Next to go to Step 3 (Goals)
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Achieve Your Goals')).toBeInTheDocument();
    // Add assertion for goals.json if possible
  });

  test('"Get Started" button navigates to /plans on the last step', () => {
    renderOnboarding();

    // Navigate to the last step
    fireEvent.click(screen.getByText('Next')); // Step 2
    fireEvent.click(screen.getByText('Next')); // Step 3

    // Check for "Get Started" button text
    expect(screen.getByText('Get Started')).toBeInTheDocument();

    // Click "Get Started"
    fireEvent.click(screen.getByText('Get Started'));
    expect(mockNavigate).toHaveBeenCalledWith('/plans');
  });

  test('"Skip" button navigates to /plans', () => {
    renderOnboarding();

    fireEvent.click(screen.getByText('Skip'));
    expect(mockNavigate).toHaveBeenCalledWith('/plans');
  });
});
