// Part 6 — reminderDays, the teammate's function with one bug
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { reminderDays } from '../src/reminders.js';

// Runs one call and compares what came back. Here undefined can be a wrong
// answer rather than a missing return, since the function is already written,
// so it is compared like any other value.
function check(call, run, expected, hint) {
  const got = run();
  assert.equal(got, expected, `${call} should be ${inspect(expected)}, but it returned ${inspect(got)}. ${hint}`);
}

test('a reminder of 0 days stays 0: on the day itself', () => {
  check('reminderDays(0)', () => reminderDays(0), 0,
    '0 is a real choice here, "remind me on the day itself", but the function treats it as no choice ' +
    'and uses the default. 0 is falsy: which values does the operator on the return line fall back ' +
    'for? The default should apply only for null and undefined. Fix that one line. ' +
    'See "What &&, || and ?? evaluate to".');
});

test('no choice, null, uses the default of 7', () => {
  check('reminderDays(null)', () => reminderDays(null), 7,
    'null means the person made no choice, so the default of 7 applies. If you changed the return line, ' +
    'check that it still falls back for null. See "What &&, || and ?? evaluate to".');
});

test('no choice, undefined, uses the default of 7', () => {
  const hint = 'undefined, like null, means no choice was made, so the default of 7 applies. A check for ' +
    'null alone lets undefined through: the line has to fall back for both. ' +
    'See "What &&, || and ?? evaluate to".';
  check('reminderDays(undefined)', () => reminderDays(undefined), 7, hint);
  check('reminderDays()', () => reminderDays(), 7, hint);
});

test('a number of days that was chosen is used as it is', () => {
  const hint = 'A chosen number of days is the answer as it is. If you changed the return line, check that ' +
    'it returns daysBefore whenever daysBefore is a number. See "What &&, || and ?? evaluate to".';
  check('reminderDays(3)', () => reminderDays(3), 3, hint);
  check('reminderDays(14)', () => reminderDays(14), 14, hint);
});
