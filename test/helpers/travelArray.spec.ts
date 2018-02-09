import * as test from 'tape';

import {Path} from '../../src/types';
import {travelArray} from '../../src/helpers';

test('The travelArray helper', t => {
  type TestCase = [any[], Path, any, string];
  const travels: TestCase[] = [
    [['a','b','c','d'], [2], 'c', 'We find items in flat array correctly'],
    [['a',['b']], [1,0], 'b', 'We can walk into an element with a path of length > 1']
  ];
  travels.forEach(([arr, path, hopeFor, desc])=> {
    t.deepEqual(
      travelArray(arr, path),
      hopeFor,
      desc
    );
  })
  t.end();
});
