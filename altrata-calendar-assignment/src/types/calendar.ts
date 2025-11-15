export interface CalendarProps {
  date: Date;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarGrid {
  weeks: CalendarDay[][];
  month: string;
  year: number;
}