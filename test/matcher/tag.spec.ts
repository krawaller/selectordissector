import * as test from 'tape';

import {VirtualElement, ElementToken} from '../../types';
import {div, span} from '../../helpers';
import {testElement} from '../../matcher';

test('Element tester returns correct result for tag comparison', t => {
  type TestCase = [number[], boolean, string];
  const tree = div([span()]);
  const tagComps: TestCase[] = [
    [[], true, 'return true for element with correct tag type'],
    [[0], false, 'return false for element with wrong tag type']
  ];
  const isDiv: ElementToken = {type:'tag',name:'div'};
  tagComps.forEach(([path, result, description]) => t.deepEqual(
    testElement(tree, path, isDiv),
    result,
    description
  ));
  t.end();
});
