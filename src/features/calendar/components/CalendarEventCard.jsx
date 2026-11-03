import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CATEGORY_BADGE_VARIANT, CATEGORY_LABELS } from '../utils/constants';

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
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

export const CalendarEventCard = ({ event, onEdit, onDelete }) => {
  const badgeVariant = CATEGORY_BADGE_VARIANT[event.category] || 'default';
  const categoryLabel = CATEGORY_LABELS[event.category] || event.category;

  const dateLabel = formatEventDate(event.date);
  const isToday = dateLabel === 'Today';

  return (
    <div
      className={`group bg-white border rounded-xl p-4 sm:p-5 transition-all duration-150 hover:shadow-sm flex flex-col justify-between
        ${isToday ? 'border-l-4 border-l-[#4338CA] border-[#E2E8F0]' : 'border-[#E2E8F0]'}
      `}
    >
      <div>
        {/* Top Header: Category, Date, Sample Tag */}
        <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant={badgeVariant} size="sm" dot>
              {categoryLabel}
            </Badge>

            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md
                ${isToday ? 'bg-[#EEF2FF] text-[#4338CA]' : 'bg-slate-100 text-slate-700'}
              `}
            >
              {dateLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {event.isSample && (
              <Badge variant="info" size="sm">
                Sample
              </Badge>
            )}
            <span className="text-xs text-slate-500 font-medium">
              {event.time} {event.endTime ? `– ${event.endTime}` : ''}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug mb-1.5 group-hover:text-[#4338CA] transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-3">
            {event.description}
          </p>
        )}

        {/* Location if present */}
        {event.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <svg
              className="w-3.5 h-3.5 text-slate-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 mt-2 sm:opacity-90 group-hover:opacity-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(event)}
          aria-label={`Edit ${event.title}`}
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
          onClick={() => onDelete(event)}
          aria-label={`Delete ${event.title}`}
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
  );
};

export default CalendarEventCard;

