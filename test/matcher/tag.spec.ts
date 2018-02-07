import * as test from 'tape';

import {VirtualElement, ElementToken, Path} from '../../types';
import {div, span} from '../../helpers';
import matcher from '../../matcher';

test('Element tester returns correct result for tag comparison', t => {
  type TestCase = [Path, boolean, string];
  const tree = div([span()]);
  const tagComps: TestCase[] = [
    [[], true, 'return true for element with correct tag type'],
    [[0], false, 'return false for element with wrong tag type']
  ];
  const isDiv: ElementToken = {type:'tag',name:'div'};
  tagComps.forEach(([path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], isDiv),
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});
