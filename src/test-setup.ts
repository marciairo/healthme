
// Extend Vitest's expect method with methods from react-testing-library
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Make vi globally available
(globalThis as any).vi = vi;

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: [{}], error: null }),
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
      update: vi.fn().mockResolvedValue({ data: [{}], error: null }),
      delete: vi.fn().mockResolvedValue({ data: [{}], error: null }),
    })),
    auth: {
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id', email: 'test@example.com' } }, error: null }),
    },
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
vi.mock('@/integrations/supabase/api', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    addWorkout: vi.fn().mockResolvedValue({ message: 'Workout added successfully' }),
    addMeal: vi.fn().mockResolvedValue({ message: 'Meal added successfully' }),
    addSymptom: vi.fn().mockResolvedValue({ message: 'Symptom added successfully' }),
    addSleepLog: vi.fn().mockResolvedValue({ message: 'Sleep log added successfully' }),
    addMoodLog: vi.fn().mockResolvedValue({ message: 'Mood log added successfully' }),
  };
});

// Mock useAuthStore
vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
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

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options && Object.keys(options).length > 0) {
        let str = key;
        for (const optKey in options) {
          str = str.replace(`{{${optKey}}}`, options[optKey]);
        }
        return str;
      }
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
