import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { CATEGORY_BADGE_VARIANT } from '../utils/constants';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarMonthGrid = ({ events = [], selectedDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // First day of current month (0 = Sun, 1 = Mon, ...)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onSelectDate?.(today.toISOString().slice(0, 10));
  };

  // Group events by date string (YYYY-MM-DD)
  const eventsByDate = events.reduce((acc, evt) => {
    if (!acc[evt.date]) acc[evt.date] = [];
    acc[evt.date].push(evt);
    return acc;
  }, {});

  const todayStr = new Date().toISOString().slice(0, 10);

  // Generate calendar cells (prev month overflow + current month + next month overflow)
  const calendarCells = [];

  // Prev month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateStr: null,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dateStr,
      events: eventsByDate[dateStr] || [],
    });
  }

  // Next month padding to complete 35 or 42 cells (multiple of 7)
  const totalCells = Math.ceil(calendarCells.length / 7) * 7;
  const nextMonthPadding = totalCells - calendarCells.length;
  for (let n = 1; n <= nextMonthPadding; n++) {
    calendarCells.push({
      day: n,
      isCurrentMonth: false,
      dateStr: null,
    });
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Month Header & Controls */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
            {monthName}
          </h2>
          {selectedDate && (
            <button
              type="button"
              onClick={() => onSelectDate?.(null)}
              className="text-xs text-[#4338CA] hover:underline font-medium"
            >
              (Clear date selection)
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="p-1.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-1.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-[11px] sm:text-xs font-semibold text-slate-400 py-1 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((cell, idx) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={`pad-${idx}`}
                className="h-14 sm:h-16 p-1 text-slate-300 text-xs rounded-lg flex flex-col items-center justify-start opacity-40 select-none"
              >
                <span>{cell.day}</span>
              </div>
            );
          }

          const isToday = cell.dateStr === todayStr;
          const isSelected = cell.dateStr === selectedDate;
          const hasEvents = cell.events && cell.events.length > 0;

          return (
            <button
              key={cell.dateStr}
              type="button"
              onClick={() => {
                if (isSelected) {
                  onSelectDate?.(null); // toggle off
                } else {
                  onSelectDate?.(cell.dateStr);
                }
              }}
              className={`h-14 sm:h-16 p-1 text-left rounded-xl transition-all duration-150 flex flex-col justify-between border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]
                ${isSelected
                  ? 'border-[#4338CA] bg-[#EEF2FF] shadow-xs'
                  : isToday
                  ? 'border-[#C7D2FE] bg-white font-bold'
                  : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                }
              `}
              aria-label={`${cell.dateStr}: ${hasEvents ? `${cell.events.length} event(s)` : 'no events'}`}
            >
              <div className="flex items-center w-full px-1">
                <span
                  className={`text-xs inline-flex items-center justify-center w-5 h-5 rounded-full
                    ${isToday && !isSelected ? 'bg-[#4338CA] text-white font-bold' : ''}
                    ${isSelected ? 'font-bold text-[#4338CA]' : 'text-slate-700'}
                  `}
                >
                  {cell.day}
                </span>





              </div>

              {/* Event category indicator dots */}
              <div className="flex items-center justify-between w-full px-1 pb-0.5">
                <div className="flex items-center gap-1 overflow-hidden">
                {hasEvents &&
                  cell.events.slice(0, 3).map((evt, eIdx) => {
                    const dotColors = {
                      academic: 'bg-[#4338CA]',
                      club: 'bg-[#0369A1]',
                      personal: 'bg-[#15803D]',
                      placement: 'bg-[#B45309]',
                    };
                    return (
                      <span
                        key={eIdx}
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[evt.category] || 'bg-slate-400'}`}
                        title={evt.title}
                      />
                    );
                  })}
                  {cell.events?.length > 3 && (
                    <span className="text-[9px] text-slate-400 font-semibold leading-none">+</span>
                  )}
                </div>

                {hasEvents && (
                  <span className="text-[10px] font-medium text-slate-400 leading-none">
                    {cell.events.length}
                  </span>
                )}


              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonthGrid;

