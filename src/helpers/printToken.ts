import {AttributeAction, AttributeToken, QueryToken, TagToken, TokenType} from "../types";

export function printToken(token: QueryToken): string {
  switch (token.type) {
    case TokenType.tag: return (token as TagToken).name;
    case TokenType.universal: return "*";
    case TokenType.start: return "*";
    case TokenType.child: return ">";
    case TokenType.descendant: return "_";
    case TokenType.attribute: {
      const t = token as AttributeToken;
      switch (t.action) {
        case AttributeAction.element: return `.${t.value}`;
        case AttributeAction.exists: return `[${t.name}]`;
        case AttributeAction.equals: return `[${t.name}=${t.value}]`;
        // TODO - start and end etc
      }
    }
    case TokenType.adjacent: return "+";
    case TokenType.sibling: return "~";
    case TokenType.pseudo: return `:${token.name}` + (token.data ? `(${token.data})` : "");
  }
}
