# Calendar dates: if, switch, the ternary operator, && and ??

Five small functions that each choose between paths, and one bug to fix. The
five functions answer these questions: is a count written "1 day" or
"29 days", is this year a leap year, what is this month called, how many days
does this month have, and does this date exist? You make the choices with the
ternary operator, with `if` and `else`, with a `switch` statement and with
`&&`. The sixth part is a function a teammate wrote, with one bug in it: you
find the bug and fix it. All of this comes from the lessons of the
*Branching* module.

Together the functions make a small toolkit. The program in `src/calendar.js`
uses all of them to print facts about a few months, years and dates. You
write the toolkit; the calendar program is already written. Each function you
finish fixes part of the calendar's output. When all six parts are done,
`npm start` prints this:

```text
=== Calendar ===
2028 is a leap year: true
2100 is a leap year: false
2000 is a leap year: true

January 2028: 31 days
February 2028: 29 days (leap year)
April 2028: 30 days
February 2026: 28 days
February 2100: 28 days
February 2000: 29 days (leap year)

On October 30, 2028: 1 day left in October
Month 13: Unknown month, 0 days

February 29, 2028 exists: true
February 29, 2026 exists: false
April 31, 2028 exists: false
December 31, 2028 exists: true

Rent: remind 3 days before
Birthday: remind 7 days before
Dentist: remind 0 days before
```

## What each part leans on

1. `formatDayCount` — *The ternary operator*
2. `isLeapYear` — *The if statement*, and *What &&, || and ?? evaluate to*
3. `monthName` — *Choosing among many paths*
4. `daysInMonth` — *Choosing among many paths*
5. `isValidDate` — *Comparing and combining*, and *What &&, || and ?? evaluate to*
6. `reminderDays`, fixing a bug — *What &&, || and ?? evaluate to*

Parts 1 to 5 are in one file, `src/dates.js`. Part 6 is in `src/reminders.js`.
Every part also leans on *Writing a function's answer*. That lesson shows
where parameters such as `month` and `year` get their values when a function
is called, and why a function that answers by calling itself with the same
values never returns an answer: it stops with a RangeError.

## Getting started

1. Open **your repository**. It is made for you: private, and named for this
   homework, the term and your username — `<term>-cs140-flow-calendar-<you>`. On
   [this homework's page](https://wwcc.dev/#/lesson/flow-calendar), type your GitHub
   username and click **Open my Codespace**. On your own computer, clone it
   with GitHub Desktop (**Code**, then **Open with GitHub Desktop**) and check
   that `node --version` prints 22 or later. The lesson *How a homework works*
   walks through both.
2. Run the calendar:

   ```sh
   npm start
   ```

   Most of the output says `undefined`. A function returns `undefined` when
   the path it took has no `return`, and none of your five functions has a
   `return` yet. That is the expected starting point.
3. Run the tests:

   ```sh
   npm test
   ```

   Almost every test fails at first. That is the starting point too, not a
   problem.

While you work on one part, run just its tests:

```sh
node --test test/2-leap-year.test.js
```

The same tests run on GitHub every time you push. The **Actions** tab shows
the result.

## Every path needs a return

A function that chooses has more than one path through it, and each path
has to reach a `return`. Here is one that chooses with `if` and `else`:

```js
export function sign(n) {
  if (n < 0) {
    return "negative";
  } else {
    return "not negative";
  }
}
```

Suppose you leave out the `else` and its `return`. Then `sign(5)` checks
`5 < 0`, which is `false`, so it skips the block and reaches the end of the
function without running a `return`. It returns `undefined`. When a test
receives `undefined`, its message names the call that returned it, such as
`sign(5)`. Follow that input through your function by hand to find the path
that has no `return`.

There is a second way to write a function that chooses. Declare a variable
with `let` before the `if`, have each branch set that variable, and write one
`return` after the `if` that returns the variable. *The if statement* shows both ways. Either way is fine here,
as long as every path through the function ends up returning a value.

Leave `export` in front of each function. `export` is what lets the tests and
the calendar use the function.

Stuck? Put `console.log(something)` inside a function, and it prints the value
of `something` each time the tests or the calendar run that line. The tests do
not look at what you print, so print as much as you like.

## The parts

The comment above each function says what the function takes and what it
returns, with examples. When a test fails, its message says what came back and what to
look at.

### Part 1 · `formatDayCount`

`formatDayCount(1)` is `"1 day"`, and `formatDayCount(29)` is `"29 days"`.
Every number except 1 takes the plural, "days", and that includes 0:
`formatDayCount(0)` is `"0 days"`. Write `formatDayCount` with the ternary
operator (`condition ? a : b`), which chooses between two values in one line.
The calendar uses `formatDayCount` for every count of days it prints.

### Part 2 · `isLeapYear`

A leap year has 366 days, with a 29th of February. The rule has three steps:

- A year divisible by 4 is a leap year.
- A century, a year divisible by 100, is an exception: it is not a leap year.
- A century that is also divisible by 400 is an exception to the exception: it
  is a leap year.

So 2028 is a leap year, 2100 is not, and 2000 is.

The first step is written for you: if the year is not divisible by 4, the
function returns `false` straight away. Only years divisible by 4 reach the
code you write, and your code applies the century rule and the 400 rule to
them. Return the boolean `true` or `false`, not some other value that
happens to be truthy: the tests check for a boolean.

### Part 3 · `monthName`

`monthName(1)` is `"January"`, and `monthName(12)` is `"December"`. Write
`monthName` with a `switch`, one `case` per month. For any other number,
`monthName` returns `"Unknown month"`. That answer goes in the `default`,
which runs when no `case` matches.

A `switch` compares its value with each `case` using `===`, so a `case` only
matches a value of the same type. `month` arrives as a number, so write each
`case` as a number: `case 1:`, not `case "1":`.

### Part 4 · `daysInMonth`

`daysInMonth(4, 2026)` is `30`. April, June, September and November have 30
days. February has 28, or 29 in a leap year. The other seven months have 31.
Write `daysInMonth` with a `switch`. Months with the same number of days can
share one `return`: stack their `case` labels one after another, with nothing
between them, and put the `return` after the last label. For a month number
outside 1 to 12, return `0` from the `default`.

For February, call your own `isLeapYear` from Part 2. Calling a different
function you wrote is fine, and it keeps the leap-year rule in one place. What
does not work is a function that calls *itself* with the same values: a call
to `daysInMonth` inside `daysInMonth` never returns an answer, and stops with
a RangeError ("Maximum call stack size exceeded").

### Part 5 · `isValidDate`

`isValidDate(29, 2, 2028)` is `true`, because 2028 is a leap year, and
`isValidDate(29, 2, 2026)` is `false`. A date exists when the month is from 1
to 12 and the day is from 1 to the number of days in that month. Each of
those is two comparisons, a lower bound and an upper one, so the whole check
is four comparisons combined with `&&`. You can write them as one expression,
or as an `if` with a `return` in each branch; either is fine.

For the number of days in the month, call your own `daysInMonth` from Part 4.
It already knows about leap years, because it calls `isLeapYear`. Calling
your own other functions is fine: each rule then lives in one place.

Watch the ends of each range. The last day of a month exists, and so does
month 12; day 0 and month 13 do not. The tests check each end.

### Part 6 · `reminderDays`: fix a teammate's bug

This part is different. You do not write a function: you find and fix a bug
in one that someone else wrote. A teammate wrote `reminderDays` in
`src/reminders.js`. It returns how many days before an event to send its
reminder. `null` or `undefined` means the person made no choice, so the
default of 7 days applies; any number they chose is used as it is, and 0
means on the day itself.

The function is complete, and one line is wrong. Run its tests:

```sh
node --test test/6-reminder-days.test.js
```

One of them fails. Read its message, work out why the line returns what it
does for that input, and fix that one line. *What &&, || and ?? evaluate to*
explains what is going on. Leave the rest of the function as it is.

## Done means

- `npm test` passes every test.
- `npm start` prints the calendar above, with no `undefined` and no `NaN` in
  it.

## Using an AI assistant

`AGENTS.md` in this repository tells AI coding assistants how this course wants
them to help: as a tutor who explains errors, asks questions and gives hints,
not by writing your answers. Most assistants read it automatically. It is in
the open, so read it too. It says what good AI help looks like.

In VS Code, in a Codespace or on your own computer, AI code suggestions are
switched off for this homework (`.vscode/settings.json`), so the code you hand
in is your own. Chat is on, and it follows `AGENTS.md`: ask it about an error,
a failing test or an idea.
