import {PseudoToken, QueryToken, TagToken, TokenType} from "../../types";
import describeAttribute from "./describeAttribute";
import describeError from "./describeError";
import describePseudo from "./describePseudo";
import describeWip from "./describeWip";

export function describeToken(token: QueryToken): string {
  switch (token.type) {
    case TokenType.error: return describeError(token.name, token.value );
    case TokenType.wip: return describeWip(token);
    case TokenType.start: return `Start with all elements in the entire document.`;
    case TokenType.tag: return `Keep only the elements where the type is "${(token as TagToken).name}".`;
    case TokenType.universal: return `Keep all of those elements.`;
    case TokenType.child: return `Now take all children of those elements.`;
    case TokenType.descendant: return `Now take all descendants of those elements.`;
    case TokenType.attribute: return describeAttribute(token);
    case TokenType.adjacent: return `Now take all adjacent younger siblings of those elements.`;
    case TokenType.sibling: return `Now take all younger siblings of those elements.`;
    case TokenType.pseudo: return describePseudo(token as PseudoToken);
  }
}
