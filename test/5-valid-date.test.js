// Part 5 — isValidDate
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { isValidDate } from '../src/dates.js';

// Shows a value as the message prints it. In a string, a space shows as · and
// a line end as ⏎, so a missing or extra space is visible.
const show = (v) => typeof v === 'string'
  ? '"' + v.replaceAll(' ', '·').replaceAll('\n', '⏎') + '"'
  : inspect(v);

// Runs one call and compares what came back. A function that calls itself
// (RangeError) or a path with no return (undefined) gets its own message.
function check(call, run, expected, hint) {
  let got;
  try {
    got = run();
  } catch (err) {
    if (err instanceof RangeError) {
      assert.fail(`${call} stopped with a RangeError ("Maximum call stack size exceeded"). ` +
        'A function is calling itself, so each call starts another one before it can return, and none of ' +
        'them ever returns an answer: JavaScript stops when it runs out of room for calls. ' +
        'Look for the function\'s own name inside its body. Calling a DIFFERENT function you wrote is fine, ' +
        'as daysInMonth calls isLeapYear. See "Writing a function\'s answer".');
    }
    throw err;
  }
  if (got === undefined) {
    assert.fail(`${call} returned undefined: the path it took through your code has no return. ` +
      `Follow ${call} through the function line by line: which branch does it take, and where is that ` +
      'branch\'s return? Every path needs one. (If you have not written this function yet, that is the ' +
      'starting point.)' + (hint.includes('See "') ? '' : ' See "The if statement".') +
      ` ${hint}`);
  }
  const both = typeof got === 'string' ? got + expected : '';
  const spaces = (both.includes(' ') ? ' (· marks a space.)' : '') + (both.includes('\n') ? ' (⏎ marks a line end.)' : '');
  assert.equal(got, expected, `${call} should be ${show(expected)}, but it returned ${show(got)}.${spaces} ${hint}`);
}

// isValidDate must return a boolean, so a value that is merely truthy or
// falsy is named as one.
function checkDate(day, month, year, expected, hint) {
  const call = `isValidDate(${day}, ${month}, ${year})`;
  check(call, () => {
    const got = isValidDate(day, month, year);
    if (got !== undefined && typeof got !== 'boolean') {
      assert.fail(`${call} returned ${show(got)}, which is not true or false. && and || evaluate to one of ` +
        'their operands, not always a boolean: make each side a comparison, so each is true or false. ' +
        'See "What &&, || and ?? evaluate to".');
    }
    return got;
  }, expected, hint);
}

test('ordinary dates exist', () => {
  const hint = 'A month from 1 to 12 and a day from 1 to that month\'s length is a date that exists. ' +
    'See "Comparing and combining".';
  checkDate(15, 6, 2026, true, hint);
  checkDate(1, 1, 2026, true, hint);
});

test('the last day of a month exists: 31 January, 30 April, 28 February 2026', () => {
  const hint = 'The last day of the month is a real day. If this returned false, the comparison with ' +
    'daysInMonth leaves out the last day: an off-by-one. Is the last day allowed by < or by <=? ' +
    'See "Comparing and combining".';
  checkDate(31, 1, 2026, true, hint);
  checkDate(30, 4, 2026, true, hint);
  checkDate(28, 2, 2026, true, hint);
});

test('a day past the end of the month does not exist: 31 April, 32 January', () => {
  const hint = 'April has 30 days, January 31. Compare the day with daysInMonth(month, year) from part 4, ' +
    'rather than with a fixed number such as 31. Calling your own other functions is fine.';
  checkDate(31, 4, 2026, false, hint);
  checkDate(32, 1, 2026, false, hint);
});

test('29 February exists only in a leap year: 2028 and 2000 yes, 2026 and 2100 no', () => {
  const hint = 'Whether 29 February exists depends on the year. Call daysInMonth from part 4, which calls ' +
    'isLeapYear, rather than working February out again here. If parts 2 and 4 pass and this fails, ' +
    'either isValidDate is not using daysInMonth, or its comparison leaves out the last day of the month: ' +
    'in 2028, 29 is the last day of February.';
  checkDate(29, 2, 2028, true, hint);
  checkDate(29, 2, 2000, true, hint);
  checkDate(29, 2, 2026, false, hint);
  checkDate(29, 2, 2100, false, hint);
});

test('day 0 and negative days do not exist', () => {
  const hint = 'Days start at 1. Checking only the upper end lets 0 and negative days through: ' +
    'the day needs a lower bound as well as an upper one, combined with &&. ' +
    'See "Comparing and combining".';
  checkDate(0, 1, 2026, false, hint);
  checkDate(-3, 5, 2026, false, hint);
});

test('December, month 12, exists', () => {
  checkDate(31, 12, 2026, true,
    'Months run from 1 to 12, and 12 is one of them. If December returned false, the check on the month ' +
    'leaves out 12: an off-by-one. Is 12 allowed by < or by <=? See "Comparing and combining".');
});

test('month 0 and month 13 do not exist', () => {
  const hint = 'Months run from 1 to 12, so the month needs a lower bound and an upper one. ' +
    'See "Comparing and combining".';
  checkDate(1, 13, 2026, false, hint);
  checkDate(1, 0, 2026, false, hint);
});
