import * as test from 'tape';

import {VirtualElement, AttributeToken, AttributeAction, TokenType} from '../../types';
import {div} from '../../helpers';
import matcher from '../../matcher';

test('Element tester returns correct result for attributes with exists action', t => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({foo:null}), true, 'we return true if asked-for attribute exists'],
    [div(), false, 'we return false if element does not have attribute']
  ];
  const fooExists: AttributeToken = {type: TokenType.attribute, name:'foo', action: AttributeAction.exists};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooExists),
    shouldMatch ? [[]] : [],
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
  const fooIsBar: AttributeToken = {type: TokenType.attribute, name:'foo', action: AttributeAction.equals, value: 'bar'};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooIsBar),
    shouldMatch ? [[]] : [],
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
  const fooBeginsWithBar: AttributeToken = {type: TokenType.attribute, name:'foo', action: AttributeAction.start, value: 'bar'};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooBeginsWithBar),
    shouldMatch ? [[]] : [],
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
  const fooEndsWithBar: AttributeToken = {type: TokenType.attribute, name:'foo', action: AttributeAction.end, value: 'bar'};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooEndsWithBar),
    shouldMatch ? [[]] : [],
    description
  ));
  t.end();
});
