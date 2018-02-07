import {VirtualElement, QueryToken, CombinatorToken, Path, Collection, TokenType} from '../types';

type Attrs = {[key:string]: string};

export const builderFactory = type => (attrParam: Attrs | VirtualElement[] | string = {}, childrenParam: VirtualElement[] | string = []) => {
  let children: VirtualElement[];
  let content: string;
  if (Array.isArray(attrParam) || typeof attrParam === 'string'){
    childrenParam = attrParam;
    attrParam = {};
  }
  if (typeof childrenParam === 'string'){
    content = childrenParam;
    children = [];
  } else {
    children = childrenParam;
    content = '';
  }
  return { type, attrs: attrParam, children, content };
}

export const div = builderFactory('div');
export const span = builderFactory('span');

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
