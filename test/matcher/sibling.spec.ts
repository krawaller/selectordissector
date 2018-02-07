import * as test from 'tape';

import {VirtualElement, SiblingToken, Path, Collection, TokenType} from '../../types';
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
  const siblingCombinator: SiblingToken = {type: TokenType.sibling};
  siblingComps.forEach(([path, result, description]) => t.deepEqual(
    matcher(tree, [path], siblingCombinator),
    result,
    description
  ));
  t.end();
});

