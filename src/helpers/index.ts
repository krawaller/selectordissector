import {VirtualElement, QueryToken, CombinatorToken, Path, Collection, TokenType} from '../types';

type Attrs = {[key:string]: string};

const elemFactory = type => (attrsOrChildren?: Attrs | VirtualElement[], childrenParam?: VirtualElement[]) => {
  let children: VirtualElement[];
  let attrs: Attrs;
  if (Array.isArray(attrsOrChildren)){
    children = attrsOrChildren;
  } else {
    attrs = attrsOrChildren || {};
    children = childrenParam || [];
  }
  return { type, attrs, children };
}

export const div = elemFactory('div');
export const span = elemFactory('span');

export function isCombinator(token: QueryToken): token is CombinatorToken {
  return token && [
    TokenType.adjacent, TokenType.sibling, TokenType.child, TokenType.descendant, TokenType.parent
  ].indexOf(token.type) > -1;
}

export function getDescendantPaths(tree, path: Path, skipStart = false): Collection {
  let elem = travelTree(tree, path);
  if (!elem.children || !elem.children.length){
    return skipStart ? [] : [path];
  } else {
    return elem.children.reduce((mem, child, i) => {
      return mem.concat(getDescendantPaths(tree, path.concat(i)));
    }, skipStart ? [] : [path]);
  }
}

export function travelTree(tree: VirtualElement, path: Path){
  const remaining = path.slice();
  let elem = tree;
  while(remaining.length){
    elem = elem.children[ remaining.shift() ];
  }
  return elem;
}
