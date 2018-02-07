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
      'p(string) gives elem with textnode'
    ], [
      p([strong('moo')]),
      {type: 'p', attrs: {}, content: '', children: [
        {type: 'strong', attrs: {}, content: 'moo', children: []}
      ]},
      'p([strong(foo)]) gives correct wrapping'
    ]
  ];
  builds.forEach(([input,output,desc]) => t.deepEqual(input,output,desc));
  t.end();
});