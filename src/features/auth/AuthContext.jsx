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
 *   updateProfile(data) — updates active student details and persists to storage
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
      const base = getAccountById(savedId);
      if (base) {
        const custom = storage.get(`campusCompass_student_profile_${savedId}`, null);
        return custom ? { ...base, ...custom } : base;
      }
    }
    return null;
  });

  const login = useCallback((email, password) => {
    const account = validateCredentials(email, password);
    if (!account) {
      return { ok: false, error: 'Invalid email or password. Check the demo credentials below.' };
    }
    storage.set(SESSION_KEY, account.id);
    const custom = storage.get(`campusCompass_student_profile_${account.id}`, null);
    setStudent(custom ? { ...account, ...custom } : account);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    storage.remove(SESSION_KEY);
    setStudent(null);
  }, []);

  const updateProfile = useCallback((updatedFields) => {
    setStudent((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      storage.set(`campusCompass_student_profile_${prev.id}`, updated);
      return updated;
    });
  }, []);

  const value = useMemo(
    () => ({ student, isLoggedIn: student !== null, login, logout, updateProfile }),
    [student, login, logout, updateProfile],
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
