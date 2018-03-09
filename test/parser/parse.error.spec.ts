import * as test from "tape";

import {AttributeAction, ErrorToken, QueryError, Selector, TokenType} from "../../src/types";

import parser from "../../src/parser";

test("Parsing nonsense yields an error token", (t) => {
  type TestCase = [string, ErrorToken, string];
  const nonsenses: TestCase[] = [
    [
      ":#",
      {name: QueryError.parseError, type: TokenType.error, value: {
        type: TokenType.unparsed,
        value: ":#",
      }},
      "we correctly cast nonsense to parserror token",
    ],
  ];
  nonsenses.forEach(([input, error, desc]) => t.deepEqual(
    parser(input),
    [[error]],
    desc,
  ));
  t.end();
});

test("Parsing errors are added to selector", (t) => {
  type TestCase = [string, Selector, string];
  const errors: TestCase[] = [
    [
      "div < span",
      [
        {type: TokenType.tag, name: "div"},
        {name: QueryError.parentCombinator, type: TokenType.error, value: {
          type: TokenType.parent,
        }},
      ],
      "we correctly get error replacement",
    ],
    [
      ">",
      [
        {name: QueryError.leadingCombinator, type: TokenType.error, value: {
          type: TokenType.child,
        }},
      ],
      "we get leadingCombinator error before ending",
    ],
  ];
  errors.forEach(([input, selector, desc]) => t.deepEqual(
    parser(input),
    [selector],
    desc,
  ));
  t.end();
});

test("Out-of-place types are called out", (t) => {
  type TestCase = [string, Selector, string];
  const errors: TestCase[] = [
    [
      "[foo]bar",
      [
        {type: TokenType.attribute, name: "foo", action: AttributeAction.exists, value: "", ignoreCase: false},
        {name: QueryError.faultyTypePosition, type: TokenType.error, value: {
          name: "bar",
          type: TokenType.tag,
        }},
      ],
      "we correctly get error replacement",
    ],
  ];
  errors.forEach(([input, selector, desc]) => t.deepEqual(
    parser(input),
    [selector],
    desc,
  ));
  t.end();
});
