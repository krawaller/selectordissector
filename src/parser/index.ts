import * as cssWhat from "css-what";

import {isCombinatorToken, matchWipType, travelArray} from "../helpers";
import {ErrorToken, QueryError, Selector, TokenType, WipType} from "../types";
import {validateSelector} from "../validator";

const wipMatcher = /^\.$|^\:$|^\[[^\]]*$|^#$|^\:[^ ]*\([^)]*$/g;

export default function(query: string): Selector[] {
  let result: Selector[];
  let usedQuery = query;
  while (!result && usedQuery.length) {
    try {
      result = cssWhat(usedQuery);
    } catch (e) {
      usedQuery = usedQuery.substr(0, usedQuery.length - 1);
    }
  }
  if (!result) {
    result = [[]];
  }
  let residue = query.substr(usedQuery.length);
  const finalPseudo = usedQuery.match(/\:[^ \()]*$/);
  if (residue.match(/^\([^\)]*$/) && finalPseudo) {
    // we want to treat ":foo(" as WIP parens before anything else
    residue = finalPseudo[0] + residue;
    usedQuery = usedQuery.substr(0, usedQuery.length - finalPseudo[0].length);
    result[0].pop();
  }
  const endingWithComb = result[0].length && isCombinatorToken(result[0][result[0].length - 1]);
  const validation = validateSelector(result[0]);
  if (residue) {
    if (!endingWithComb && usedQuery.substr(usedQuery.length - 1) === " ") {
      result[0].push({type: TokenType.descendant});
    }
    if (residue.match(wipMatcher)) {
      result[0].push({
        name: matchWipType(residue),
        type: TokenType.wip,
        value: residue,
      });
    } else if (residue === "::") {
      result[0].push({
        name: QueryError.pseudoElement,
        type: TokenType.error,
        value: {
          name: "",
          type: TokenType.pseudoElement,
        },
      });
    } else {
      result[0].push({
        name: QueryError.parseError,
        type: TokenType.error,
        value: {
          type: TokenType.unparsed,
          value: residue,
        },
      });
    }
  }
  if (validation) {
    const [error, selector, path] = validation;
    result[0] = result[0].slice(0, path[0]).concat({
      name: error,
      type: TokenType.error,
      value: travelArray(selector, path),
    } as ErrorToken);
  }
  if (endingWithComb && !residue && result[0].length > 1) {
    result[0].push({type: TokenType.wip, name: WipType.followComb, value: ""});
  }
  return result;
}
