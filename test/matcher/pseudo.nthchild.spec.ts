import * as test from 'tape';

import {VirtualElement, PseudoToken, PseudoName, Path, Collection, TokenType} from '../../src/types';
import {getDescendantPaths} from '../../src/helpers';
import {div,span} from '../../src/builder';
import matcher from '../../src/matcher';
import parser from '../../src/parser';

const tree = (
  div([
    div([
      span,
      div,
      span(
        div
      )
    ]),
    span(
      div(
        span
      )
    )
  ])
);

const allInTree = getDescendantPaths(tree, []);

test('Collection tester returns correct result for nth-child comparison', t => {
  type TestCase = [string, Collection, string];
  const nthCases: TestCase[] = [
    [':nth-child(2)', [ [0,1], [1] ], ':nth-child(2) gives correct result'],
    [':nth-child(1)', [ [], [0], [0,0], [0,2,0], [1,0], [1,0,0] ], ':nth-child(1) includes all oldest sibling, including pyramid top'],
    [':nth-child(-n+2)', [ [], [0], [0,0], [0,1], [0,2,0], [1], [1,0], [1,0,0] ], ':nth-child(-n+2) includes two oldest siblings'],
    [':nth-child(2n-1)', [ [], [0], [0,0], [0,2], [0,2,0], [1,0], [1,0,0] ], ':nth-child(2n-1) includes every odd sibling'],
    [':nth-child(2n+1)', [ [], [0], [0,0], [0,2], [0,2,0], [1,0], [1,0,0] ], ':nth-child(2n+1) includes every odd sibling'],
    [':nth-child(odd)', [ [], [0], [0,0], [0,2], [0,2,0], [1,0], [1,0,0] ], ':nth-child(odd) includes every odd sibling'],
    [':nth-child(2n)', [ [0,1], [1] ], ':nth-child(2n) includes every even sibling'],
    [':nth-child(2n+2)', [ [0,1], [1] ], ':nth-child(2n+2) includes every even sibling'],
    [':nth-child(2n-6)', [ [0,1], [1] ], ':nth-child(n2-6) includes every even sibling'],
    [':nth-child(even)', [ [0,1], [1] ], ':nth-child(even) includes every even sibling'],
  ];
  nthCases.forEach(([query, collection, description]) => t.deepEqual(
    matcher(tree, allInTree, parser(query)[0][0]),
    collection,
    description
  ));
  t.end();
});
