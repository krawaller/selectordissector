import * as test from "tape";

import {Path, QueryError} from "../../src/types";
import validator from "../../src/validator";

test(`missing argument parens are called out`, (t) => {
  type TestCase = [string, Path, string];
  const missing: TestCase[] = [
    ["div p span:nth-of-type", [5], "nth-of-type needs parens"],
  ];
  missing.forEach(([query, position, description]) => t.deepEqual(
    validator(query)[0],
    QueryError.missingParens,
    description,
  ));
  t.end();
});

test(`extraneous argument parens are called out`, (t) => {
  type TestCase = [string, Path, string];
  const extraneous: TestCase[] = [
    ["div p span:last-child()", [5], ":last-child doesnt need parens"],
  ];
  extraneous.forEach(([query, position, description]) => t.deepEqual(
    validator(query)[0],
    QueryError.extraneousParens,
    description,
  ));
  t.end();
});

test(`nth-of-type data must be correct`, (t) => {
  type TestCase = [string, Path, string];
  const nthCases: TestCase[] = [
    ["div :nth-of-type(foo)", [2], "we get error when we have nonsense data"],
    [":nth-of-type(0)", [0], "we get error when we have 0 as data"],
  ];
  nthCases.forEach(([query, position, description]) => t.deepEqual(
    validator(query)[0],
    QueryError.faultyFormula,
    description,
  ));
  t.end();
});

test(`unrecognized pseudo selectors are called out`, (t) => {
  type TestCase = [string, Path, string];
  const nthCases: TestCase[] = [
    ["div p span:foo", [5], "unknown pseudo foo is correctly called out"],
    ["div :bar", [2], "unknown pseudo bar is correctly called out"],
    [":baz", [0], "unknown pseudo baz is correctly called out"],
  ];
  nthCases.forEach(([query, position, description]) => t.deepEqual(
    validator(query)[0],
    QueryError.unknownPseudoSelector,
    description,
  ));
  t.end();
});

test(`erroneous pseudo formulas are called out`, (t) => {
  type TestCase = [string, Path, string];
  const weirdFormulas: TestCase[] = [
    // TODO - add nth-of-type?
    ["div span:nth-child(foobar)", [3], 'erroneous formula "foobar" for nth-child correctly called out'],
  ];
  weirdFormulas.forEach(([query, position, description]) => t.deepEqual(
    validator(query)[0],
    QueryError.faultyFormula,
    description,
  ));
  t.end();
});
