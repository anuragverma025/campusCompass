import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CATEGORY_BADGE_VARIANT, CATEGORY_LABELS } from '../utils/constants';

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
    return { text: 'Closes Today!', isOverdue: false, isApproaching: true };
  }
  if (diffDays <= 5) {
    return { text: `${diffDays} days left (${formatted})`, isOverdue: false, isApproaching: true };
  }

  return { text: `Deadline: ${formatted}`, isOverdue: false, isApproaching: false };
}

export const OpportunityCard = ({
  opportunity,
  onToggleBookmark,
  onEdit,
  onDelete,
}) => {
  const badgeVariant = CATEGORY_BADGE_VARIANT[opportunity.category] || 'default';
  const categoryLabel = CATEGORY_LABELS[opportunity.category] || opportunity.category;
  const deadlineInfo = formatDeadline(opportunity.deadline);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between">
      <div>
        {/* Top Header: Category, Sample Tag, Bookmark Button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={badgeVariant} size="sm" dot>
              {categoryLabel}
            </Badge>

            {opportunity.isSample && (
              <Badge variant="info" size="sm">
                Sample
              </Badge>
            )}

            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1
                ${deadlineInfo.isOverdue
                  ? 'bg-red-50 text-[#B91C1C] border border-red-200'
                  : deadlineInfo.isApproaching
                  ? 'bg-amber-50 text-[#B45309] border border-amber-200'
                  : 'bg-slate-100 text-slate-700'
                }
              `}
            >
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {deadlineInfo.text}
            </span>
          </div>

          {/* Bookmark Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(opportunity.id)}
            aria-label={opportunity.isBookmarked ? 'Remove from saved opportunities' : 'Save opportunity'}
            aria-pressed={opportunity.isBookmarked}
            className={`p-2 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]
              ${opportunity.isBookmarked
                ? 'bg-amber-50 text-amber-500 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={opportunity.isBookmarked ? '0' : '2'}
              fill={opportunity.isBookmarked ? 'currentColor' : 'none'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Organization & Title */}
        <div className="mb-3">
          <span className="text-xs font-bold text-[#4338CA] uppercase tracking-wider block">
            {opportunity.organization}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug mt-0.5">
            {opportunity.title}
          </h3>
        </div>

        {/* Location & Stipend Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-slate-600">
          {opportunity.location && (
            <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {opportunity.location}
            </span>
          )}

          {opportunity.stipend && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
              {opportunity.stipend}
            </span>
          )}
        </div>

        {/* Eligibility Criteria Callout */}
        {opportunity.eligibility && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-3 text-xs">
            <span className="font-semibold text-slate-800 block mb-0.5">Eligibility:</span>
            <span className="text-slate-600 leading-relaxed">{opportunity.eligibility}</span>
          </div>
        )}

        {/* Description */}
        {opportunity.description && (
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
            {opportunity.description}
          </p>
        )}
      </div>

      {/* Card Footer: Apply Link + Edit/Delete */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 mt-2 flex-wrap">
        <div>
          {opportunity.link ? (
            <a
              href={opportunity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] px-3.5 py-2 rounded-lg transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
            >
              <span>Apply Online</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <span className="text-xs text-slate-400 italic">No link provided</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(opportunity)}
            aria-label={`Edit ${opportunity.title}`}
            leftIcon={
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            }
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(opportunity)}
            aria-label={`Delete ${opportunity.title}`}
            className="hover:text-[#B91C1C] hover:bg-red-50"
            leftIcon={
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;

