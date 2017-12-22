import * as test from 'tape';

import validator, {parseError} from '../../validator';

test('Queries with syntax error yields error message', t => {
  const faulty = ['# poop # scoop #'];
  faulty.forEach(faultySel => t.deepEqual(
    validator(faultySel),
    [parseError],
    `Faulty selector ${faultySel} gives error`
  ));
  t.end();
});
