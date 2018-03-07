import * as cssWhat from "css-what";

import {Selector, TokenType} from "../types";

const residue = /\.$|\:$|\[[^\]]*$|#$/g;

export default function(query: string): Selector[] {
  const wip = query.match(residue);
  if (wip) {
    const result = cssWhat(query.replace(residue, ""));
    result[0].push({
      type: TokenType.wip,
      value: wip[0],
    });
    return result;
  } else {
    return cssWhat(query);
  }
}
