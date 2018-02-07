import * as test from 'tape';

import parser from '../../parser';
import {VirtualElement, ElementToken, Path} from '../../types';
import {div, span} from '../../helpers';
import matcher from '../../matcher';

test('Element tester returns correct result for class selector', t => {
  const tree = div([
    span({class:"foo bar"}),
    span({class:"foo bar baz"}),
    span({class:"bar foo"}),
    span({class:"bar"}),
    span({class:"barb baz"}),
    span({class:"foo barb baz"}),
    span({class:"foo gbar"})
  ]);
  type TestCase = [Path, boolean, string];
  const classComps: TestCase[] = [
    [[], false, 'we return false if element has no class attribute'],
    [[0], true, 'we return true if element class attribute has the class in the end'],
    [[1], true, 'we return true if element class attribute is the middle'],
    [[2], true, 'we return true if element class attribute has the class in the beginning'],
    [[3], true, 'we return true if element class attribute is the class'],
    [[4], false, 'we return false if element class attribute lacks the class, even though first class resembles'],
    [[5], false, 'we return false if element class attribute lacks the class, even though middle class resembles'],
    [[6], false, 'we return false if element class attribute lacks the class, even though last class resembles'],
  ];
  const hasBarClass = <ElementToken>parser('.bar')[0][0];
  classComps.forEach(([path, shouldMatch, description]) => t.deepEqual(
    matcher(tree, [path], hasBarClass),
    shouldMatch ? [path] : [],
    description
  ));
  t.end();
});