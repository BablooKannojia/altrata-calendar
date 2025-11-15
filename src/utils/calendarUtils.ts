import type { CalendarGrid, CalendarDay, DayOfWeek } from '../types/calendar';

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const generateCalendarGrid = (selectedDate: Date): CalendarGrid => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  // const lastDayOfMonth = new Date(year, month, getDaysInMonth(year, month));
  
  const startDay = firstDayOfMonth.getDay() as DayOfWeek;
  const daysInMonth = getDaysInMonth(year, month);
  
  const weeks: CalendarDay[][] = [];
  let currentWeek: CalendarDay[] = [];
  
  const daysFromPrevMonth = startDay;
  const prevMonthLastDay = getDaysInMonth(year, month - 1);
  
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i);
    currentWeek.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: false,
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    currentWeek.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate),
    });
    
    // Start new week when current week is full
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Add days from next month to complete the last week
  if (currentWeek.length > 0) {
    const daysNeeded = 7 - currentWeek.length;
    for (let day = 1; day <= daysNeeded; day++) {
      const date = new Date(year, month + 1, day);
      currentWeek.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: false,
      });
    }
    weeks.push(currentWeek);
  }
  
  return {
    weeks,
    month: MONTHS[month],
    year,
  };
};