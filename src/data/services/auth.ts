// src/data/services/auth.ts
import { USE_MOCK } from '../config';
import { db, firebaseAuth } from '../firebase';
import { mockUsers, MOCK_CURRENT_USER_UID } from '../mock/users';
import type { AuthResult, User } from '../models';

let _currentUser: User | null = null;

function mapFirebaseAuthError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String((error as { code?: unknown }).code ?? '');

    if (code.includes('invalid-credential')) return 'Invalid email or password.';
    if (code.includes('user-not-found')) return 'No account found for that email.';
    if (code.includes('wrong-password')) return 'Invalid email or password.';
    if (code.includes('email-already-in-use')) return 'That email is already in use.';
    if (code.includes('weak-password')) return 'Password must be at least 6 characters.';
    if (code.includes('network-request-failed')) return 'Network error. Check your connection and try again.';
    if (code.includes('api-key-not-valid')) return 'Firebase API key is invalid. Check EXPO_PUBLIC_FIREBASE_* settings.';
    if (code.includes('operation-not-allowed')) return 'Email/password sign-in is not enabled. Contact support.';
  }

  if (error instanceof Error && error.message) return error.message;
  return 'Authentication failed. Please try again.';
}

function toUserFromAuth(authUser: {
  uid: string;
  email: string | null;
  displayName?: string | null;
}): User {
  return {
    uid: authUser.uid,
    email: authUser.email ?? '',
    displayName: authUser.displayName ?? undefined,
    favoriteBeerIds: [],
    favoriteBreweryIds: [],
  };
}

export function getCurrentUser(): User | null {
  if (USE_MOCK) return _currentUser;

  const authInstance = firebaseAuth as {
    currentUser?: { uid: string; email: string | null; displayName?: string | null } | null;
  } | null;

  const authUser = authInstance?.currentUser;
  if (!authUser) return _currentUser;

  _currentUser = toUserFromAuth(authUser);
  return _currentUser;
}

export async function login(email: string, password: string): Promise<AuthResult> {
  if (USE_MOCK) {
    // Mock mode always returns the dev user regardless of credentials
    const user = mockUsers.find(u => u.uid === MOCK_CURRENT_USER_UID) ?? mockUsers[0];
    _currentUser = user;
    return { status: 'success', user };
  }

  try {
    if (!firebaseAuth) return { status: 'fail', error: 'Firebase auth is not initialized.' };

    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const credential = await signInWithEmailAndPassword(
      firebaseAuth as never,
      email,
      password,
    );

    _currentUser = toUserFromAuth(credential.user);
    return { status: 'success', user: _currentUser };
  } catch (error) {
    return { status: 'fail', error: mapFirebaseAuthError(error) };
  }
}

export async function createAccount(email: string, password: string, displayName?: string): Promise<AuthResult> {
  if (USE_MOCK) {
    const user: User = { uid: `mock-${Date.now()}`, email, displayName, favoriteBeerIds: [], favoriteBreweryIds: [] };
    _currentUser = user;
    return { status: 'success', user };
  }

  try {
    if (!firebaseAuth || !db) {
      return { status: 'fail', error: 'Firebase is not initialized.' };
    }

    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');

    const credential = await createUserWithEmailAndPassword(
      firebaseAuth as never,
      email,
      password,
    );

    if (displayName?.trim()) {
      await updateProfile(credential.user, { displayName: displayName.trim() });
    }

    const user: User = {
      uid: credential.user.uid,
      email: credential.user.email ?? email,
      displayName: displayName?.trim() || undefined,
      favoriteBeerIds: [],
      favoriteBreweryIds: [],
    };

    await setDoc(doc(db as never, 'users', user.uid), user, { merge: true });
    _currentUser = user;

    return { status: 'success', user };
  } catch (error) {
    return { status: 'fail', error: mapFirebaseAuthError(error) };
  }
}

export async function logout(): Promise<void> {
  _currentUser = null;
  if (USE_MOCK) return;

  if (!firebaseAuth) return;

  const { signOut } = await import('firebase/auth');
  await signOut(firebaseAuth as never);
}
