import * as test from "tape";

import {div} from "../../src/builder";
import matcher from "../../src/matcher";
import {ChildToken, Collection, DescendantToken, Path, TokenType, VirtualElement} from "../../src/types";

const tree = (
  div([
    div([
      div,
      div,
      div(
        div,
      ),
    ]),
    div(
      div(
        div,
      ),
    ),
  ])
);

test("Descendant combinator yields correct matches", (t) => {
  type TestCase = [Path, Collection, string];
  const descendantComps: TestCase[] = [
    [
      [],
      [
        [0],
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 2, 0],
        [1],
        [1, 0],
        [1, 0, 0],
      ],
      "from the top of the pyramid we get the entire tree",
    ],
    [
      [0],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 2, 0],
      ],
      "we only get the descendants of where we start",
    ],
    [
      [0, 1],
      [],
      "Leaf yields nothing",
    ],
  ];
  const descendantCombinator: DescendantToken = {type: TokenType.descendant};
  descendantComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], descendantCombinator).result,
    result,
    description,
  ));
  t.end();
});
