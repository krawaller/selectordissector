import * as test from "tape";

import {AttributeAction, ErrorToken, QueryError, Selector, TokenType} from "../../src/types";

import parser from "../../src/parser";

test("Parser yields correct Selector", (t) => {
  type TestCase = [string, Selector, string];
  const selectors: TestCase[] = [
    [
      "div.foo",
      [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.attribute, name: "class", action: AttributeAction.element, value: "foo", ignoreCase: false},
      ],
      "we can parse a tag name and a class correctly",
    ],
  ];
  selectors.forEach(([input, selector, description]) => t.deepEqual(
    parser(input),
    [selector],
    description,
  ));
  t.end();
});

test("Parser catches in progress stuff", (t) => {
  type TestCase = [string, Selector, string];
  const wips: TestCase[] = [
    [
      "div.", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.wip, value: "."},
      ], "we handle WIP classes",
    ],
    [
      "div#", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.wip, value: "#"},
      ], "we handle WIP id:s",
    ],
  ];
  wips.forEach(([input, selector, description]) => t.deepEqual(
    parser(input),
    [selector],
    description,
  ));
  t.end();
});

test("Parsing nonsense yields an error token", (t) => {
  type TestCase = [string, ErrorToken, string];
  const nonsenses: TestCase[] = [
    [
      ":#",
      {type: TokenType.error, name: QueryError.parseError, value: ":#"},
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
