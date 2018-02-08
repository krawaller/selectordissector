import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, TokenType} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns correct result for first-of-type comparison', t => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const firstOfTypeComparisons: TestCase[] = [
    [div(), [], true, 'top of pyramid is always first-of-type'],
    [div([div(),div()]), [1], false, 'first-of-type is false if earlier sibling has same type'],
    [div([span(),div()]), [1], true, 'first-of-type is true if no earlier sibling has same type']
  ];
  const firstOfType: PseudoToken = {type: TokenType.pseudo, name: PseudoName.firstOfType};
  firstOfTypeComparisons.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], firstOfType),
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});
