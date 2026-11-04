import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { CATEGORY_BADGE_VARIANT, CATEGORY_LABELS } from '../../opportunities/utils/constants';

function formatDeadline(dateStr) {
  if (!dateStr) return { text: 'No deadline', isOverdue: false, isApproaching: false };
  const todayStr = new Date().toISOString().slice(0, 10);

  const [y, m, d] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatted = `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]}`;

  if (dateStr < todayStr) {
    return { text: `Closed`, isOverdue: true, isApproaching: false };
  }

  const diffDays = Math.ceil((new Date(dateStr) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
  if (diffDays <= 3) {
    return { text: `${diffDays === 0 ? 'Today' : `${diffDays}d left`}`, isOverdue: false, isApproaching: true };
  }

  return { text: formatted, isOverdue: false, isApproaching: false };
}

export const SavedOpportunitiesCard = ({ opportunities = [] }) => {
  // Filter bookmarked opportunities and sort by earliest deadline
  const savedOpportunities = opportunities
    .filter((o) => o.isBookmarked)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              Shortlisted Opportunities
            </h2>
          </div>
          <Link
            to="/opportunities"
            className="text-xs text-[#4338CA] hover:underline font-semibold"
          >
            All listings ({opportunities.length}) &rarr;
          </Link>
        </div>

        {savedOpportunities.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">No saved opportunities</p>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto">
              Bookmark internships, scholarships, and hackathons to track their deadlines here.
            </p>
            <Link
              to="/opportunities"
              className="inline-block mt-2 text-xs font-semibold text-[#4338CA] hover:underline"
            >
              Browse opportunities radar
            </Link>
          </div>
        ) : (
          <ul className="space-y-2.5" role="list">
            {savedOpportunities.map((opp) => {
              const badgeVariant = CATEGORY_BADGE_VARIANT[opp.category] || 'default';
              const categoryLabel = CATEGORY_LABELS[opp.category] || opp.category;
              const deadline = formatDeadline(opp.deadline);

              return (
                <li
                  key={opp.id}
                  className="p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-[#4338CA] uppercase tracking-wider truncate">
                        {opp.organization}
                      </span>
                      {opp.isSample && (
                        <Badge variant="info" size="sm">
                          Sample
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xs font-semibold text-[#0F172A] truncate mt-0.5">
                      {opp.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                      <Badge variant={badgeVariant} size="sm" dot>
                        {categoryLabel}
                      </Badge>
                      <span
                        className={`font-semibold ${
                          deadline.isOverdue
                            ? 'text-[#B91C1C]'
                            : deadline.isApproaching
                            ? 'text-[#B45309]'
                            : 'text-slate-500'
                        }`}
                      >
                        ⏱ {deadline.text}
                      </span>
                    </div>
                  </div>

                  {opp.link && (
                    <a
                      href={opp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-semibold text-[#4338CA] hover:text-[#3730A3] bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      aria-label={`Apply to ${opp.title} at ${opp.organization}`}
                    >
                      <span>Apply</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Shortlisted by deadline</span>
        <Link to="/opportunities" className="text-[#4338CA] hover:underline font-medium">
          Manage All Bookmarks
        </Link>
      </div>
    </div>
  );
};

export default SavedOpportunitiesCard;

