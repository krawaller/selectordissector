import * as test from 'tape';

import {VirtualElement, DescendantToken, ChildToken} from '../../types';
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

test('Descendant combinator yields correct matches', t => {
  type TestCase = [number[], number[][], string];
  const descendantComps: TestCase[] = [
    [
      [],
      [
        [0],
        [0,0],
        [0,1],
        [0,2],
        [0,2,0],
        [1],
        [1,0],
        [1,0,0]
      ],
      'from the top of the pyramid we get the entire tree'
    ],
    [
      [0],
      [
        [0,0],
        [0,1],
        [0,2],
        [0,2,0]
      ],
      'we only get the descendants of where we start'
    ],
    [
      [0,1],
      [],
      'Leaf yields nothing'
    ]
  ];
  const descendantCombinator: DescendantToken = {type:'descendant'};
  descendantComps.forEach(([path, result, description]) => t.deepEqual(
    combineFromPath(tree, path, descendantCombinator),
    result,
    description
  ));
  t.end();
});

