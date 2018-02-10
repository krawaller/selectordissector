import * as cssWhat from "css-what";

import {Selector} from "../types";

export default function(query: string): Selector[] {
  return cssWhat(query);
}
