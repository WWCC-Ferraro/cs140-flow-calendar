// Reminders
//
// A teammate wrote this function for the calendar, and it is finished except
// for one line, which has a bug. Part 6 is to find that bug and fix it: the
// tests for part 6 fail until you do. Change only the line with the bug.
//
// `export` lets the tests and the calendar use the function. Leave it in
// place.

/**
 * Part 6. Return how many days before an event to send its reminder.
 *
 * `daysBefore` is the number of days the person chose. `null` or `undefined`
 * means they made no choice, so the reminder uses the default of 7 days.
 * Any number they chose is used as it is, and that includes 0, which means
 * "remind me on the day itself".
 *
 *   reminderDays(3)          -> 3
 *   reminderDays(0)          -> 0   (on the day itself)
 *   reminderDays(null)       -> 7   (no choice made: the default)
 *   reminderDays(undefined)  -> 7   (no choice made: the default)
 */
export function reminderDays(daysBefore) {
  return daysBefore || 7;
}
