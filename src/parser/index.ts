import * as cssWhat from "css-what";

import {isCombinatorToken, matchWipType, travelArray} from "../helpers";
import {ErrorToken, QueryError, Selector, TokenType, WipType} from "../types";
import {validateSelector} from "../validator";

const residue = /\.$|\:$|\[[^\]]*$|#$|\:[^ ]*\([^)]*$/g;

export default function(query: string): Selector[] {
  const wip = query.match(residue);
  const shortQuery = query.replace(residue, "");
  let result: Selector[];
  try {
    result = cssWhat(shortQuery);
  } catch (e) {
    return [[{
      name: QueryError.parseError,
      type: TokenType.error,
      value: {
        type: TokenType.unparsed,
        value: query,
      },
    }]];
  }
  const validation = validateSelector(result[0]);

  if (validation && !(wip && validation[0] === QueryError.endingCombinator)) {
    const [error, selector, path] = validation;
    result[0] = result[0].slice(0, path[0]).concat({
      name: error,
      type: TokenType.error,
      value: travelArray(selector, path),
    } as ErrorToken);
  } else if (wip) {
    if (shortQuery.substr(shortQuery.length - 1) === " " && !isCombinatorToken(result[0][result[0].length - 1])) {
      result[0].push({type: TokenType.descendant});
    }
    result[0].push({
      name: matchWipType(wip[0]),
      type: TokenType.wip,
      value: wip[0],
    });
  }
  return result;
}
