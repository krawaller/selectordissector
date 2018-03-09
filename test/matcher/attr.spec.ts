import * as test from "tape";

import {div} from "../../src/builder";
import matcher from "../../src/matcher";
import {AttributeAction, AttributeToken, TokenType, VirtualElement} from "../../src/types";

test("Element tester returns correct result for attributes with exists action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({foo: null}), true, "we return true if asked-for attribute exists"],
    [div(), false, "we return false if element does not have attribute"],
  ];
  const fooExists: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.exists};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooExists).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});

test("Element tester returns correct result for attributes with equals action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({foo: null}), false, "we return false if attribute is empty"],
    [div({foo: "baz"}), false, "we return false if attribute is wrong value"],
    [div({baz: "bar"}), false, "we return false if element does not have attribute"],
    [div({foo: "bar"}), true, "we return true if element has attribute with correct value"],
  ];
  const fooIsBar: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.equals, value: "bar"};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooIsBar).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});

test("Element tester returns correct result for attributes with start action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz: "bar"}), false, "we return false if element does not have attribute"],
    [div({foo: null}), false, "we return false if attribute is empty"],
    [div({foo: "bazbar"}), false, "we return false if attribute begins with wrong thing"],
    [div({foo: "bar"}), true, "we return true if attribute equals value"],
    [div({foo: "barbaz"}), true, "we return true if attribute begins with value"],
  ];
  const fooBeginsWithBar: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.start, value: "bar"};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooBeginsWithBar).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});

test("Element tester returns correct result for attributes with end action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz: "bar"}), false, "we return false if element does not have attribute"],
    [div({foo: null}), false, "we return false if attribute is empty"],
    [div({foo: "barbaz"}), false, "we return false if attribute ends with wrong thing"],
    [div({foo: "bar"}), true, "we return true if attribute equals value"],
    [div({foo: "bazbar"}), true, "we return true if attribute ends with value"],
  ];
  const fooEndsWithBar: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.end, value: "bar"};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooEndsWithBar).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});

test("Element tester returns correct result for attributes with any action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz: "bar"}), false, "we return false if element does not have attribute"],
    [div({foo: null}), false, "we return false if attribute is empty"],
    [div({foo: "barbaz"}), true, "we return true if attribute begins with right thing"],
    [div({foo: "bar"}), true, "we return true if attribute equals value"],
    [div({foo: "bazbar"}), true, "we return true if attribute ends with right thing"],
    [div({foo: "bazbarbin"}), true, "we return true if attribute contains right thing"],
  ];
  const fooContainsBar: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.any, value: "bar"};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooContainsBar).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});

test("Element tester returns correct result for attributes with element (word) action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz: "bar"}), false, "we return false if element does not have attribute"],
    [div({foo: null}), false, "we return false if attribute is empty"],
    [div({foo: "barbaz"}), false, "we return false if attribute begins with right thing but no space"],
    [div({foo: "bar baz"}), true, "we return true if attribute begins with right thing as word"],
    [div({foo: "bar"}), true, "we return true if attribute equals value"],
    [div({foo: "bazbar"}), false, "we return false if attribute ends with right thing but no space"],
    [div({foo: "baz bar"}), true, "we return true if attribute ends with right thing as word"],
    [div({foo: "bazbarbin"}), false, "we return false if attribute contains right thing but no space"],
    [div({foo: "baz bar bin"}), true, "we return true if attribute contains right thing as word"],
  ];
  const fooContainsBar: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.element, value: "bar"};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooContainsBar).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});

test("Element tester returns correct result for attributes with hyphen action", (t) => {
  type TestCase = [VirtualElement, boolean, string];
  const attrComps: TestCase[] = [
    [div({baz: "bar"}), false, "we return false if element does not have attribute"],
    [div({foo: null}), false, "we return false if attribute is empty"],
    [div({foo: "barbaz"}), false, "we return false if attribute begins with right thing but no hyphen"],
    [div({foo: "bar baz"}), false, "we return false if attribute begins with right thing as word"],
    [div({foo: "bar-baz"}), true, "we return true if attribute begins with right thing until hyphen"],
    [div({foo: "bar"}), true, "we return true if attribute equals value"],
    [div({foo: "bazbar"}), false, "we return false if attribute ends with right thing"],
    [div({foo: "baz bar"}), false, "we return false if attribute ends with right thing as word"],
    [div({foo: "baz-bar"}), false, "we return false if attribute ends with right thing with hyphen"],
  ];
  const fooContainsBar: AttributeToken = {type: TokenType.attribute, name: "foo", action: AttributeAction.hyphen, value: "bar"};
  attrComps.forEach(([elem, shouldMatch, description]) => t.deepEqual(
    matcher(elem, [[]], fooContainsBar).result,
    shouldMatch ? [[]] : [],
    description,
  ));
  t.end();
});
