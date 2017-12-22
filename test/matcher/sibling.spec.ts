import * as test from 'tape';

import {VirtualElement, SiblingToken} from '../../types';
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

test('Sibling combinator yields correct matches', t => {
  type TestCase = [number[], number[][], string];
  const siblingComps: TestCase[] = [
    [
      [],
      [],
      'from the top of the pyramid we get nothing'
    ],
    [
      [0,2],
      [
        [0,0],
        [0,1],
      ],
      'youngest sibling yields all older siblings'
    ],
    [
      [0,0],
      [],
      'oldest sibling yields nothing '
    ]
  ];
  const siblingCombinator: SiblingToken = {type:'sibling'};
  siblingComps.forEach(([path, result, description]) => t.deepEqual(
    combineFromPath(tree, path, siblingCombinator),
    result,
    description
  ));
  t.end();
});

