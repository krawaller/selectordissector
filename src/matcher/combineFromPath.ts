import {getDescendantPaths, travelTree} from "../helpers";
import {CombinatorToken, ContentNode, TokenType} from "../types";

export default function combineFromPath(tree: ContentNode, path: number[], token: CombinatorToken) {
  switch (token.type) {
    case TokenType.descendant: {
      return getDescendantPaths(tree, path, true);
    }
    case TokenType.child: {
      return ((travelTree(tree, path) as ContentNode).children || []).map((c, i) => path.concat(i));
    }
    case TokenType.adjacent: {
      if (!path.length) {
        return [];
      } else {
        const pos = path[path.length - 1];
        const tail = path.slice(0, path.length - 1);
        const siblingCount = (travelTree(tree, tail) as ContentNode).children.length; // TODO - filter textnodes?
        if (siblingCount === pos + 1) {
          return [];
        } else {
          return [tail.concat(pos + 1)];
        }
      }
    }
    case TokenType.sibling: {
      if (!path.length) {
        return [];
      } else {
        const pos = path[path.length - 1];
        const tail = path.slice(0, path.length - 1);
        const youngerSiblings = (travelTree(tree, tail) as ContentNode).children.slice(pos + 1); // TODO - filter textnodes?
        return youngerSiblings.map((c, n) => tail.concat(n + pos + 1));
      }
    }
  }
}
