import * as test from 'tape';

import {VirtualElement, AdjacentToken} from '../../types';
import {div} from '../../helpers';
import {combineFromPath} from '../../matcher';

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
  type TestCase = [number[], number[][], string];
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
  const adjacentCombinator: AdjacentToken = {type:'adjacent'};
  adjacentComps.forEach(([path, result, description]) => t.deepEqual(
    combineFromPath(tree, path, adjacentCombinator),
    result,
    description
  ));
  t.end();
});

