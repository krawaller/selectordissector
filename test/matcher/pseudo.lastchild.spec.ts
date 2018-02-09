import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, TokenType} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns correct result for last-child comparison', t => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const tree = div([span(),span(),span()]);
  const lastChildComparisons: TestCase[] = [
    [tree, [], true, 'top of pyramid is always last-child'],
    [tree, [0], false, 'oldest sibling isnt last-child'],
    [tree, [1], false, 'middle sibling isnt last-child'],
    [tree, [2], true, 'youngest sibling is last-child'],
    [div([span,'foo']), [0], true, 'older text nodes dont count']
  ];
  const lastChild: PseudoToken = {type: TokenType.pseudo, name: PseudoName.lastChild};
  lastChildComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], lastChild).result,
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});
