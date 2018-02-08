import {VirtualElement, QueryToken, CombinatorToken, Path, Collection, TokenType, FormulaType, FormulaClassification} from '../types';

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

export function classifyFormula(formula: string): FormulaClassification {
  let match;
  if ((match = formula.match(/^-n\+([0-9]+)$/))){ // -n+2
    let max = +match[1];
    return [FormulaType.negAndOffset, match[1]];
  } else if ((match = formula.match(/^[1-9][0-9]*$/))){ // 5
    return [FormulaType.exact, +formula];
  } else if ((match = formula.match(/^([0-9]+)n\+([0-9]+)$/))){ // 2n+3
    let multiplier = +match[1];
    let offset = +match[2];
    return [FormulaType.multAndPosOffset, multiplier, offset];
  } else if ((match = formula.match(/^([0-9]+)n\-([0-9]+)$/))){ // 2n-3
    let multiplier = +match[1];
    let offset = +match[2] * -1;
    return [FormulaType.multAndNegOffset, multiplier, offset];
  } else if ((match = formula.match(/^([0-9]+)n$/))){ // 5n
    let multiplier = +match[1];
    return [FormulaType.mult, multiplier];
  } else if (formula === 'even'){
    return [FormulaType.even];
  } else if (formula === 'odd'){
    return [FormulaType.odd];
  } else {
    return [FormulaType.unknown];
  }
}
