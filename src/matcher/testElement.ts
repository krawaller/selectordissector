import {ElementToken, PseudoToken, VirtualElement, Path, TokenType, PseudoName, AttributeAction, FormulaType, TextNode, ContentNode} from '../types';
import {travelTree, classifyFormula} from '../helpers';
import {TEXTNODE, isTextNode} from '../builder';

export default function testElement(tree: ContentNode, path: Path, token: ElementToken){
  let elem = travelTree(tree, path);
  if (isTextNode(elem)){
    return false;
  }
  switch(token.type){
    case TokenType.universal: return true;
    case TokenType.tag: return elem.type === token.name;
    case TokenType.attribute: {
      if (!elem.attrs || !elem.attrs.hasOwnProperty(token.name)){
        return false;
      }
      const value = elem.attrs[token.name];
      switch(token.action){
        case AttributeAction.exists: return true;
        case AttributeAction.equals: return value === token.value;
        case AttributeAction.start: return !!(value && (value.substr(0, token.value.length) === token.value));
        case AttributeAction.end: return !!(value && (value.substr(-token.value.length) === token.value));
        case AttributeAction.element: { // means querying for class!
          return typeof value === 'string' && !!value.match(new RegExp(`^${token.value} |^${token.value}$| ${token.value} | ${token.value}$`));
        }
      }
    }
    case TokenType.pseudo: {
      const parent = path.length > 0 ? travelTree(tree, path.slice(0, path.length - 1)) as ContentNode : null;
      const nonTextIndexes = parent ? parent.children.map((c,n) => n).filter(n => parent.children[n].type !== TEXTNODE) : [0];
      const elemPos = path.length === 0 ? 0 : path[path.length-1];
      const elemNonTextPos = nonTextIndexes.indexOf(elemPos);
      switch(token.name){
        case PseudoName.firstChild: return nonTextIndexes[0] === elemPos;
        case PseudoName.lastChild: return nonTextIndexes[nonTextIndexes.length-1] === elemPos;
        case PseudoName.firstOfType: {
          if (!path.length) {
            return true;
          } else {
            const olderSiblings = parent.children.slice(0,elemPos);
            return olderSiblings.filter(s => s.type === elem.type).length === 0;
          }
        }
        case PseudoName.lastOfType: {
          if (!path.length) {
            return true;
          } else {
            const siblingPos = path[path.length - 1];
            const youngerSiblings = parent.children.slice(siblingPos + 1);
            return youngerSiblings.filter(s => s.type === elem.type).length === 0;
          }
        }
        case PseudoName.onlyOfType: {
          if (!path.length) {
            return true;
          } else {
            const siblings = parent.children;
            return siblings.filter(s => s.type === elem.type).length === 1;
          }
        }
        case PseudoName.empty: return !elem.children || elem.children.length === 0;
        case PseudoName.nthChild: {
          let formula = (<PseudoToken>token).data;
          return matchPosition(elemNonTextPos, formula);
        }
        case PseudoName.nthOfType: {
          let formula = (<PseudoToken>token).data;
          let pos = 0;
          if (path.length){
            pos = parent.children.filter(c => c.type === elem.type).indexOf(elem);
          }
          return matchPosition(pos, formula);
        }
        case PseudoName.onlyChild: {
          return nonTextIndexes.length === 1;
        }
        default: throw "Unknown pseudo name: " + token.name;
      }
    }
  }
}

export function matchPosition(pos: number, formula: string){
  const classification = classifyFormula(formula);
  switch(classification[0]){
    case FormulaType.negAndOffset: {
      let max = +classification[1];
      return pos < max;
    }
    case FormulaType.exact: {
      let n = +classification[1];
      return pos === n - 1;
    }
    case FormulaType.multAndPosOffset: {
      let multiplier = +classification[1];
      let offset = +classification[2];
      let n = (pos + 1 - offset) / multiplier;
      return n === Math.floor(n);
    }
    case FormulaType.multAndNegOffset: {
      let multiplier = +classification[1];
      let offset = +classification[2] * -1;
      let n = (pos + 1 - offset) / multiplier;
      return n === Math.floor(n);
    }
    case FormulaType.mult: {
      let multiplier = +classification[1];
      let n = (pos + 1) / multiplier;
      return n === Math.floor(n);
    }
    case FormulaType.even: {
      let multiplier = 2;
      let n = (pos + 1) / multiplier;
      return n === Math.floor(n);
    }
    case FormulaType.odd: {
      let multiplier = 2;
      let offset = 1;
      let n = (pos + 1 + offset) / multiplier;
      return n === Math.floor(n);
    }
    default: throw "Unknown formula type: " + FormulaType;
  }
}
