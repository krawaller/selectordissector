import {ContentNode, TextNode, VirtualElement} from "../types";

const elemProto = {};

type Child = VirtualElement | Builder | string;
type ChildList = Child[];

type AttrParamType = {[key: string]: string};
type ChildrenParamType = Child[] | Child | string;

type Builder = (a?: AttrParamType | ChildrenParamType, c?: ChildrenParamType) => ContentNode;

type Factory = (type: string) => Builder;

export const TEXTNODE: "__TEXTNODE__" = "__TEXTNODE__"; // Used to have symbol, but TypeScript isnt good with those

export function isTextNode(elem): elem is TextNode {
  return elem.type === TEXTNODE;
}

const builderFactory: Factory = (type) => (attrParam = {}, childrenParam = []): VirtualElement => {
  let children: Child[];
  if (Array.isArray(attrParam) || typeof attrParam === "string" || isElem(attrParam) || typeof attrParam === "function") {
    childrenParam = attrParam;
    attrParam = {};
  }
  if (typeof childrenParam === "string") {
    children = [{type: TEXTNODE, content: childrenParam}];
  } else if (isElem(childrenParam)) {
    children = [childrenParam];
  } else if (typeof childrenParam === "function") {
    children = [childrenParam()];
  } else {
    children = childrenParam;
  }
  // add elemProto so that we can identify objects as elements in the isElem function
  return Object.assign(Object.create(elemProto), {
    attrs: attrParam,
    children: children.map((c) => typeof c === "function" ? c() : typeof c === "string" ? {type: TEXTNODE, content: c} : c),
    type,
  });
};

export default builderFactory;

export function isElem(elem): elem is VirtualElement {
  return elemProto.isPrototypeOf(elem);
}

export const div = builderFactory("div");
export const span = builderFactory("span");
export const p = builderFactory("p");
export const strong = builderFactory("strong");
export const h1 = builderFactory("h1");
export const ul = builderFactory("ul");
export const li = builderFactory("li");
