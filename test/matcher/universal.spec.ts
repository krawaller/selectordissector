import * as test from 'tape';

import {VirtualElement, UniversalToken} from '../../types';
import {div,span} from '../../helpers';
import {testElement} from '../../matcher';

test('Element tester returns true for universal token', t => {
  const tagComps: VirtualElement[] = [div(), span()];
  const univ: UniversalToken = {type: 'universal'};
  tagComps.forEach(elem => t.deepEqual(
    testElement(elem, [], univ),
    true,
    `Tag comparison ${elem.type} gives true for universal`
  ));
  t.end();
});
