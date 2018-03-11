import {ContentNode, TextNode, VirtualElement} from "../types";

const elemProto = {};

type Child = VirtualElement | Builder | string;

type Argument = Child | Child[] | Attributes;
type Attributes = {[key: string]: string | number};
type Builder = (...args: Argument[]) => ContentNode;
type Factory = (type: string) => Builder;

export const TEXTNODE: "__TEXTNODE__" = "__TEXTNODE__"; // Used to have symbol, but TypeScript isnt good with those

export function isTextNode(elem): elem is TextNode {
  return elem.type === TEXTNODE;
}

const builderFactory: Factory = (type) => (...args: Argument[]): ContentNode => {
  const children: VirtualElement[] = [];
  let attrs: Attributes = {};
  let toProcess = args;
  while (toProcess.length) {
    const a = toProcess.shift();
    if (Array.isArray(a)) {
      toProcess = toProcess.concat(a);
    } else if (typeof a === "string") {
      children.push({type: TEXTNODE, content: a});
    } else if (isElem(a)) {
      children.push(a);
    } else if (typeof a === "function") {
      children.push(a());
    } else {
      attrs = {...attrs, ...a};
    }
  }
  // add elemProto so that we can identify objects as elements in the isElem function
  return Object.assign(Object.create(elemProto), {attrs, children, type});
};

export default builderFactory;

export function isElem(elem): elem is VirtualElement {
  return elemProto.isPrototypeOf(elem);
}

export const article = builderFactory("article");
export const blockquote = builderFactory("blockquote");
export const dd = builderFactory("dd");
export const div = builderFactory("div");
export const dl = builderFactory("dl");
export const dt = builderFactory("dt");
export const footer = builderFactory("footer");
export const h1 = builderFactory("h1");
export const h2 = builderFactory("h2");
export const hr = builderFactory("hr");
export const img = builderFactory("img");
export const li = builderFactory("li");
export const p = builderFactory("p");
export const span = builderFactory("span");
export const strong = builderFactory("strong");
export const table = builderFactory("table");
export const tbody = builderFactory("tbody");
export const td = builderFactory("td");
export const th = builderFactory("th");
export const thead = builderFactory("thead");
export const tr = builderFactory("tr");
export const ul = builderFactory("ul");
