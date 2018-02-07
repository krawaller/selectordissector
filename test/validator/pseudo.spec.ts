import * as test from 'tape';

import validator, {QueryError} from '../../validator';

test(`Experimental pseudo selectors aren't allowed`, t => {
  type TestCase = [string, QueryError, number[]];
  const experimental: TestCase[] = [
    ['div p span:is(.foo)', QueryError.isPseudoSelector, [5]],
    ['p > span:has(.foo)', QueryError.hasPseudoSelector, [3]]
  ];
  experimental.forEach(([query, error, position]) => t.deepEqual(
    validator(query),
    [error, position],
    `Query ${query} gives experimental selector error for position ${position}`
  ));
  t.end();
});

test(`nth-of-type data must be correct`, t => {
  type TestCase = [string, number[], string];
  const nthCases: TestCase[] = [
    ['div p span:nth-of-type', [5], 'we get error when we have no data parens'],
    ['div :nth-of-type(foo)', [2], 'we get error when we have nonsense data'],
    [':nth-of-type(0)', [0], 'we get error when we have 0 as data']
  ];
  nthCases.forEach(([query, position, description]) => t.deepEqual(
    validator(query),
    [QueryError.nthOfTypeDataError, position],
    description
  ));
  t.end();
});


test(`unrecognized pseudo selectors are called out`, t => {
  type TestCase = [string, number[], string];
  const nthCases: TestCase[] = [
    ['div p span:foo', [5], 'unknown pseudo foo is correctly called out'],
    ['div :bar', [2], 'unknown pseudo bar is correctly called out'],
    [':baz', [0], 'unknown pseudo baz is correctly called out']
  ];
  nthCases.forEach(([query, position, description]) => t.deepEqual(
    validator(query),
    [QueryError.unknownPseudoSelector, position],
    description
  ));
  t.end();
});