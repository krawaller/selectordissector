import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, TokenType} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns correct result for only-of-type comparison', t => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const onlyOfTypeComps: TestCase[] = [
    [div(), [], true, 'top of pyramid is always only-of-type'],
    [div([div(),span(),div()]), [0], false, 'only-of-type is false if a sibling has same type'],
    [div([div(),span(),div()]), [1], true, 'only-of-type is true if no sibling has same type'],
    [div([div()]), [0], true, 'only-of-type is true when we have no siblings']
  ];
  const onlyOfType: PseudoToken = {type: TokenType.pseudo, name: PseudoName.onlyOfType};
  onlyOfTypeComps.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], onlyOfType).result,
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});