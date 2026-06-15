// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, login, createAccount, logout } from '../data';
import type { User, AuthResult } from '../data';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
    // Firebase: return onAuthStateChanged(firebaseAuth, fbUser => {
    //   setUser(fbUser ? { uid: fbUser.uid, email: fbUser.email!, favoriteBeerIds: [], favoriteBreweryIds: [] } : null);
    //   setLoading(false);
    // });
  }, []);

  const handleLogin = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const result = await login(email, password);
    if (result.status === 'success') setUser(result.user);
    return result;
  }, []);

  const handleCreateAccount = useCallback(async (email: string, password: string, displayName?: string): Promise<AuthResult> => {
    const result = await createAccount(email, password, displayName);
    if (result.status === 'success') setUser(result.user);
    return result;
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  return { user, loading, login: handleLogin, createAccount: handleCreateAccount, logout: handleLogout };
};

export default useAuth;
