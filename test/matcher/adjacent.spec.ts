import * as test from "tape";

import {div} from "../../src/builder";
import matcher from "../../src/matcher";
import {AdjacentToken, Collection, Path, TokenType} from "../../src/types";

const tree = (
  div([
    div([
      div,
      div,
      div(
        div(),
      ),
    ]),
    div(
      div(
        div,
      ),
    ),
  ])
);

test("Adjacent combinator yields correct matches", (t) => {
  type TestCase = [Path, Collection, string];
  const adjacentComps: TestCase[] = [
    [
      [],
      [],
      "from the top of the pyramid we get nothing",
    ],
    [
      [0, 2],
      [],
      "youngest sibling yields nothing",
    ],
    [
      [0, 0],
      [
        [0, 1],
      ],
      "oldest sibling yields middle sibling ",
    ],
  ];
  const adjacentCombinator: AdjacentToken = {type: TokenType.adjacent};
  adjacentComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], adjacentCombinator).result,
    result,
    description,
  ));
  t.end();
});
