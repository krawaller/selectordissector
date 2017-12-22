import * as test from 'tape';

import {VirtualElement, AttributeToken} from '../../types';
import {div} from '../../helpers';
import {testElement} from '../../matcher';

test('Element tester returns correct result for attributes with exists action', t => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({foo:null}), true, 'we return true if asked-for attribute exists'],
    [div(), false, 'we return false if element does not have attribute']
  ];
  const fooExists: AttributeToken = {type:'attribute',name:'foo',action:'exists'};
  attrComps.forEach(([elem, result, description]) => t.deepEqual(
    testElement(elem, [], fooExists),
    result,
    description
  ));
  t.end();
});

test('Element tester returns correct result for attributes with equals action', t => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({foo:null}), false, 'we return false if attribute is empty'],
    [div({foo:'baz'}), false, 'we return false if attribute is wrong value'],
    [div({baz:'bar'}), false, 'we return false if element does not have attribute'],
    [div({foo:'bar'}), true, 'we return true if element has attribute with correct value']
  ];
  const fooIsBar: AttributeToken = {type:'attribute',name:'foo',action:'equals', value: 'bar'};
  attrComps.forEach(([elem, result, description]) => t.deepEqual(
    testElement(elem, [], fooIsBar),
    result,
    description
  ));
  t.end();
});

test('Element tester returns correct result for attributes with start action', t => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz:'bar'}), false, 'we return false if element does not have attribute'],
    [div({foo:null}), false, 'we return false if attribute is empty'],
    [div({foo:'bazbar'}), false, 'we return false if attribute begins with wrong thing'],
    [div({foo:'bar'}), true, 'we return true if attribute equals value'],
    [div({foo:'barbaz'}), true, 'we return true if attribute begins with value'],
  ];
  const fooBeginsWithBar: AttributeToken = {type:'attribute',name:'foo',action:'start', value: 'bar'};
  attrComps.forEach(([elem, result, description]) => t.deepEqual(
    testElement(elem, [], fooBeginsWithBar),
    result,
    description
  ));
  t.end();
});

test('Element tester returns correct result for attributes with end action', t => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz:'bar'}), false, 'we return false if element does not have attribute'],
    [div({foo:null}), false, 'we return false if attribute is empty'],
    [div({foo:'barbaz'}), false, 'we return false if attribute ends with wrong thing'],
    [div({foo:'bar'}), true, 'we return true if attribute equals value'],
    [div({foo:'bazbar'}), true, 'we return true if attribute ends with value'],
  ];
  const fooEndsWithBar: AttributeToken = {type:'attribute',name:'foo',action:'end', value: 'bar'};
  attrComps.forEach(([elem, result, description]) => t.deepEqual(
    testElement(elem, [], fooEndsWithBar),
    result,
    description
  ));
  t.end();
});
