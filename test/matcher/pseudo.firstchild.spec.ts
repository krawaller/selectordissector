import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, TokenType} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns correct result for first-child comparison', t => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const tree = div([span(),span(),span()]);
  const firstChildComparisons: TestCase[] = [
    [tree, [], true, 'top of pyramid is always first-child'],
    [tree, [0], true, 'oldest sibling is first-child'],
    [tree, [1], false, 'middle sibling isnt first-child'],
    [tree, [2], false, 'youngest sibling isnt first-child'],
    [div(['foo',span]), [1], true, 'older text nodes dont count']
  ];
  const firstChild: PseudoToken = {type: TokenType.pseudo, name: PseudoName.firstChild};
  firstChildComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], firstChild).result,
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});
