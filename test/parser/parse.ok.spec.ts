import * as test from "tape";

import {AttributeAction, Selector, TokenType} from "../../src/types";

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
    [
      "div[foo*=bar]",
      [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.attribute, name: "foo", action: AttributeAction.any, value: "bar", ignoreCase: false},
      ],
      "we can parse an action matching token correctly",
    ],
    [
      "div[foo~=bar]",
      [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.attribute, name: "foo", action: AttributeAction.element, value: "bar", ignoreCase: false},
      ],
      "we can parse an action matching word correctly",
    ],
  ];
  selectors.forEach(([input, selector, description]) => t.deepEqual(
    parser(input),
    [selector],
    description,
  ));
  t.end();
});
