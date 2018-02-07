import {VirtualElement, CombinatorToken, TokenType} from '../types';
import {getDescendantPaths, travelTree} from '../helpers';

export default function combineFromPath(tree: VirtualElement, path: number[], token: CombinatorToken){
  switch(token.type){
    case TokenType.descendant: {
      return getDescendantPaths(tree, path, true);
    }
    case TokenType.child: {
      return (travelTree(tree, path).children || []).map((c,i) => path.concat(i))
    }
    case TokenType.adjacent: {
      return path[path.length-1] ? [path.slice(0,path.length-1).concat( path[path.length-1] - 1)] : [];
    }
    case TokenType.sibling: {
      return Array.from(Array(path[path.length-1]||0).keys()).map(n => path.slice(0,path.length-1).concat(n));
    }
  }
}
