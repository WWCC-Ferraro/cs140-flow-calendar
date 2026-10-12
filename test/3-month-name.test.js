// Part 3 — monthName
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { monthName } from '../src/dates.js';

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
      'starting point.)' + (hint.includes('See "') ? '' : ' See "Choosing among many paths".') +
      ` ${hint}`);
  }
  const both = typeof got === 'string' ? got + expected : '';
  const spaces = (both.includes(' ') ? ' (· marks a space.)' : '') + (both.includes('\n') ? ' (⏎ marks a line end.)' : '');
  assert.equal(got, expected, `${call} should be ${show(expected)}, but it returned ${show(got)}.${spaces} ${hint}`);
}

const NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

test('monthName names January, February and December', () => {
  const hint = 'If a month from 1 to 12 gave "Unknown month" or undefined, no case matched it. Check that the ' +
    'cases are numbers (case 1, not case "1"): switch compares with ===, and the month arrives as a number. ' +
    'See "Choosing among many paths".';
  check('monthName(1)', () => monthName(1), 'January', hint);
  check('monthName(2)', () => monthName(2), 'February', hint);
  check('monthName(12)', () => monthName(12), 'December', hint);
});

test('monthName names every month from 1 to 12', () => {
  const hint = 'If this gave the NEXT month\'s name, or a later one, the case ran on into the next case: ' +
    'a case with no return (or no break) falls through. Also check the spelling and capital letter. ' +
    'See "Choosing among many paths".';
  NAMES.forEach((name, i) => check(`monthName(${i + 1})`, () => monthName(i + 1), name, hint));
});

test('monthName of a number outside 1 to 12 is "Unknown month"', () => {
  const hint = 'No case matches this number, so only a default runs. A switch with no default runs ' +
    'nothing when no case matches. See "Choosing among many paths", on what the default catches.';
  for (const m of [13, 0, -1, 100]) check(`monthName(${m})`, () => monthName(m), 'Unknown month', hint);
});
