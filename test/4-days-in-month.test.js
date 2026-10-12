// Part 4 — daysInMonth
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { daysInMonth } from '../src/dates.js';

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

test('April, June, September and November have 30 days', () => {
  const hint = 'These four share one answer: list their cases one after another, then one return. ' +
    'If you got 28, 29 or 31, the case ran on into the next case: a case with no return (or no break) ' +
    'falls through. See "Choosing among many paths".';
  for (const m of [4, 6, 9, 11]) check(`daysInMonth(${m}, 2026)`, () => daysInMonth(m, 2026), 30, hint);
});

test('the seven other months, except February, have 31 days', () => {
  const hint = 'Seven months share this answer. If one gave 0, it reached the default: is its case listed? ' +
    'See "Choosing among many paths".';
  for (const m of [1, 3, 5, 7, 8, 10, 12]) check(`daysInMonth(${m}, 2026)`, () => daysInMonth(m, 2026), 31, hint);
});

test('February has 28 days in a year that is not a leap year', () => {
  const hint = 'February\'s answer depends on the year: call your isLeapYear from part 2 to choose. ' +
    'If you got 30 or 31, February\'s case fell through into the next one.';
  check('daysInMonth(2, 2026)', () => daysInMonth(2, 2026), 28, hint);
  check('daysInMonth(2, 2023)', () => daysInMonth(2, 2023), 28, hint);
});

test('February has 29 days in a leap year', () => {
  const hint = 'February\'s answer depends on the year: call your isLeapYear from part 2 to choose. ' +
    'Make part 2\'s tests pass first; this one leans on it.';
  check('daysInMonth(2, 2028)', () => daysInMonth(2, 2028), 29, hint);
  check('daysInMonth(2, 2024)', () => daysInMonth(2, 2024), 29, hint);
});

test('February follows the full leap-year rule: 2100 has 28, 2000 has 29', () => {
  const hint = 'The century case and the 400 case. If part 2 passes and this fails, daysInMonth is ' +
    'working out leap years its own way: call isLeapYear instead, so the rule lives in one place. ' +
    'Calling another function you wrote is fine.';
  check('daysInMonth(2, 2100)', () => daysInMonth(2, 2100), 28, hint);
  check('daysInMonth(2, 2000)', () => daysInMonth(2, 2000), 29, hint);
});

test('a month outside 1 to 12 has 0 days', () => {
  const hint = 'No case matches, so only a default runs: it should return 0. A switch with no default ' +
    'runs nothing when no case matches. See "Choosing among many paths", on what the default catches.';
  for (const m of [13, 0, -2]) check(`daysInMonth(${m}, 2026)`, () => daysInMonth(m, 2026), 0, hint);
});
