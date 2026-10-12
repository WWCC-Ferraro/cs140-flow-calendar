// Part 2 — isLeapYear
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { isLeapYear } from '../src/dates.js';

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

// isLeapYear must return a boolean. && and || evaluate to one of their
// operands, which is not always true or false, so a near miss such as 24 is
// named as one.
function checkBoolean(year, expected, hint) {
  const call = `isLeapYear(${year})`;
  check(call, () => {
    const got = isLeapYear(year);
    if (got !== undefined && typeof got !== 'boolean') {
      assert.fail(`${call} returned ${show(got)}, which is not true or false. && and || evaluate to one of ` +
        'their operands, not always a boolean: compare with === so each side is true or false. ' +
        'See "What &&, || and ?? evaluate to".');
    }
    return got;
  }, expected, hint);
}

test('a year not divisible by 4 is not a leap year', () => {
  const hint = 'This step was written for you; check it is still in place.';
  for (const y of [2026, 2023, 2019, 1999]) checkBoolean(y, false, hint);
});

test('a year divisible by 4, and not a century, is a leap year', () => {
  const hint = 'Divisible by 4 and not divisible by 100: the second step of the rule says leap year.';
  for (const y of [2028, 2024, 1996, 2004]) checkBoolean(y, true, hint);
});

test('a century not divisible by 400 is NOT a leap year (1900, 2100)', () => {
  const hint = 'This is the century case. It is divisible by 4, but it is also divisible by 100, ' +
    'and not by 400, so it is not a leap year. "Divisible by 4" alone is the simple rule, ' +
    'and it is wrong here. Use % 100 to ask whether a year is a century. See "The if statement".';
  for (const y of [1900, 2100, 2200, 1800]) checkBoolean(y, false, hint);
});

test('a century divisible by 400 IS a leap year (2000, 2400)', () => {
  const hint = 'This is the 400 case: a century, but divisible by 400, so it is a leap year after all. ' +
    'Treating every century as "not a leap year" leaves out the rule\'s last step. ' +
    'See "The if statement".';
  for (const y of [2000, 2400, 1600]) checkBoolean(y, true, hint);
});
