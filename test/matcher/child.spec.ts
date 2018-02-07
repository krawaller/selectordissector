import * as test from 'tape';

import {VirtualElement, DescendantToken, ChildToken, Path, Collection} from '../../types';
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

test('Child combinator yields correct matches', t => {
  type TestCase = [Path, Collection, string];
  const childComps: TestCase[] = [
    [
      [],
      [
        [0],
        [1],
      ],
      'from the top of the pyramid we get the expected two children'
    ],
    [
      [0],
      [
        [0,0],
        [0,1],
        [0,2]
      ],
      'we get the expected tree kids from the oldest child of root'
    ],
    [
      [0,0],
      [],
      'leaf node yields empty array'
    ]
  ];
  const childCombinator: ChildToken = {type:'child'};
  childComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], childCombinator),
    result,
    description
  ));
  t.end();
});

