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

test("Parser catches in progress stuff", (t) => {
  type TestCase = [string, Selector, string];
  const wips: TestCase[] = [
    [
      "div.", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.wip, value: ".", name: WipType.class},
      ], "we handle WIP classes",
    ],
    [
      "div#", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.wip, value: "#", name: WipType.id},
      ], "we handle WIP id:s",
    ],
    [
      "div:", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.wip, value: ":", name: WipType.pseudo},
      ], "we handle WIP pseudos",
    ],
    [
      "div:foo(", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.wip, value: ":foo(", name: WipType.pseudoArg},
      ], "we handle WIP pseudo args",
    ],
    [
      "div .", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.descendant},
        {type: TokenType.wip, value: ".", name: WipType.class},
      ], "we handle descendant combinator before the wip part",
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

test("We get correct WIP after ending combinator", (t) => {
  type TestCase = [string, Selector, string];
  const wips: TestCase[] = [
    [
      "div > .",
      [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.child},
        {type: TokenType.wip, value: ".", name: WipType.class},
      ],
      "WIP superseeds endingComb error",
    ],
  ];
  wips.forEach(([input, selector, desc]) => t.deepEqual(
    parser(input),
    [selector],
    desc,
  ));
  t.end();
});

test("We add WIP after ending combinator if nothing else typed", (t) => {
  type TestCase = [string, Selector, string];
  const wips: TestCase[] = [
    [
      "div > ",
      [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.child},
        {type: TokenType.wip, value: "", name: WipType.followComb},
      ],
      "WIP added afer ending combinator",
    ],
  ];
  wips.forEach(([input, selector, desc]) => t.deepEqual(
    parser(input),
    [selector],
    desc,
  ));
  t.end();
});
