import * as test from 'tape';

import validator, {QueryError} from '../../src/validator';

test('Queries with syntax error yields error message', t => {
  const faulty = ['# poop # scoop #'];
  faulty.forEach(faultySel => t.deepEqual(
    validator(faultySel),
    [QueryError.parseError],
    `Faulty selector ${faultySel} gives error`
  ));
  t.end();
});
