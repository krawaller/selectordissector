import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, TokenType} from '../../src/types';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';

test('Element tester returns correct result for only-child comparison', t => {
  type TestCase = [VirtualElement, Path, boolean, string];
  const onlyChildComps: TestCase[] = [
    [div(), [], true, 'top of pyramid is always only-child'],
    [div(div), [0], true, 'only-child gives true for only child'],
    [div([div,span]), [0], false, 'only-child is false if we have siblings'],
    [div(['poop',div,'scoop']), [1], true, 'only-child is true if all siblings are text nodes'],
  ];
  const onlyChild: PseudoToken = {type: TokenType.pseudo, name: PseudoName.onlyChild};
  onlyChildComps.forEach(([tree, path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], onlyChild),
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});
