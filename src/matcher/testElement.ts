import {ElementToken, PseudoToken, VirtualElement, Path, TokenType, PseudoName} from '../types';
import {travelTree} from '../helpers';

export default function testElement(tree: VirtualElement, path: Path, token: ElementToken){
  let elem = travelTree(tree, path);
  switch(token.type){
    case TokenType.universal: return true;
    case TokenType.tag: return elem.type === token.name;
    case TokenType.attribute: {
      if (!elem.attrs || !elem.attrs.hasOwnProperty(token.name)){
        return false;
      }
      const value = elem.attrs[token.name];
      switch(token.action){
        case 'exists': return true;
        case 'equals': return value === token.value;
        case 'start': return !!(value && (value.substr(0, token.value.length) === token.value));
        case 'end': return !!(value && (value.substr(-token.value.length) === token.value));
        case 'element': { // means querying for class!
          return typeof value === 'string' && !!value.match(new RegExp(`^${token.value} |^${token.value}$| ${token.value} | ${token.value}$`));
        }
      }
    }
    case TokenType.pseudo:
      switch(token.name){
        case PseudoName.firstChild: return path.length === 0 || path[path.length-1] === 0;
        case PseudoName.lastChild: return path.length === 0 || path[path.length-1] === travelTree(tree, path.slice(0, path.length - 1)).children.length - 1;
        case PseudoName.firstOfType: {
          if (!path.length) {
            return true;
          } else {
            const siblingPos = path[path.length - 1];
            const olderSiblings = travelTree(tree, path.slice(0, path.length - 1)).children.slice(0,siblingPos);
            return olderSiblings.filter(s => s.type === elem.type).length === 0;
          }
        }
        case PseudoName.lastOfType: {
          if (!path.length) {
            return true;
          } else {
            const siblingPos = path[path.length - 1];
            const youngerSiblings = travelTree(tree, path.slice(0, path.length - 1)).children.slice(siblingPos + 1);
            return youngerSiblings.filter(s => s.type === elem.type).length === 0;
          }
        }
        case PseudoName.onlyOfType: {
          if (!path.length) {
            return true;
          } else {
            const siblings = travelTree(tree, path.slice(0, path.length - 1)).children;
            return siblings.filter(s => s.type === elem.type).length === 1;
          }
        }
        case PseudoName.empty: return !elem.children || elem.children.length === 0;
        case PseudoName.nthChild: {
          let formula = (<PseudoToken>token).data; //parseInt((<PseudoToken>token).data);
          let pos = path.length ? path[path.length-1] : 0;
          return matchPosition(pos, formula);
        }
      }
  }
}

function matchPosition(pos: number, formula: string){
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
