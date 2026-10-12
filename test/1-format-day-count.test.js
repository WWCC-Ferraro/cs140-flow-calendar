// Part 1 — formatDayCount
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { formatDayCount } from '../src/dates.js';

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
      'starting point.)' + (hint.includes('See "') ? '' : ' See "The ternary operator".') +
      ` ${hint}`);
  }
  const both = typeof got === 'string' ? got + expected : '';
  const spaces = (both.includes(' ') ? ' (· marks a space.)' : '') + (both.includes('\n') ? ' (⏎ marks a line end.)' : '');
  assert.equal(got, expected, `${call} should be ${show(expected)}, but it returned ${show(got)}.${spaces} ${hint}`);
}

test('formatDayCount(1) is singular: "1 day"', () => {
  check('formatDayCount(1)', () => formatDayCount(1), '1 day',
    'Exactly one is "day", with no s. If you got "1 days", the condition never picks the singular: ' +
    'what does it compare n with? See "The ternary operator".');
});

test('formatDayCount of more than one is plural: "29 days"', () => {
  const hint = 'Any number but 1 is "<n> days": the number, a space, then "days". ' +
    'See "The ternary operator".';
  check('formatDayCount(29)', () => formatDayCount(29), '29 days', hint);
  check('formatDayCount(2)', () => formatDayCount(2), '2 days', hint);
  check('formatDayCount(31)', () => formatDayCount(31), '31 days', hint);
});

test('formatDayCount(0) is plural too: "0 days"', () => {
  check('formatDayCount(0)', () => formatDayCount(0), '0 days',
    'Zero is plural in English. A condition such as "more than 1" puts 0 on the singular path. ' +
    'Which numbers should take the singular path? Only one.');
});
