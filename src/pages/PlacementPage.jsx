import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import {
  APPLICATION_STATUSES,
  STATUS_BADGE_VARIANT,
} from '../features/placement/utils/constants';

/**
 * PlacementPage — Placement Tracker landing page.
 * Displays application pipeline overview with status summary.
 * Full CRUD, search, and filtering will be added in subsequent stages.
 */
const PlacementPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" dot>
              Placement Tracker
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Placement Tracker
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Track your placement applications, from interest to offer.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          Add Application
        </Button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {APPLICATION_STATUSES.map((status) => (
          <Card key={status} className="!p-4 text-center">
            <Badge variant={STATUS_BADGE_VARIANT[status]} size="sm">
              {status}
            </Badge>
            <p className="text-2xl font-bold text-[#0F172A] mt-2">0</p>
            <p className="text-xs text-[#64748B] mt-0.5">applications</p>
          </Card>
        ))}
      </div>

      {/* Placeholder for application list — will be built in Stage 2 */}
      <Card className="!py-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#0F172A]">
            No applications yet
          </h3>
          <p className="text-sm text-[#64748B] max-w-sm">
            Start tracking your placement journey by adding your first
            application. Your data is saved locally in your browser.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PlacementPage;

