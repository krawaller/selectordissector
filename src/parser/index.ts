import * as cssWhat from "css-what";

import {ErrorToken, QueryError, Selector, TokenType} from "../types";

import {travelArray} from "../helpers";

import {validateSelector} from "../validator";

const residue = /\.$|\:$|\[[^\]]*$|#$/g;

export default function(query: string): Selector[] {
  const wip = query.match(residue);
  let result: Selector[];
  try {
    result = cssWhat(query.replace(residue, ""));
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
  if (validation) {
    const [error, selector, path] = validation;
    result[0] = result[0].slice(0, path[0]).concat({
      name: error,
      type: TokenType.error,
      value: travelArray(selector, path),
    } as ErrorToken);
  } else if (wip) {
    result[0].push({
      type: TokenType.wip,
      value: wip[0],
    });
  }
  return result;
}
