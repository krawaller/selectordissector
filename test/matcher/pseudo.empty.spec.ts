import * as test from "tape";

import {div, span} from "../../src/builder";
import matcher from "../../src/matcher";
import {Path, PseudoName, PseudoToken, TokenType, VirtualElement} from "../../src/types";

test("Element tester returns correct result for :empty pseudo selector", (t) => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const commonTree = div([span()]);
  const emptyComparisons: TestCase[] = [
    [commonTree, [], false, ":empty returns false if we have children"],
    [commonTree, [0], true, ":empty returns true if we dont have children"],
  ];
  const empty: PseudoToken = {type: TokenType.pseudo, name: PseudoName.empty};
  emptyComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], empty).result,
    shouldMatch ? [path] : [],
    description,
  ));
  t.end();
});
