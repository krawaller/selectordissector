import * as test from "tape";

import {div, span} from "../../src/builder";
import matcher from "../../src/matcher";
import {ElementToken, Path, TokenType, VirtualElement} from "../../src/types";

test("Element tester returns correct result for tag comparison", (t) => {
  type TestCase = [Path, boolean, string];
  const tree = div([span()]);
  const tagComps: TestCase[] = [
    [[], true, "return true for element with correct tag type"],
    [[0], false, "return false for element with wrong tag type"],
  ];
  const isDiv: ElementToken = {type: TokenType.tag, name: "div"};
  tagComps.forEach(([path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], isDiv).result,
    shouldMatch ? [path] : [],
    description,
  ));
  t.end();
});
