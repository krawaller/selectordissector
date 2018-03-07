import * as cssWhat from "css-what";

import {QueryError, Selector, TokenType} from "../types";

const residue = /\.$|\:$|\[[^\]]*$|#$/g;

export default function(query: string): Selector[] {
  const wip = query.match(residue);
  try {
    const result = cssWhat(query.replace(residue, ""));
    if (wip) {
      result[0].push({
        type: TokenType.wip,
        value: wip[0],
      });
    }
    return result;
  } catch (e) {
    return [[{
      name: QueryError.parseError,
      type: TokenType.error,
      value: query,
    }]];
  }
}
