import * as test from 'tape';

import validator, {parseError} from '../../validator';

test(`Correct queries don't yield error`, t => {
  const ok = ['div > p.foo', '*','p:first-of-type'];
  ok.forEach(okSel => t.deepEqual(
    validator(okSel),
    null,
    `Ok selector ${okSel} didn't give error`
  ));
  t.end();
});
