import {VirtualElement, QueryToken, CombinatorToken, Path, Collection, TokenType} from '../types';

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

export function collContainsPath(coll: Collection, path: Path): boolean {
  return coll.map(p => p.join('-')).indexOf(path.join('-')) > -1;
}

export function matchPosition(pos: number, formula: string){
  let match;
  if ((match = formula.match(/^-n\+([0-9]+)$/))){
    let max = match[1];
    return pos < max;
  } else if ((match = formula.match(/^[0-9]+$/))){
    let n = +formula;
    return pos === n - 1;
  } else if ((match = formula.match(/^([0-9]+)n\+([0-9]+)$/))){
    let multiplier = +match[1];
    let offset = +match[2];
    let n = (pos + 1 - offset) / multiplier;
    return n === Math.floor(n);
  } else if ((match = formula.match(/^([0-9]+)n\-([0-9]+)$/))){
    let multiplier = +match[1];
    let offset = +match[2] * -1;
    let n = (pos + 1 - offset) / multiplier;
    return n === Math.floor(n);
  } else if ((match = formula.match(/^([0-9]+)n$/))){
    let multiplier = +match[1];
    let n = (pos + 1) / multiplier;
    return n === Math.floor(n);
  } else if (formula === 'even'){
    let multiplier = 2;
    let n = (pos + 1) / multiplier;
    return n === Math.floor(n);
  } else if (formula === 'odd'){
    let multiplier = 2;
    let offset = 1;
    let n = (pos + 1 + offset) / multiplier;
    return n === Math.floor(n);
  } else {
    throw "Unknown formula! " + formula;
  }
}
