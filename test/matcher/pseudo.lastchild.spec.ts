import * as test from "tape";

import {div, span} from "../../src/builder";
import matcher from "../../src/matcher";
import {Path, PseudoName, PseudoToken, TokenType, VirtualElement} from "../../src/types";

test("Element tester returns correct result for last-child comparison", (t) => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const commonTree = div([span(), span(), span()]);
  const lastChildComparisons: TestCase[] = [
    [commonTree, [], true, "top of pyramid is always last-child"],
    [commonTree, [0], false, "oldest sibling isnt last-child"],
    [commonTree, [1], false, "middle sibling isnt last-child"],
    [commonTree, [2], true, "youngest sibling is last-child"],
    [div([span, "foo"]), [0], true, "older text nodes dont count"],
  ];
  const lastChild: PseudoToken = {type: TokenType.pseudo, name: PseudoName.lastChild};
  lastChildComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], lastChild).result,
    shouldMatch ? [path] : [],
    description,
  ));
  t.end();
});
