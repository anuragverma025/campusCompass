import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { CATEGORY_BADGE_VARIANT, CATEGORY_LABELS } from '../../calendar/utils/constants';

function formatEventDate(dateStr) {
  if (!dateStr) return '';
  const todayStr = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  if (dateStr === todayStr) return 'Today';
  if (dateStr === tomorrowStr) return 'Tomorrow';

  const [y, m, d] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]}`;
}

export const UpcomingEventsCard = ({ events = [] }) => {
  const todayStr = new Date().toISOString().slice(0, 10);

  // Filter upcoming events (today onwards) and sort chronologically
  const upcomingEvents = events
    .filter((e) => e.date >= todayStr)
    .sort((a, b) => {
      const dateCmp = a.date.localeCompare(b.date);
      if (dateCmp !== 0) return dateCmp;
      return a.time.localeCompare(b.time);
    })
    .slice(0, 4);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              Schedule &amp; Timetable
            </h2>
          </div>
          <Link
            to="/calendar"
            className="text-xs text-[#4338CA] hover:underline font-semibold"
          >
            Full calendar ({events.length}) &rarr;
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">No upcoming events</p>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto">
              You have no upcoming classes, exams, or club sessions scheduled.
            </p>
            <Link
              to="/calendar"
              className="inline-block mt-2 text-xs font-semibold text-[#4338CA] hover:underline"
            >
              + Schedule an event
            </Link>
          </div>
        ) : (
          <ul className="space-y-2.5" role="list">
            {upcomingEvents.map((evt) => {
              const badgeVariant = CATEGORY_BADGE_VARIANT[evt.category] || 'default';
              const categoryLabel = CATEGORY_LABELS[evt.category] || evt.category;
              const dateLabel = formatEventDate(evt.date);
              const isToday = dateLabel === 'Today';

              return (
                <li
                  key={evt.id}
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-[#0F172A] truncate max-w-[200px] sm:max-w-xs">
                        {evt.title}
                      </span>
                      {evt.isSample && (
                        <Badge variant="info" size="sm">
                          Sample
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <Badge variant={badgeVariant} size="sm" dot>
                        {categoryLabel}
                      </Badge>
                      {evt.location && (
                        <span className="truncate max-w-[120px]">
                          📍 {evt.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-bold block ${
                        isToday ? 'text-[#4338CA]' : 'text-[#0F172A]'
                      }`}
                    >
                      {dateLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {evt.time}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Synced with local calendar</span>
        <Link to="/calendar" className="text-[#4338CA] hover:underline font-medium">
          Open Calendar View
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;

