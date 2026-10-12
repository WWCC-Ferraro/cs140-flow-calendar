// The calendar's toolkit
//
// Five functions that each choose a path. The calendar in `calendar.js` uses
// every one of them, so each one you finish fixes a line of what it prints.
// Part 6 is in `reminders.js`.
//
// For each function, write your answer where it says TODO. Every path through
// a function needs its own `return`: a path without one returns
// `undefined`, and the tests will tell you which input took it.
//
// `export` lets the tests and the calendar use each function. Leave it in
// place.

/**
 * Part 1. Return how many days `n` is, as words: "1 day" when `n` is
 * exactly 1, and "<n> days" for any other number, including 0.
 *
 * Use the ternary operator (`condition ? a : b`), officially the conditional
 * operator: it chooses between two values.
 *
 *   formatDayCount(1)   -> "1 day"
 *   formatDayCount(29)  -> "29 days"
 *   formatDayCount(0)   -> "0 days"
 */
export function formatDayCount(n) {
  // TODO: put your code here
}

/**
 * Part 2. Return true if `year` is a leap year, and false if it is not.
 *
 * The rule has three steps:
 *   - A year divisible by 4 is a leap year,
 *   - except a century (a year divisible by 100), which is not,
 *   - unless it is also divisible by 400, which is.
 *
 *   isLeapYear(2026)  -> false   (not divisible by 4)
 *   isLeapYear(2028)  -> true    (divisible by 4, not a century)
 *   isLeapYear(2100)  -> false   (a century)
 *   isLeapYear(2000)  -> true    (a century, but divisible by 400)
 *
 * The first step, divisible by 4, is written for you below. Write the
 * century step and the 400 step.
 */
export function isLeapYear(year) {
  const divisibleBy4 = year % 4 === 0;
  if (!divisibleBy4) {
    return false;            // not divisible by 4: never a leap year
  }

  // TODO: put your code here
  // Every year that reaches this line is divisible by 4. Is it a century?
  // And if it is, is it divisible by 400?
}

/**
 * Part 3. Return the English name of month number `month`, where 1 is
 * "January" and 12 is "December". For any other number, return
 * "Unknown month".
 *
 * Use a `switch` with a `default`.
 *
 *   monthName(1)   -> "January"
 *   monthName(12)  -> "December"
 *   monthName(13)  -> "Unknown month"
 */
export function monthName(month) {
  // TODO: put your code here
}

/**
 * Part 4. Return how many days month number `month` has in `year`, as a
 * number. For a month outside 1 to 12, return 0.
 *
 *   April, June, September and November have 30.
 *   February has 29 in a leap year and 28 in any other year.
 *   The other seven months have 31.
 *
 * Use a `switch`. Months with the same number of days can share one
 * `return` by stacking their `case` labels one after another. For February,
 * call your own `isLeapYear` from part 2. Calling a different function you
 * wrote is fine. Calling `daysInMonth` from inside `daysInMonth` is not: it
 * never returns an answer, and stops with a RangeError ("Maximum call stack
 * size exceeded").
 *
 *   daysInMonth(4, 2026)   -> 30
 *   daysInMonth(2, 2026)   -> 28
 *   daysInMonth(2, 2028)   -> 29
 *   daysInMonth(1, 2026)   -> 31
 *   daysInMonth(13, 2026)  -> 0
 */
export function daysInMonth(month, year) {
  // TODO: put your code here
}

/**
 * Part 5. Return true if the date `day`, `month`, `year` exists, and false
 * if it does not. A date exists when both of these hold:
 *   - `month` is from 1 to 12, and
 *   - `day` is from 1 to the number of days in that month.
 *
 * Combine the conditions with `&&`, in one expression or in an `if` with a
 * `return` in each branch; either is fine. For the number of days in the
 * month, call your own `daysInMonth` from part 4, which calls your
 * `isLeapYear`. Calling your own other functions is fine: it keeps each rule
 * in one place.
 *
 *   isValidDate(29, 2, 2028)   -> true    (2028 is a leap year)
 *   isValidDate(29, 2, 2026)   -> false   (2026 is not)
 *   isValidDate(31, 4, 2026)   -> false   (April has 30 days)
 *   isValidDate(0, 1, 2026)    -> false   (there is no day 0)
 *   isValidDate(1, 13, 2026)   -> false   (there is no month 13)
 */
export function isValidDate(day, month, year) {
  // TODO: put your code here
}
