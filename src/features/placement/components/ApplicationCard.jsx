import React from 'react';
import { Button } from '../../../components/ui';
import {
  APPLICATION_STATUSES,
  STATUS_BADGE_VARIANT,
} from '../utils/constants';

/**
 * ApplicationCard — Displays an individual placement application item.
 * Clean, restrained layout emphasizing company, role, status dropdown, and dates.
 */
export const ApplicationCard = ({
  application,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const {
    id,
    company,
    role,
    status,
    applicationDate,
    deadline,
    notes,
    applicationLink,
    createdAt,
    isSample,
  } = application;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const displayAppliedDate = applicationDate || (createdAt ? createdAt.split('T')[0] : null);
  const formattedAppliedDate = formatDate(displayAppliedDate);
  const formattedDeadline = formatDate(deadline);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              {company}
            </h3>
            {isSample && (
              <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.2 rounded font-normal">
                Sample
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-[#4338CA] mt-0.5">
            {role}
          </p>
        </div>

        {/* Action controls & Direct status dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
          {onStatusChange && (
            <div className="flex items-center gap-1.5">
              <label htmlFor={`quick-status-${id}`} className="text-xs text-[#64748B] font-medium hidden md:inline">
                Stage:
              </label>
              <select
                id={`quick-status-${id}`}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
                aria-label={`Change status for ${company}`}
                className="text-xs font-semibold border border-[#E2E8F0] rounded-lg bg-white px-2.5 py-1 text-[#0F172A] hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 transition-all cursor-pointer"
              >
                {APPLICATION_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          )}

          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(application)}
              aria-label={`Edit ${company} application`}
              className="text-[#64748B] hover:text-[#0F172A]"
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              aria-label={`Delete ${company} application`}
              className="text-[#B91C1C] hover:bg-red-50 hover:text-[#991B1B]"
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="pt-3 space-y-2 text-xs text-[#64748B]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {formattedAppliedDate && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                <span className="text-slate-500">Applied: </span>
                <span className="text-[#0F172A] font-medium">{formattedAppliedDate}</span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {formattedDeadline ? (
                <>
                  <span className="text-slate-500">Deadline: </span>
                  <span className="text-[#0F172A] font-medium">{formattedDeadline}</span>
                </>
              ) : (
                <span className="italic text-slate-400">No deadline</span>
              )}
            </span>
          </div>

          {applicationLink && (
            <a
              href={applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#4338CA] hover:underline font-medium"
            >
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Application Portal</span>
            </a>
          )}
        </div>

        {/* Notes */}
        {notes && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-[#334155] leading-relaxed line-clamp-2">
              {notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
