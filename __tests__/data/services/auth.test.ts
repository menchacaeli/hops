// __tests__/data/services/auth.test.ts
import { login, createAccount, logout, getCurrentUser } from '../../../src/data/services/auth';

beforeEach(async () => {
  await logout();
});

describe('auth service (mock)', () => {
  it('getCurrentUser returns null before login', () => {
    expect(getCurrentUser()).toBeNull();
  });

  it('login returns success and sets current user', async () => {
    const result = await login('dev@hops.com', 'password');
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.user.uid).toBe('mock-user-1');
      expect(result.user.email).toBe('dev@hops.com');
    }
  });

  it('getCurrentUser returns user after login', async () => {
    await login('dev@hops.com', 'password');
    const user = getCurrentUser();
    expect(user).not.toBeNull();
    expect(user?.uid).toBe('mock-user-1');
  });

  it('logout clears current user', async () => {
    await login('dev@hops.com', 'password');
    await logout();
    expect(getCurrentUser()).toBeNull();
  });

  it('createAccount returns success with provided email', async () => {
    const result = await createAccount('new@hops.com', 'password123', 'NewUser');
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.user.email).toBe('new@hops.com');
      expect(result.user.displayName).toBe('NewUser');
    }
  });
});
