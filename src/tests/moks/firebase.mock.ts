import { vi } from 'vitest';

export const auth = {
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
};

export const db = {
  collection: vi.fn(),
  doc: vi.fn(),
};

export const query = vi.fn();
export const where = vi.fn();
export const getDocs = vi.fn();
