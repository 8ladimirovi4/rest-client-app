import { vi } from 'vitest';

export const mockFirebase = () => {
    vi.mock('firebase/auth', () => ({
        getAuth: vi.fn().mockReturnValue({ currentUser: { uid: '123' } }),
        signInWithEmailAndPassword: vi.fn().mockResolvedValue({
          user: { uid: '123', email: 'test@example.com' },
        }),
        onAuthStateChanged: vi.fn((_, callback) => {
          callback({ uid: '123', email: 'test@example.com' }); 
          return () => {}; //unsubscribe function
        }),
      }));
};
