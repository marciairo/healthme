// Extend Vitest's expect method with methods from react-testing-library
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: [{}], error: null }), // Default mock for successful insert
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
      update: vi.fn().mockResolvedValue({ data: [{}], error: null }),
      delete: vi.fn().mockResolvedValue({ data: [{}], error: null }),
      // Add other Supabase client methods if they are used directly and need mocking
    })),
    // Add other top-level Supabase client properties/methods if needed
    auth: {
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id', email: 'test@example.com' } }, error: null }),
    },
    // Mock storage if used
    storage: {
        from: vi.fn(() => ({
            upload: vi.fn(),
            download: vi.fn(),
            remove: vi.fn(),
            list: vi.fn(),
        })),
    },
  },
}));

// Mock Supabase API functions
// It's often better to mock the implementation of these if they are complex,
// but for now, just mocking the module and its exports is a start.
// Individual tests can override these mocks if specific behaviors are needed.
vi.mock('@/integrations/supabase/api', async (importOriginal) => {
  const actual = await importOriginal() as any; // Cast to any to allow dynamic mocking
  return {
    ...actual, // Import and retain original types/exports if needed, then override:
    addWorkout: vi.fn().mockResolvedValue({ message: 'Workout added successfully' }),
    addMeal: vi.fn().mockResolvedValue({ message: 'Meal added successfully' }),
    addSymptom: vi.fn().mockResolvedValue({ message: 'Symptom added successfully' }),
    addSleepLog: vi.fn().mockResolvedValue({ message: 'Sleep log added successfully' }),
    addMoodLog: vi.fn().mockResolvedValue({ message: 'Mood log added successfully' }),
    // Add other API functions if they exist
  };
});


// Mock useAuthStore
vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: { id: 'test-user-id', email: 'test@example.com' }, // Provide a mock user
    setUser: vi.fn(),
    clearUser: vi.fn(),
  })),
}));

// Mock useToast
export const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: mockToast,
  })),
}));

// Mock react-i18next (already partially done in Onboarding.test.tsx, but good to have a global basic one)
// This ensures that `t` function is available.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options && Object.keys(options).length > 0) {
        // Simple interpolation for testing if needed
        let str = key;
        for (const optKey in options) {
          str = str.replace(`{{${optKey}}}`, options[optKey]);
        }
        return str;
      }
      // Fallback for common keys, can be expanded
      if (key.startsWith('forms.')) return key.split('.').pop() || key;
      if (key.startsWith('enums.')) return key.split('.').pop() || key;
      if (key.startsWith('common.')) return key.split('.').pop() || key;
      if (key.startsWith('success.')) return key.split('.').pop() || key;
      if (key.startsWith('errors.')) return key.split('.').pop() || key;
      return key;
    },
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

// Clear mocks before each test if needed, though Vitest does some of this.
// beforeEach(() => {
//   mockToast.mockClear();
//   // Clear other mocks if they accumulate state across tests
// });
