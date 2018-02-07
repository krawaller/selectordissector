import * as test from 'tape';

import {VirtualElement, AdjacentToken, Path, Collection, TokenType} from '../../types';
import {div} from '../../helpers';
import matcher from '../../matcher';

const tree = (
  div([
    div([
      div(),
      div(),
      div([
        div()
      ])
    ]),
    div([
      div([
        div()
      ])
    ])
  ])
)

test('Adjacent combinator yields correct matches', t => {
  type TestCase = [Path, Collection, string];
  const adjacentComps: TestCase[] = [
    [
      [],
      [],
      'from the top of the pyramid we get nothing'
    ],
    [
      [0,2],
      [
        [0,1],
      ],
      'youngest sibling yields closest older siblings'
    ],
    [
      [0,0],
      [],
      'oldest sibling yields nothing '
    ]
  ];
  const adjacentCombinator: AdjacentToken = {type: TokenType.adjacent};
  adjacentComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], adjacentCombinator),
    result,
    description
  ));
  t.end();
});

