import React from 'react';
import { Badge, Card } from '../components/ui';

export const PagePlaceholder = ({ title }) => (
  <section className="mx-auto w-full max-w-5xl">
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
        {title}
      </h1>
      <Badge variant="warning" size="sm">
        Coming soon
      </Badge>
    </div>
    <Card className="min-h-48 items-center justify-center text-center">
      <div className="mx-auto max-w-md py-4">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4338CA]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <p className="text-sm leading-6 text-[#64748B]">
          This space is ready for your {title.toLowerCase()} tools. The feature
          will be added here soon.
        </p>
      </div>
    </Card>
  </section>
);

export default PagePlaceholder;
