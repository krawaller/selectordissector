import * as test from 'tape';

import {QueryError} from '../../types';
import validator, {isPseudoSelector, hasPseudoSelector, unknownPseudoSelector} from '../../validator';

test(`Experimental pseudo selectors aren't allowed`, t => {
  type TestCase = [string, QueryError, number[]];
  const experimental: TestCase[] = [
    ['div p span:is(.foo)', isPseudoSelector, [5]],
    ['p > span:has(.foo)', hasPseudoSelector, [3]]
  ];
  experimental.forEach(([query, error, position]) => t.deepEqual(
    validator(query),
    [error, position],
    `Query ${query} gives experimental selector error for position ${position}`
  ));
  t.end();
});
