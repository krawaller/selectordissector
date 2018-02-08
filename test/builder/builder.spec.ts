import * as test from 'tape';

import {VirtualElement} from '../../src/types';
import builderFactory, {isElem, div} from '../../src/builder';

test('The isElem tester', t => {
  t.equal(isElem({foo:'bar'}), false, 'returns false for regular object');
  t.equal(isElem(div()), true, 'returns true for elem object');
  t.end();
});

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
      'b([child()]) gives correct wrapping'
    ], [
      p({lang:'sv'}),
      {type: 'p', attrs: {lang: 'sv'}, content: '', children: []},
      'b(attrs) gives the attrs and no content or children'
    ], [
      p(strong('wee')),
      {type: 'p', attrs: {}, content: '', children: [
        {type: 'strong', attrs: {}, content: 'wee', children: []}
      ]},
      'b(child()) gives the child in children array correctly'
    ],[
      p(strong),
      {type: 'p', attrs: {}, content: '', children: [
        {type: 'strong', attrs: {}, content: '', children: []}
      ]},
      'b(child) gives the child in children array correctly'
    ],[
      p([strong('baz'),strong]),
      {type: 'p', attrs: {}, content: '', children: [
        {type: 'strong', attrs: {}, content: 'baz', children: []},
        {type: 'strong', attrs: {}, content: '', children: []}
      ]},
      'b([...children]) can include builder funcs'
    ]
  ];
  builds.forEach(([input,output,desc]) => t.deepEqual(input,output,desc));
  t.end();
});
