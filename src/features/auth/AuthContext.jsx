import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { storage } from '../../utils/storage';
import { migrateLegacyDataIfNeeded } from '../../utils/studentStorage';
import {
  SESSION_KEY,
  getAccountById,
  validateCredentials,
} from './demoAccounts';

/**
 * AuthContext — provides the active demo student session to the entire app.
 *
 * Consumers receive:
 *   student    — the full account object (id, name, email, avatar, course) or null
 *   isLoggedIn — boolean convenience flag
 *   login(email, password) — returns { ok: true } or { ok: false, error: string }
 *   logout()   — clears the session and returns to the login page
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Run safe one-time legacy migration on mount
  useEffect(() => {
    migrateLegacyDataIfNeeded();
  }, []);

  // Rehydrate session from localStorage on first render
  const [student, setStudent] = useState(() => {
    const savedId = storage.get(SESSION_KEY, null);
    if (typeof savedId === 'string') {
      return getAccountById(savedId);
    }
    return null;
  });

  const login = useCallback((email, password) => {
    const account = validateCredentials(email, password);
    if (!account) {
      return { ok: false, error: 'Invalid email or password. Check the demo credentials below.' };
    }
    storage.set(SESSION_KEY, account.id);
    setStudent(account);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    storage.remove(SESSION_KEY);
    setStudent(null);
  }, []);

  const value = useMemo(
    () => ({ student, isLoggedIn: student !== null, login, logout }),
    [student, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — consume the auth context in any component.
 * Throws if used outside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export default AuthContext;
