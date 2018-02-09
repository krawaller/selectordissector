import {VirtualElement, QueryToken, CombinatorToken, ElementToken, Path, Collection, MatchResult} from '../types';
import {isTextNode} from '../builder';

import {isCombinatorToken} from '../helpers';

import testElement from './testElement';
import combineFromPath from './combineFromPath';

export default function matcher(tree: VirtualElement, collection: Collection, token: QueryToken): MatchResult {
  if (isTextNode(tree)){
    return {result: []};
  }
  const result = isCombinatorToken(token)
    ? collection.reduce((mem, path) => {
        let res = combineFromPath(tree, path, token as CombinatorToken);
        return mem.concat(res);
      }, [] as Collection)
    : collection.filter(path => testElement(tree, path, token as ElementToken));
  return {result};
}
