import * as test from 'tape';

import {VirtualElement, UniversalToken, TokenType, ContentNode} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns true for universal token', t => {
  const tagComps: VirtualElement[] = [div(), span()];
  const univ: UniversalToken = {type: TokenType.universal};
  tagComps.forEach(elem => t.deepEqual(
    matcher(elem, [[]], univ).result,
    [[]],
    `Tag comparison ${elem.type} gives true for universal`
  ));
  t.end();
});
