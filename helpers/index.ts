import {VirtualElement, QueryToken} from '../types';

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

export function isCombinator(token: QueryToken){
  return token && !!{
    parent: 1,
    child: 1,
    adjacent: 1,
    sibling: 1
  }[token.type];
}

export function getDescendantPaths(tree, path, skipStart = false){
  let elem = travelTree(tree, path);
  if (!elem.children || !elem.children.length){
    return skipStart ? [] : [path];
  } else {
    return elem.children.reduce((mem, child, i) => {
      return mem.concat(getDescendantPaths(tree, path.concat(i)));
    }, skipStart ? [] : [path]);
  }
}

export function travelTree(tree: VirtualElement, path: number[]){
  const remaining = path.slice();
  let elem = tree;
  while(remaining.length){
    elem = elem.children[ remaining.shift() ];
  }
  return elem;
}