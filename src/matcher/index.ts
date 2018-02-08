import {ContentNode, VirtualElement, QueryToken, CombinatorToken, ElementToken, PseudoToken, Path, Collection} from '../types';
import {isTextNode} from '../builder';

import {isCombinator} from '../helpers';

import testElement from './testElement';
import combineFromPath from './combineFromPath';

export default function matcher(tree: VirtualElement, collection: Collection, token: QueryToken) {
  if (isTextNode(tree)){
    return [];
  }
  return isCombinator(token)
    ? collection.reduce((mem, path) => {
        let res = combineFromPath(tree, path, token as CombinatorToken);
        return mem.concat(res);
      }, [] as Collection)
    : collection.filter(path => testElement(tree, path, token as ElementToken));
}
