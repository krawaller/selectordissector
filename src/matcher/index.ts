import {isTextNode} from "../builder";
import {Collection, CombinatorToken, ElementToken, MatchResult, QueryToken, VirtualElement} from "../types";

import {isCombinatorToken} from "../helpers";

import combineFromPath from "./combineFromPath";
import testElement from "./testElement";

export default function matcher(tree: VirtualElement, collection: Collection, token: QueryToken): MatchResult {
  if (isTextNode(tree)) {
    return {result: []};
  }
  const result = isCombinatorToken(token)
    ? collection.reduce((mem, path) => {
        const res = combineFromPath(tree, path, token as CombinatorToken);
        return mem.concat(res);
      }, [] as Collection)
    : collection.filter((path) => testElement(tree, path, token as ElementToken));
  return {result};
}
