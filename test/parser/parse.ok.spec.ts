import * as test from "tape";

import {AttributeAction, ErrorToken, QueryError, Selector, TokenType, WipType} from "../../src/types";

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
