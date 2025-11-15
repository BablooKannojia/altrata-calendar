import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Calendar } from '../Calendar';
import { generateCalendarGrid, isSameDay } from '../../utils/calendarUtils';

describe('Calendar Component', () => {
  test('renders correct month and year for given date', () => {
    const testDate = new Date('2024-01-15');
    render(<Calendar date={testDate} />);
    
    expect(screen.getByTestId('calendar-title')).toHaveTextContent('January 2024');
  });

  test('renders all days of the week headers', () => {
    const testDate = new Date('2024-01-15');
    render(<Calendar date={testDate} />);
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      expect(screen.getByTestId(`day-header-${day}`)).toBeInTheDocument();
    });
  });

  test('highlights the selected date correctly', () => {
    const selectedDate = new Date('2024-01-15');
    render(<Calendar date={selectedDate} />);
    
    const selectedDay = screen.getByTestId('calendar-day-15');
    expect(selectedDay).toHaveAttribute('data-selected', 'true');
    expect(selectedDay).toHaveClass('calendar-day--selected');
  });

  test('shows correct number of weeks for February 2023 (non-leap year)', () => {
    const febDate = new Date('2023-02-15');
    render(<Calendar date={febDate} />);
    
    const weeks = screen.getAllByTestId(/calendar-week-/);
    expect(weeks).toHaveLength(5);
  });

  test('shows correct number of weeks for February 2024 (leap year)', () => {
    const leapFebDate = new Date('2024-02-15');
    render(<Calendar date={leapFebDate} />);
    
    const weeks = screen.getAllByTestId(/calendar-week-/);
    expect(weeks).toHaveLength(5);
  });

  test('includes days from previous and next months to complete calendar', () => {
    const date = new Date('2024-03-01'); // Starts on Friday
    render(<Calendar date={date} />);
    
    const febDays = screen.getAllByText('29');
    expect(febDays.length).toBeGreaterThan(0);
    
    // Should include April dates
    const aprilDays = screen.getAllByText('1');
    expect(aprilDays.length).toBeGreaterThan(0);
  });

  // Test 6: Marks today correctly
  test('marks today correctly when provided date includes today', () => {
    const today = new Date();
    render(<Calendar date={today} />);
    
    const todayElement = screen.getByTestId(`calendar-day-${today.getDate()}`);
    expect(todayElement).toHaveAttribute('data-today', 'true');
    expect(todayElement).toHaveClass('calendar-day--today');
  });

  test('applies correct classes for current month vs other months', () => {
    const date = new Date('2024-01-15');
    render(<Calendar date={date} />);
    
    const currentMonthDays = screen.getAllByTestId(/calendar-day-/);
    
    const currentMonthCount = currentMonthDays.filter(day => 
      day.getAttribute('data-current-month') === 'true'
    ).length;
    
    const otherMonthCount = currentMonthDays.filter(day => 
      day.getAttribute('data-current-month') === 'false'
    ).length;
    
    expect(currentMonthCount).toBeGreaterThan(0);
    expect(otherMonthCount).toBeGreaterThan(0);
  });
});

describe('Calendar Utilities', () => {
  test('isSameDay correctly identifies same days', () => {
    const date1 = new Date('2024-01-15T10:00:00');
    const date2 = new Date('2024-01-15T15:30:00');
    expect(isSameDay(date1, date2)).toBe(true);
  });

  test('isSameDay correctly identifies different days', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-01-16');
    expect(isSameDay(date1, date2)).toBe(false);
  });

  test('generateCalendarGrid returns correct structure', () => {
    const date = new Date('2024-03-15');
    const grid = generateCalendarGrid(date);
    
    expect(grid.month).toBe('March');
    expect(grid.year).toBe(2024);
    expect(grid.weeks).toHaveLength(5);
    
    grid.weeks.forEach(week => {
      expect(week).toHaveLength(7);
    });
    
    const selectedDay = grid.weeks.flat().find(day => day.isSelected);
    expect(selectedDay).toBeDefined();
    expect(selectedDay?.date.getDate()).toBe(15);
  });
});