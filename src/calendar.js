// The calendar. You do not need to change anything in this file.
//
// It prints a few facts about the calendar, and every line is worked out by
// the functions you are writing in `dates.js`. Run it whenever you like:
//
//   npm start
//
// Before you finish a function, its part of the output shows `undefined` (or
// `NaN`, from arithmetic with `undefined`). `undefined` is what a function
// returns when the path it took has no `return`. Finish the function, run
// the calendar again, and that part comes right.
//
// The `import` lines bring in the functions you write in `dates.js`, and the
// one you fix in `reminders.js`.

import { formatDayCount, isLeapYear, monthName, daysInMonth, isValidDate } from './dates.js';
import { reminderDays } from './reminders.js';

// One line about one month: its name, the year, how many days it has, and a
// note when it is February in a leap year.
function describe(month, year) {
  const days = daysInMonth(month, year);
  const note = month === 2 && isLeapYear(year) ? ' (leap year)' : '';
  return monthName(month) + ' ' + year + ': ' + formatDayCount(days) + note;
}

// Whether a date someone typed exists.
function checkDate(day, month, year) {
  return monthName(month) + ' ' + day + ', ' + year + ' exists: ' + isValidDate(day, month, year);
}

// When to remind someone about an event. null means they made no choice.
function reminder(event, daysBefore) {
  return event + ': remind ' + formatDayCount(reminderDays(daysBefore)) + ' before';
}

console.log('=== Calendar ===');
console.log('2028 is a leap year: ' + isLeapYear(2028));
console.log('2100 is a leap year: ' + isLeapYear(2100));
console.log('2000 is a leap year: ' + isLeapYear(2000));
console.log('');
console.log(describe(1, 2028));
console.log(describe(2, 2028));
console.log(describe(4, 2028));
console.log(describe(2, 2026));
console.log(describe(2, 2100));
console.log(describe(2, 2000));
console.log('');

// October 30: how many days are left in the month after today?
const daysLeft = daysInMonth(10, 2028) - 30;
console.log('On October 30, 2028: ' + formatDayCount(daysLeft) + ' left in ' + monthName(10));

// A month number that was mistyped: 13 is not a month.
console.log('Month 13: ' + monthName(13) + ', ' + formatDayCount(daysInMonth(13, 2028)));
console.log('');

// Dates someone typed: do they exist?
console.log(checkDate(29, 2, 2028));
console.log(checkDate(29, 2, 2026));
console.log(checkDate(31, 4, 2028));
console.log(checkDate(31, 12, 2028));
console.log('');

// Reminders: 3 days before the rent, no choice made for the birthday, and on
// the day itself for the dentist.
console.log(reminder('Rent', 3));
console.log(reminder('Birthday', null));
console.log(reminder('Dentist', 0));
