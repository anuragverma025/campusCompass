import React from 'react';
import { Link } from 'react-router-dom';

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
  const savedOpportunities = opportunities
    .filter((o) => o.isBookmarked)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Saved Opportunities ({savedOpportunities.length})
          </h2>
          <Link
            to="/opportunities"
            className="text-xs text-[#4338CA] hover:underline font-medium"
          >
            All listings &rarr;
          </Link>
        </div>

        {savedOpportunities.length === 0 ? (
          <div className="py-8 text-center space-y-1.5">
            <p className="text-sm font-medium text-[#0F172A]">No saved opportunities</p>
            <p className="text-xs text-[#64748B]">Bookmark internships and scholarships to track them here.</p>
            <Link to="/opportunities" className="inline-block mt-1 text-xs text-[#4338CA] hover:underline font-medium">
              Browse radar
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100" role="list">
            {savedOpportunities.map((opp) => {
              const deadline = formatDeadline(opp.deadline);

              return (
                <li
                  key={opp.id}
                  className="py-2.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider truncate">
                      {opp.organization}
                    </p>
                    <h3 className="text-xs font-semibold text-[#0F172A] truncate mt-0.5">
                      {opp.title}
                    </h3>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      <span className={deadline.isOverdue ? 'text-[#B91C1C]' : deadline.isApproaching ? 'text-[#B45309]' : 'text-[#64748B]'}>
                        Due: {deadline.text}
                      </span>
                    </p>
                  </div>

                  {opp.link && (
                    <a
                      href={opp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-medium text-[#4338CA] hover:underline self-center"
                      aria-label={`Apply to ${opp.title}`}
                    >
                      Apply &rarr;
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
        <span>Bookmarked items</span>
        <Link to="/opportunities" className="text-[#4338CA] hover:underline font-medium">
          Manage bookmarks
        </Link>
      </div>
    </div>
  );
};

export default SavedOpportunitiesCard;
