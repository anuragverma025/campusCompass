import React from 'react';
import { Button } from '../../../components/ui/Button';
import { CATEGORY_LABELS } from '../utils/constants';

function formatDeadline(dateStr) {
  if (!dateStr) return { text: 'No deadline', isOverdue: false, isApproaching: false };
  const todayStr = new Date().toISOString().slice(0, 10);

  const [y, m, d] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatted = `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;

  if (dateStr < todayStr) {
    return { text: `Closed on ${formatted}`, isOverdue: true, isApproaching: false };
  }

  const diffDays = Math.ceil((new Date(dateStr) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return { text: 'Closes today', isOverdue: false, isApproaching: true };
  }
  if (diffDays <= 5) {
    return { text: `${diffDays}d left (${formatted})`, isOverdue: false, isApproaching: true };
  }

  return { text: formatted, isOverdue: false, isApproaching: false };
}

export const OpportunityCard = ({
  opportunity,
  onToggleBookmark,
  onEdit,
  onDelete,
}) => {
  const categoryLabel = CATEGORY_LABELS[opportunity.category] || opportunity.category;
  const deadlineInfo = formatDeadline(opportunity.deadline);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
      <div>
        {/* Top: Organization & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-semibold text-[#4338CA] uppercase tracking-wider block">
              {opportunity.organization}
            </span>
            <h3 className="text-base font-bold text-[#0F172A] leading-snug mt-0.5">
              {opportunity.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(opportunity.id)}
            aria-label={opportunity.isBookmarked ? 'Remove from saved' : 'Save opportunity'}
            aria-pressed={opportunity.isBookmarked}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] shrink-0
              ${opportunity.isBookmarked
                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }
            `}
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={opportunity.isBookmarked ? '0' : '2'}
              fill={opportunity.isBookmarked ? 'currentColor' : 'none'}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Category & Deadline tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded capitalize font-medium">
            {categoryLabel}
          </span>

          <span
            className={`px-2 py-0.5 rounded font-medium ${
              deadlineInfo.isOverdue
                ? 'bg-red-50 text-[#B91C1C]'
                : deadlineInfo.isApproaching
                ? 'bg-amber-50 text-[#B45309]'
                : 'bg-slate-50 text-[#64748B] border border-slate-200'
            }`}
          >
            Deadline: {deadlineInfo.text}
          </span>

          {opportunity.isSample && (
            <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.2 rounded">
              Sample
            </span>
          )}
        </div>

        {/* Location / Stipend meta */}
        {(opportunity.location || opportunity.stipend) && (
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-[#64748B]">
            {opportunity.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {opportunity.location}
              </span>
            )}
            {opportunity.stipend && (
              <span className="text-emerald-700 font-medium">
                {opportunity.stipend}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        {opportunity.description && (
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-3">
            {opportunity.description}
          </p>
        )}

        {/* Eligibility callout */}
        {opportunity.eligibility && (
          <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-lg p-2.5 mb-3">
            <strong className="text-slate-700">Eligibility:</strong> {opportunity.eligibility}
          </p>
        )}
      </div>

      {/* Footer: Apply button + Edit/Delete */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 mt-2">
        <div>
          {opportunity.link ? (
            <a
              href={opportunity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
            >
              <span>Apply</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <span className="text-xs text-slate-400 italic">No link</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(opportunity)}
            aria-label={`Edit ${opportunity.title}`}
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(opportunity)}
            aria-label={`Delete ${opportunity.title}`}
            className="hover:text-[#B91C1C] hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
