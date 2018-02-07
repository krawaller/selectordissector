import {ElementToken, PseudoToken, VirtualElement, Path, TokenType, PseudoName, AttributeAction} from '../types';
import {travelTree, matchPosition} from '../helpers';

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
        case AttributeAction.exists: return true;
        case AttributeAction.equals: return value === token.value;
        case AttributeAction.start: return !!(value && (value.substr(0, token.value.length) === token.value));
        case AttributeAction.end: return !!(value && (value.substr(-token.value.length) === token.value));
        case AttributeAction.element: { // means querying for class!
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
          let formula = (<PseudoToken>token).data;
          let pos = path.length ? path[path.length-1] : 0;
          return matchPosition(pos, formula);
        }
        case PseudoName.nthOfType: {
          let formula = (<PseudoToken>token).data;
          let pos = 0;
          if (path.length){
            let parent = travelTree(tree, path.slice(0, path.length-1))
            pos = travelTree(tree, path.slice(0, path.length-1)).children.filter(c => c.type === elem.type).indexOf(elem);
          }
          return matchPosition(pos, formula);
        }
        default: throw "Unknown pseudo name: " + token.name;
      }
  }
}
