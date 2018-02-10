import * as test from "tape";

import {div, span} from "../../src/builder";
import matcher from "../../src/matcher";
import {Path, PseudoName, PseudoToken, TokenType, VirtualElement} from "../../src/types";

test("Element tester returns correct result for first-child comparison", (t) => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const commonTree = div([span(), span(), span()]);
  const firstChildComparisons: TestCase[] = [
    [commonTree, [], true, "top of pyramid is always first-child"],
    [commonTree, [0], true, "oldest sibling is first-child"],
    [commonTree, [1], false, "middle sibling isnt first-child"],
    [commonTree, [2], false, "youngest sibling isnt first-child"],
    [div(["foo", span]), [1], true, "older text nodes dont count"],
  ];
  const firstChild: PseudoToken = {type: TokenType.pseudo, name: PseudoName.firstChild};
  firstChildComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], firstChild).result,
    shouldMatch ? [path] : [],
    description,
  ));
  t.end();
});
