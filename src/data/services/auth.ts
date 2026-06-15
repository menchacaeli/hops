// src/data/services/auth.ts
import { USE_MOCK } from '../config';
import { mockUsers, MOCK_CURRENT_USER_UID } from '../mock/users';
import type { AuthResult, User } from '../models';

let _currentUser: User | null = null;

export function getCurrentUser(): User | null {
  if (USE_MOCK) return _currentUser;
  // Firebase: const u = firebaseAuth.currentUser;
  // return u ? { uid: u.uid, email: u.email!, displayName: u.displayName ?? undefined, favoriteBeerIds: [], favoriteBreweryIds: [] } : null;
  return null;
}

export async function login(email: string, password: string): Promise<AuthResult> {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.uid === MOCK_CURRENT_USER_UID) ?? mockUsers[0];
    _currentUser = user;
    return { status: 'success', user };
  }
  // Firebase: const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
  // const u = cred.user;
  // const userData = await getUser(u.uid);
  // _currentUser = userData ?? { uid: u.uid, email: u.email!, favoriteBeerIds: [], favoriteBreweryIds: [] };
  // return { status: 'success', user: _currentUser };
  return { status: 'fail', error: 'Firebase not configured' };
}

export async function createAccount(email: string, password: string, displayName?: string): Promise<AuthResult> {
  if (USE_MOCK) {
    const user: User = { uid: `mock-${Date.now()}`, email, displayName, favoriteBeerIds: [], favoriteBreweryIds: [] };
    _currentUser = user;
    return { status: 'success', user };
  }
  // Firebase: const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  // if (displayName) await updateProfile(cred.user, { displayName });
  // const user: User = { uid: cred.user.uid, email, displayName, favoriteBeerIds: [], favoriteBreweryIds: [] };
  // await setDoc(doc(db, 'users', user.uid), user);
  // _currentUser = user;
  // return { status: 'success', user };
  return { status: 'fail', error: 'Firebase not configured' };
}

export async function logout(): Promise<void> {
  _currentUser = null;
  if (USE_MOCK) return;
  // Firebase: await signOut(firebaseAuth);
}
