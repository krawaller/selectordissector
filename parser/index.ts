import * as cssWhat from 'css-what';

import {QueryToken} from '../types';

export default function (query: string): QueryToken[][] {
  return cssWhat(query);
}
