import React from 'react';
import { Card, Badge, Button } from '../../../components/ui';
import { STATUS_BADGE_VARIANT } from '../utils/constants';

/**
 * ApplicationCard — Displays an individual placement application item.
 *
 * @param {Object} props
 * @param {Object} props.application - Application data object
 * @param {Function} [props.onEdit] - Edit handler callback
 * @param {Function} [props.onDelete] - Delete handler callback
 * @param {Function} [props.onStatusChange] - Status change callback
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
    deadline,
    notes,
    applicationLink,
    createdAt,
  } = application;

  const badgeVariant = STATUS_BADGE_VARIANT[status] || 'default';

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

  const formattedAppliedDate = formatDate(createdAt);
  const formattedDeadline = formatDate(deadline);

  return (
    <Card className="hover:border-slate-300 transition-all duration-150">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base font-semibold text-[#0F172A] tracking-tight">
              {company}
            </h3>
            <Badge variant={badgeVariant} dot size="sm">
              {status}
            </Badge>
          </div>
          <p className="text-sm font-medium text-[#4338CA] mt-0.5">
            {role}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(application)}
              aria-label={`Edit ${company} application`}
              className="text-[#64748B] hover:text-[#0F172A]"
            >
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span className="hidden sm:inline">Edit</span>
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span className="hidden sm:inline">Delete</span>
            </Button>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="py-3 space-y-2.5 text-xs text-[#64748B]">
        {/* Dates & Link row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {formattedAppliedDate && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-slate-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                <span className="text-slate-500 font-medium">Applied: </span>
                <span className="text-[#0F172A] font-medium">{formattedAppliedDate}</span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {formattedDeadline ? (
                <>
                  <span className="text-slate-500 font-medium">Deadline: </span>
                  <span className="text-[#0F172A] font-semibold">{formattedDeadline}</span>
                </>
              ) : (
                <span className="italic text-slate-400">No deadline specified</span>
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
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Application Portal</span>
            </a>
          )}
        </div>

        {/* Notes */}
        {notes && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-[#334155] leading-relaxed line-clamp-3">
              {notes}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ApplicationCard;
