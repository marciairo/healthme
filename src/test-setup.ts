
import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Make vi globally available
global.vi = vi;

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

// Mock API functions
vi.mock('@/integrations/supabase/api', () => ({
  addWorkout: vi.fn(),
  addMeal: vi.fn(),
  addSymptom: vi.fn(),
  addSleepLog: vi.fn(),
  addMoodLog: vi.fn(),
}));

// Mock toast
export const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock auth store
vi.mock('@/store/authStore', () => ({
  useAuthStore: () => ({
    user: { id: 'test-user-id' },
  }),
}));

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Global test setup
beforeEach(() => {
  mockToast.mockClear();
});
