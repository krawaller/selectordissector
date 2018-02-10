/* tslint:disable object-literal-sort-keys */

import * as test from "tape";

import builderFactory, {div, isElem, TEXTNODE} from "../../src/builder";
import {ContentNode, VirtualElement} from "../../src/types";

test("The isElem tester", (t) => {
  t.equal(isElem({foo: "bar"}), false, "returns false for regular object");
  t.equal(isElem(div()), true, "returns true for elem object");
  t.end();
});

const txt = (str) => ({type: TEXTNODE, content: str});

test("The builder factory", (t) => {
  const p = builderFactory("p");
  const strong = builderFactory("strong");
  type TestCase = [ContentNode, ContentNode, string];
  const builds: TestCase[] = [
    [
      p("moop"),
      {type: "p", attrs: {}, children: [txt("moop")]},
      "b(str) gives an element with a text node",
    ], [
      p([strong("moo")]),
      {type: "p", attrs: {}, children: [
        {type: "strong", attrs: {}, children: [txt("moo")]},
      ]},
      "b([child()]) gives correct wrapping",
    ], [
      p({lang: "sv"}),
      {type: "p", attrs: {lang: "sv"}, children: []},
      "b(attrs) gives the attrs and no content or children",
    ], [
      p(strong("wee")),
      {type: "p", attrs: {}, children: [
        {type: "strong", attrs: {}, children: [txt("wee")]},
      ]},
      "b(child()) gives the child in children array correctly",
    ], [
      p(strong),
      {type: "p", attrs: {}, children: [
        {type: "strong", attrs: {}, children: []},
      ]},
      "b(child) gives the child in children array correctly",
    ], [
      p([strong("baz"), strong]),
      {type: "p", attrs: {}, children: [
        {type: "strong", attrs: {}, children: [txt("baz")]},
        {type: "strong", attrs: {}, children: []},
      ]},
      "b([...children]) can include builder funcs",
    ], [
      p([strong("baz"), "meep"]),
      {type: "p", attrs: {}, children: [
        {type: "strong", attrs: {}, children: [txt("baz")]},
        txt("meep"),
      ]},
      "b([...children]) can include strings",
    ],
  ];
  builds.forEach(([input, output, desc]) => t.deepEqual(input, output, desc));
  t.end();
});
