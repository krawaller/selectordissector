import * as test from "tape";

import {div, span} from "../../src/builder";
import {getDescendantPaths} from "../../src/helpers";
import matcher from "../../src/matcher";
import parser from "../../src/parser";
import {Collection} from "../../src/types";

const tree = (
  div([
    div([
      span,
      div,
      span(
        div,
      ),
    ]),
    span(
      div(
        span,
      ),
    ),
  ])
);

const allInTree = getDescendantPaths(tree, []);

test("Collection tester returns correct result for nth-of-type comparison", (t) => {
  type TestCase = [string, Collection, string];
  const nthCases: TestCase[] = [
    [":nth-of-type(2)", [ [0, 2] ], ":nth-of-type(2) gives correct result"],
    [":nth-of-type(1)", [ [], [0], [0, 0], [0, 1], [0, 2, 0], [1], [1, 0], [1, 0, 0] ], ":nth-of-type(1) includes all relevant oldest sibling"],
  ];
  nthCases.forEach(([query, collection, description]) => t.deepEqual(
    matcher(tree, allInTree, parser(query)[0][0]).result,
    collection,
    description,
  ));
  t.end();
});
