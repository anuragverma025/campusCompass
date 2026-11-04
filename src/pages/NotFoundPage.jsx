import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-[#EEF2FF] text-[#4338CA] rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Page Not Found</h1>
      <p className="mt-2 text-sm text-[#64748B] max-w-md">
        The page you're looking for doesn't exist. It may have moved or been removed.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary" size="md">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
