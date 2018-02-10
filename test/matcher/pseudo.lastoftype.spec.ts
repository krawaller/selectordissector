import * as test from "tape";

import {div, span} from "../../src/builder";
import matcher from "../../src/matcher";
import {Path, PseudoName, PseudoToken, TokenType, VirtualElement} from "../../src/types";

test("Element tester returns correct result for last-of-type comparison", (t) => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const lastOfTypeComparisons: TestCase[] = [
    [div(), [], true, "top of pyramid is always last-of-type"],
    [div([div(), div()]), [0], false, "last-of-type is false if later sibling has same type"],
    [div([div(), span()]), [0], true, "last-of-type is true if no later sibling has same type"],
    [div([div(), div(), span()]), [1], true, "last-of-type is true if no later sibling has same type, even if earlier is same"],
  ];
  const lastOfType: PseudoToken = {type: TokenType.pseudo, name: PseudoName.lastOfType};
  lastOfTypeComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], lastOfType).result,
    shouldMatch ? [path] : [],
    description,
  ));
  t.end();
});
