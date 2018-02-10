import * as test from "tape";

import {QueryError} from "../../src/types";
import validator from "../../src/validator";

test(`Experimental combinators aren't allowed`, (t) => {
  type TestCase = [string, QueryError, number[]];
  const experimental: TestCase[] = [
    ["div < span > p", QueryError.parentCombinator, [1]],
  ];
  experimental.forEach(([query, error, position]) => t.deepEqual(
    validator(query)[0],
    error,
    `Query ${query} gives experimental combinator error for position ${position}`,
  ));
  t.end();
});

test(`Adjacent combinators aren't allowed`, (t) => {
  type TestCase = [string, number[]];
  const adjacent: TestCase[] = [
    ["table div > + span", [4]],
    ["div + ~ span", [2]],
  ];
  adjacent.forEach(([query, position]) => t.deepEqual(
    validator(query)[0],
    QueryError.adjacentCombinators,
    `Query ${query} gives adjacent combinator error for position ${position}`,
  ));
  t.end();
});

test(`Combinators are not allowed at end of queries`, (t) => {
  type TestCase = [string, number[]];
  const ending: TestCase[] = [
    ["table div >", [3]],
    ["span +", [1]],
  ];
  ending.forEach(([query, position]) => t.deepEqual(
    validator(query)[0],
    QueryError.endingCombinator,
    `Query ${query} gives ending combinator error for position ${position}`,
  ));
  t.end();
});

test(`Combinators are not allowed at beginning of queries`, (t) => {
  type TestCase = [string, number[]];
  const ending: TestCase[] = [
    ["> table div", [0]],
    ["~ span", [0]],
  ];
  ending.forEach(([query, position]) => t.deepEqual(
    validator(query)[0],
    QueryError.leadingCombinator,
    `Query ${query} gives leading combinator error for position ${position}`,
  ));
  t.end();
});
