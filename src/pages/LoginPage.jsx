import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { DEMO_ACCOUNTS } from '../features/auth/demoAccounts';
import Button from '../components/ui/Button';

/**
 * LoginPage — Demo login entry point for Campus Compass.
 *
 * ⚠️  This is a frontend-only college project demo.
 * It does NOT provide real security or protect actual personal data.
 * Credentials are intentionally visible for demonstration and grading purposes.
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

    // Simulate a brief async delay for a realistic feel
    setTimeout(() => {
      const result = login(email.trim(), password);
      if (result.ok) {
        navigate('/', { replace: true });
      } else {
        setAuthError(result.error);
      }
      setIsLoading(false);
    }, 400);
  }

  /* ── Quick-fill a demo account ──────────────────────────────────── */
  function fillAccount(account) {
    setEmail(account.email);
    setPassword(account.password);
    setErrors({});
    setAuthError('');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-10">
      {/* ── Brand header ── */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4338CA] text-white shadow-lg">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
            Campus Compass
          </h1>
          <p className="mt-0.5 text-sm text-[#64748B]">The Student Life Assistant</p>
        </div>
      </div>

      {/* ── Login card ── */}
      <div className="w-full max-w-sm rounded-2xl border border-[#E2E8F0] bg-white shadow-sm px-6 py-7 sm:px-8">
        <h2 className="text-lg font-bold text-[#0F172A] mb-1">Sign in to your account</h2>
        <p className="text-xs text-[#64748B] mb-5">
          Use one of the demo accounts below — this is a frontend-only college project demo.
        </p>

        {/* Auth-level error */}
        {authError && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-5.75a.75.75 0 001.5 0V7.75a.75.75 0 00-1.5 0v4.5zm.75 2.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-[#0F172A] mb-1">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="student@demo.com"
              className={`w-full rounded-lg border px-3 py-2 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-[#4338CA] focus:border-[#4338CA] ${
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
            <label htmlFor="login-password" className="block text-sm font-medium text-[#0F172A] mb-1">
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
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-[#4338CA] focus:border-[#4338CA] ${
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
      <div className="mt-5 w-full max-w-sm rounded-2xl border border-[#E2E8F0] bg-white shadow-sm px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold">!</span>
          <h3 className="text-sm font-semibold text-[#0F172A]">Demo Accounts</h3>
          <span className="ml-auto text-xs text-[#64748B]">Click to auto-fill →</span>
        </div>
        <p className="text-xs text-[#64748B] mb-3 leading-relaxed">
          This is a frontend-only college project demo. Credentials are intentionally visible. No real data is collected.
        </p>
        <ul className="space-y-2">
          {DEMO_ACCOUNTS.map((account) => (
            <li key={account.id}>
              <button
                type="button"
                onClick={() => fillAccount(account)}
                className="w-full text-left rounded-xl border border-[#E2E8F0] px-3.5 py-2.5 hover:border-[#4338CA] hover:bg-[#EEF2FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4338CA] group-hover:bg-[#4338CA] group-hover:text-white transition-colors">
                    {account.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0F172A] truncate">{account.name}</p>
                    <p className="text-xs text-[#64748B] truncate">{account.email} · <span className="font-mono">{account.password}</span></p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-xs text-[#94A3B8]">
        Campus Compass — College Project Demo · Data stored in browser only
      </p>
    </div>
  );
};

export default LoginPage;

