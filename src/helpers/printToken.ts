import {AttributeAction, AttributeToken, PseudoToken, QueryError, QueryToken, TagToken, TokenType, WipType } from "../types";

export function printToken(token: QueryToken): string {
  switch (token.type) {
    case TokenType.error: return printToken(token.value) + (token.name === QueryError.extraneousParens && !(token.value as PseudoToken).data ? "()" : "");
    case TokenType.wip: {
      switch (token.name) {
        case WipType.followComb: return "…";
        default: return token.value;
      }
    }
    case TokenType.tag: return (token as TagToken).name;
    case TokenType.universal: return "*";
    case TokenType.start: return "*";
    case TokenType.child: return ">";
    case TokenType.parent: return "<";
    case TokenType.unparsed: return token.value;
    case TokenType.descendant: return "(space)";
    case TokenType.attribute: {
      const t = token as AttributeToken;
      switch (t.action) {
        case AttributeAction.element: {
          return t.name === "class" ? `.${t.value}` : `[${t.name}~=${t.value}]`;
        }
        case AttributeAction.exists: return `[${t.name}]`;
        case AttributeAction.equals: return t.name === "id" ? `#${t.value}` : `[${t.name}=${t.value}]`;
        case AttributeAction.start: return `[${t.name}^=${t.value}]`;
        case AttributeAction.end: return `[${t.name}$=${t.value}]`;
        case AttributeAction.any: return `[${t.name}*=${t.value}]`;
        case AttributeAction.hyphen: return `[${t.name}|=${t.value}]`;
      }
    }
    case TokenType.adjacent: return "+";
    case TokenType.sibling: return "~";
    case TokenType.pseudo: {
      let parens = "";
      if (token.data) {
        if (token.name === "has" || token.name === "not") {
          parens = token.data[0].reduce((m, t) => m + printToken(t), "");
        } else {
          parens = token.data;
        }
      }
      return `:${token.name}${parens && `(${parens})`}`;
    }
    case TokenType.pseudoElement: return `::${token.name}`;
  }
}
