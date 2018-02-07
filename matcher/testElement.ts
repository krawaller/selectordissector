import {ElementToken, PseudoToken, VirtualElement, Path} from '../types';
import {travelTree, matchPosition} from '../helpers';

export default function testElement(tree: VirtualElement, path: Path, token: ElementToken){
  let elem = travelTree(tree, path);
  switch(token.type){
    case 'universal': return true;
    case 'tag': return elem.type === token.name;
    case 'attribute': {
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
    case 'pseudo':
      switch(token.name){
        case 'first-child': return path.length === 0 || path[path.length-1] === 0;
        case 'last-child': return path.length === 0 || path[path.length-1] === travelTree(tree, path.slice(0, path.length - 1)).children.length - 1;
        case 'first-of-type': {
          if (!path.length) {
            return true;
          } else {
            const siblingPos = path[path.length - 1];
            const olderSiblings = travelTree(tree, path.slice(0, path.length - 1)).children.slice(0,siblingPos);
            return olderSiblings.filter(s => s.type === elem.type).length === 0;
          }
        }
        case 'last-of-type': {
          if (!path.length) {
            return true;
          } else {
            const siblingPos = path[path.length - 1];
            const youngerSiblings = travelTree(tree, path.slice(0, path.length - 1)).children.slice(siblingPos + 1);
            return youngerSiblings.filter(s => s.type === elem.type).length === 0;
          }
        }
        case 'only-of-type': {
          if (!path.length) {
            return true;
          } else {
            const siblings = travelTree(tree, path.slice(0, path.length - 1)).children;
            return siblings.filter(s => s.type === elem.type).length === 1;
          }
        }
        case 'empty': return !elem.children || elem.children.length === 0;
        case 'nth-child': {
          let formula = (<PseudoToken>token).data; //parseInt((<PseudoToken>token).data);
          let pos = path.length ? path[path.length-1] : 0;
          return matchPosition(pos, formula);
        }
      }
  }
}
