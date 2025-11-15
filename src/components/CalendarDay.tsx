import React from 'react';
import type { CalendarDay as CalendarDayType } from '../types/calendar';

interface CalendarDayProps {
  day: CalendarDayType;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ day }) => {
  const getDayClassNames = (): string => {
    const classes = ['calendar-day'];
    
    if (!day.isCurrentMonth) {
      classes.push('calendar-day--other-month');
    }
    
    if (day.isToday) {
      classes.push('calendar-day--today');
    }
    
    if (day.isSelected) {
      classes.push('calendar-day--selected');
    }
    
    return classes.join(' ');
  };

  return (
    <div
      className={getDayClassNames()}
      role="gridcell"
      aria-label={day.date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      aria-selected={day.isSelected}
      data-testid={`calendar-day-${day.date.getDate()}`}
      data-current-month={day.isCurrentMonth}
      data-selected={day.isSelected}
      data-today={day.isToday}
    >
      <span className="calendar-day__number">
        {day.date.getDate()}
      </span>
    </div>
  );
};