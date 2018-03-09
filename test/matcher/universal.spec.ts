import * as test from "tape";

import {div, span} from "../../src/builder";
import matcher from "../../src/matcher";
import {TokenType, UniversalToken, VirtualElement} from "../../src/types";

test("Element tester returns true for universal token", (t) => {
  const tagComps: VirtualElement[] = [div(), span()];
  const univ: UniversalToken = {type: TokenType.universal};
  tagComps.forEach((elem) => t.deepEqual(
    matcher(elem, [[]], univ).result,
    [[]],
    `Tag comparison ${elem.type} gives true for universal`,
  ));
  t.end();
});
