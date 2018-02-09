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
    matcher(tree, allInTree, parser(query)[0][0]).result,
    collection,
    description
  ));
  t.end();
});

test('nth-child doesnt count text nodes', t => {
  type TestCase = [VirtualElement, string, Collection, string];
  const ignoreTextNodes: TestCase[] = [
    [
      div(['foo', span, 'bar', div]),
      ':nth-child(2)',
      [ [3] ],
      'the inner div is child 2 if we dont count text nodes'
    ],
    [
      div(['foo','bar','baz']),
      ':nth-child(2)',
      [],
      'text nodes are never selected'
    ]
  ];
  ignoreTextNodes.forEach(([tree, query, collection, description]) => t.deepEqual(
    matcher(tree, collection, parser(query)[0][0]).result,
    collection,
    description
  ));
  t.end();
});
