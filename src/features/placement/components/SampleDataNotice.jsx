import React from 'react';
import { Button } from '../../../components/ui';

/**
 * SampleDataNotice — Informs the user when pre-seeded sample data is active.
 * Provides quick actions to clear sample data or re-seed it.
 *
 * @param {Object} props
 * @param {Function} props.onClear - Handler to clear all sample applications
 * @param {Function} props.onReload - Handler to reload sample applications
 */
export const SampleDataNotice = ({ onClear, onReload }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] text-xs text-[#3730A3]">
      <div className="flex items-center gap-2.5">
        <span className="p-1.5 rounded-lg bg-indigo-100 text-[#4338CA] shrink-0" aria-hidden="true">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <span className="font-semibold text-[#0F172A]">Sample Applications Active: </span>
          <span>
            You are viewing pre-seeded sample applications. Edit or delete them freely, or clear them to start with a fresh slate.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="!text-xs !py-1 !px-2.5 bg-white text-slate-700 hover:text-red-700 hover:border-red-200"
        >
          Clear Sample Data
        </Button>
      </div>
    </div>
  );
};

export default SampleDataNotice;
