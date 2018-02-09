import * as test from 'tape';

import {QueryError} from '../../src/types';
import validator from '../../src/validator';

test('Queries with syntax error yields error message', t => {
  const faulty = ['# poop # scoop #'];
  faulty.forEach(faultySel => t.deepEqual(
    validator(faultySel)[0],
    QueryError.parseError,
    `Faulty selector ${faultySel} gives error`
  ));
  t.end();
});
