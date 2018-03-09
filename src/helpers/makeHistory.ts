import { HistoryStep, QueryToken, Selector, TokenType, VirtualElement } from "../types";

import matcher from "../matcher";
import {getDescendantPaths} from "./";

export function makeHistory(selector: Selector, tree: VirtualElement) {
  const start: QueryToken = {type: TokenType.start};
  return selector.reduce( (acc, token) => acc.concat({
    coll: matcher(tree, acc[acc.length - 1].coll, token).result,
    token,
  }), [{token: start, coll: getDescendantPaths(tree, [])} as HistoryStep] );
}
