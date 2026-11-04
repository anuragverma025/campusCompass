import React from 'react';
import { Link } from 'react-router-dom';

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

  const upcomingEvents = events
    .filter((e) => e.date >= todayStr)
    .sort((a, b) => {
      const dateCmp = a.date.localeCompare(b.date);
      if (dateCmp !== 0) return dateCmp;
      return a.time.localeCompare(b.time);
    })
    .slice(0, 4);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Upcoming Schedule ({upcomingEvents.length})
          </h2>
          <Link
            to="/calendar"
            className="text-xs text-[#4338CA] hover:underline font-medium"
          >
            Full calendar &rarr;
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="py-8 text-center space-y-1.5">
            <p className="text-sm font-medium text-[#0F172A]">No upcoming events</p>
            <p className="text-xs text-[#64748B]">You have no lectures or exams scheduled.</p>
            <Link to="/calendar" className="inline-block mt-1 text-xs text-[#4338CA] hover:underline font-medium">
              + Schedule an event
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100" role="list">
            {upcomingEvents.map((evt) => {
              const dateLabel = formatEventDate(evt.date);
              const isToday = dateLabel === 'Today';

              return (
                <li
                  key={evt.id}
                  className="py-2.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0F172A] truncate">
                      {evt.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#64748B]">
                      <span>{evt.category}</span>
                      {evt.location && (
                        <span>&bull; {evt.location}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-semibold block ${
                        isToday ? 'text-[#4338CA]' : 'text-[#0F172A]'
                      }`}
                    >
                      {dateLabel}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">
                      {evt.time}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
        <span>Synced with calendar</span>
        <Link to="/calendar" className="text-[#4338CA] hover:underline font-medium">
          Open calendar
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
