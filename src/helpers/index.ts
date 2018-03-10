import {Collection, CombinatorToken, ContentNode, Path, QueryToken, TokenType} from "../types";

import {isTextNode} from "../builder";

export * from "./describeToken";
export * from "./printToken";
export * from "./classifyFormula";
export * from "./matchWipType";
export * from "./makeHistory";
export * from "./trees";

export function isCombinatorToken(token: QueryToken): token is CombinatorToken {
  return token && [
    TokenType.adjacent, TokenType.sibling, TokenType.child, TokenType.descendant, TokenType.parent,
  ].indexOf(token.type) > -1;
}

export function getDescendantPaths(tree, path: Path, skipStart = false): Collection {
  const elem = travelTree(tree, path);
  if (isTextNode(elem) || !elem.children.length) {
    return skipStart ? [] : [path];
  } else {
    return elem.children.reduce((mem, child, i) => {
      return mem.concat(getDescendantPaths(tree, path.concat(i)));
    }, skipStart ? [] : [path]);
  }
}

export function travelTree(tree: ContentNode, path: Path) {
  const remaining = path.slice();
  let elem = tree;
  while (remaining.length) {
    elem = elem.children[ remaining.shift() ] as ContentNode;
  }
  return elem;
}

export function travelArray(arr: any[], path: Path): any {
  let ret = arr;
  while (path.length) {
    ret = ret[path.shift()];
  }
  return ret;
}

export function collContainsPath(coll: Collection, path: Path): boolean {
  return coll.map((p) => p.join("-")).indexOf(path.join("-")) > -1;
}
