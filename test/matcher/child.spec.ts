import * as test from 'tape';

import {VirtualElement, DescendantToken, ChildToken, Path, Collection, TokenType} from '../../src/types';
import {div} from '../../src/builder';
import matcher from '../../src/matcher';

const tree = (
  div([
    div([
      div,
      div,
      div(
        div
      )
    ]),
    div(
      div(
        div
      )
    )
  ])
);

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
  const childCombinator: ChildToken = {type: TokenType.child};
  childComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], childCombinator).result,
    result,
    description
  ));
  t.end();
});

