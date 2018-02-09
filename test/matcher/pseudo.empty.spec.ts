import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, TokenType} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns correct result for :empty pseudo selector', t => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const tree = div([span()]);
  const emptyComparisons: TestCase[] = [
    [tree, [], false, ':empty returns false if we have children'],
    [tree, [0], true, ':empty returns true if we dont have children'],
  ];
  const empty: PseudoToken = {type: TokenType.pseudo, name: PseudoName.empty};
  emptyComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], empty).result,
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});
