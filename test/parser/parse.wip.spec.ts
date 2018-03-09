import * as test from "tape";

import {Selector, TokenType, WipType} from "../../src/types";

import parser from "../../src/parser";

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
      "div :foo(", [
        {type: TokenType.tag, name: "div"},
        {type: TokenType.descendant},
        {type: TokenType.wip, value: ":foo(", name: WipType.pseudoArg},
      ], "we handle WIP pseudo args preceeded by space",
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
