import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { DEMO_ACCOUNTS } from '../features/auth/demoAccounts';
import Button from '../components/ui/Button';

/**
 * LoginPage — Demo login entry point for Campus Compass.
 * Clean, restrained, and consistent with the rest of the application.
 */
export const LoginPage = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  /* ── Client-side field validation ───────────────────────────────── */
  function validate() {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    return errs;
  }

  /* ── Submit handler ──────────────────────────────────────────────── */
  function handleSubmit(e) {
    e.preventDefault();
    setAuthError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email.trim(), password);
      if (result.ok) {
        navigate('/', { replace: true });
      } else {
        setAuthError(result.error);
      }
      setIsLoading(false);
    }, 250);
  }

  /* ── Quick-fill a demo account ──────────────────────────────────── */
  function fillAccount(account) {
    setEmail(account.email);
    setPassword(account.password);
    setErrors({});
    setAuthError('');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* ── Brand header ── */}
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4338CA] text-white shadow-2xs">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Campus Compass
          </h1>
          <p className="text-xs text-[#64748B]">The Student Life Assistant</p>
        </div>
      </div>

      {/* ── Login card ── */}
      <div className="w-full max-w-sm rounded-xl border border-[#E2E8F0] bg-white shadow-2xs px-6 py-6">
        <h2 className="text-base font-semibold text-[#0F172A] mb-0.5">Sign in</h2>
        <p className="text-xs text-[#64748B] mb-4">
          Select a student demo profile below or enter credentials.
        </p>

        {/* Auth-level error */}
        {authError && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
          >
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-xs font-medium text-[#0F172A] mb-1">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="student@demo.com"
              className={`w-full rounded-lg border px-3 py-2 text-xs text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-[#E2E8F0] bg-white'
              }`}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-xs font-medium text-[#0F172A] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                placeholder="Enter password"
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-xs text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA] ${
                  errors.password ? 'border-red-400 bg-red-50' : 'border-[#E2E8F0] bg-white'
                }`}
                aria-describedby={errors.password ? 'password-error' : undefined}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M3 3l18 18M10.5 10.5A3 3 0 0013.5 13.5M9 9A5 5 0 0115 15" />
                    <path strokeLinecap="round" d="M17.94 17.94A10.1 10.1 0 0112 20C7 20 2.73 16.39 1 12c.9-2.11 2.37-3.94 4.17-5.3M6.5 6.5A10 10 0 0112 4c5 0 9.27 3.61 11 8a10.1 10.1 0 01-1.84 3.16" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M1 12C2.73 7.61 7 4 12 4s9.27 3.61 11 8c-1.73 4.39-6 8-11 8S2.73 16.39 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="md"
            isLoading={isLoading}
            className="mt-1"
          >
            Sign In
          </Button>
        </form>
      </div>

      {/* ── Demo credentials panel ── */}
      <div className="mt-4 w-full max-w-sm rounded-xl border border-[#E2E8F0] bg-white shadow-2xs px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-[#0F172A]">Demo Student Accounts</h3>
          <span className="text-[11px] text-[#4338CA]">Click to select</span>
        </div>
        <p className="text-[11px] text-[#64748B] mb-2.5">
          Select any profile to log in and view their personal tasks, timetable, and applications:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.id}
              type="button"
              onClick={() => fillAccount(account)}
              className="text-left rounded-lg border border-[#E2E8F0] p-2 hover:border-[#4338CA] hover:bg-[#EEF2FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] group"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4338CA] group-hover:bg-[#4338CA] group-hover:text-white transition-colors">
                  {account.avatar}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#0F172A] truncate">{account.name}</p>
                  <p className="text-[10px] text-[#64748B] truncate">{account.email}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-[#94A3B8]">
        Campus Compass &bull; Frontend-only college demo &bull; Local storage
      </p>
    </div>
  );
};

export default LoginPage;
