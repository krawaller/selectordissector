import * as test from 'tape';

import {VirtualElement} from '../../src/types';
import {builderFactory} from '../../src/helpers';

test('The builder factory', t => {
  const p = builderFactory('p');
  const strong = builderFactory('strong');
  type TestCase = [VirtualElement, VirtualElement, string];
  const builds: TestCase[] = [
    [
      p('moop'),
      {type: 'p', attrs: {}, content: 'moop', children: []},
      'b(str) gives an element with a text node'
    ], [
      p([strong('moo')]),
      {type: 'p', attrs: {}, content: '', children: [
        {type: 'strong', attrs: {}, content: 'moo', children: []}
      ]},
      'b([child]) gives correct wrapping'
    ], [
      p({lang:'sv'}),
      {type: 'p', attrs: {lang: 'sv'}, content: '', children: []},
      'b(attrs) gives the attrs and no content or children'
    ]

  ];
  builds.forEach(([input,output,desc]) => t.deepEqual(input,output,desc));
  t.end();
});