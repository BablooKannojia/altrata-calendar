import React from 'react';
import type { CalendarProps } from '../types/calendar';
import { generateCalendarGrid, DAYS_OF_WEEK } from '../utils/calendarUtils';
import { CalendarDay } from './CalendarDay';
import './Calendar.css';

export const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const calendarGrid = generateCalendarGrid(date);

  return (
    <div className="calendar" data-testid="calendar">
      {/* Month and Year Header */}
      <header className="calendar__header">
        <h2 className="calendar__title" data-testid="calendar-title">
          {calendarGrid.month} {calendarGrid.year}
        </h2>
      </header>

      {/* Days of Week Header */}
      <div className="calendar__days-header" role="row">
        {DAYS_OF_WEEK.map(dayName => (
          <div
            key={dayName}
            className="calendar__day-header"
            role="columnheader"
            aria-label={dayName}
            data-testid={`day-header-${dayName}`}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar__grid" role="grid">
        {calendarGrid.weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="calendar__week"
            role="row"
            data-testid={`calendar-week-${weekIndex}`}
          >
            {week.map((day, dayIndex) => (
              <CalendarDay
                key={`${weekIndex}-${dayIndex}`}
                day={day}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};