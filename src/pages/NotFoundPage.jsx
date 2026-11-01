import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-600 max-w-md">
        The requested path does not exist or may still be under development in future phases.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Campus Compass
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

