import * as test from 'tape';

import {VirtualElement, UniversalToken} from '../../types';
import {div,span} from '../../helpers';
import matcher from '../../matcher';

test('Element tester returns true for universal token', t => {
  const tagComps: VirtualElement[] = [div(), span()];
  const univ: UniversalToken = {type: 'universal'};
  tagComps.forEach(elem => t.deepEqual(
    matcher(elem, [[]], univ),
    [[]],
    `Tag comparison ${elem.type} gives true for universal`
  ));
  t.end();
});
