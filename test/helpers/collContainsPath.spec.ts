import * as test from 'tape';

import {Collection, Path} from '../../src/types';
import {collContainsPath} from '../../src/helpers';

test('The collContainsPath helper', t => {
  type TestCase = [Collection, Path, boolean, string];
  const cases: TestCase[] = [
    [
      [[0],[1,2],[3]],
      [1,2],
      true,
      'it reports true when path is inside collection'
    ],
    [
      [[0],[1,2],[3]],
      [1,2,3],
      false,
      'it reports false when path isnt found in coll'
    ]
  ];
  cases.forEach(([coll, path, result, desc]) => t.equal(collContainsPath(coll,path), result, desc));
  t.end();
});
