import * as test from 'tape';

import {VirtualElement, SiblingToken, Path, Collection, TokenType} from '../../src/types';
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

test('Sibling combinator yields correct matches', t => {
  type TestCase = [Path, Collection, string];
  const siblingComps: TestCase[] = [
    [
      [],
      [],
      'from the top of the pyramid we get nothing'
    ],
    [
      [0,2],
      [],
      'youngest sibling yields nothing'
    ],
    [
      [0,0],
      [
        [0,1],
        [0,2],
      ],
      'oldest sibling yields all younger sibling '
    ],
    [
      [0,1],
      [
        [0,2]
      ],
      'middle sibling yields younger sibling'
    ]
  ];
  const siblingCombinator: SiblingToken = {type: TokenType.sibling};
  siblingComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], siblingCombinator),
    result,
    description
  ));
  t.end();
});

