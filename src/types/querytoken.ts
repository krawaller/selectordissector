import {QueryError} from "./";

export enum TokenType {
  start = "start",
  descendant = "descendant",
  child = "child",
  parent = "parent",
  sibling = "sibling",
  adjacent = "adjacent",
  tag = "tag",
  universal = "universal",
  pseudo = "pseudo",
  attribute = "attribute",
  wip = "wip",
  error = "error",
  unparsed = "unparsed",
  pseudoElement = "pseudo-element",
}

export type UniversalToken = {
  type: TokenType.universal,
};

export type TagToken = {
  type: TokenType.tag
  name: string,
};

export enum PseudoName {
  firstOfType = "first-of-type",
  lastOfType = "last-of-type",
  onlyOfType = "only-of-type",
  empty = "empty",
  firstChild = "first-child",
  lastChild = "last-child",
  nthOfType = "nth-of-type",
  nthChild = "nth-child",
  onlyChild = "only-child",
}

export type PseudoToken = {
  type: TokenType.pseudo
  name: PseudoName
  data?: any,
};

export type UnknownPseudoToken = {
  type: TokenType.pseudo
  name: string,
  data?: any,
};

export type PseudoElementToken = {
  type: TokenType.pseudoElement,
  name: string,
};

export enum AttributeAction {
  equals = "equals",
  exists = "exists",
  start = "start",
  end = "end",
  any = "any",
  element = "element", // element means it is a class test
  hyphen = "hyphen",
}

export type AttributeToken = {
  type: TokenType.attribute,
  name: string
  action: AttributeAction
  value?: string
  ignoreCase?: boolean,
};

export type ElementToken = UniversalToken | TagToken | PseudoToken | AttributeToken | PseudoElementToken | UnknownPseudoToken;

export type StartToken = {
  type: TokenType.start,
};

export type DescendantToken = {
  type: TokenType.descendant,
};

export type ChildToken = {
  type: TokenType.child,
};

export type SiblingToken = {
  type: TokenType.sibling,
};

export type AdjacentToken = {
  type: TokenType.adjacent,
};

export type ParentToken = {
  type: TokenType.parent,
};

export enum WipType {
  class = "class",
  id = "id",
  pseudo = "pseudo",
  attr = "attr",
  pseudoArg = "pseudoarg",
  followComb = "followcomb",
}

export type WipToken = {
  type: TokenType.wip,
  value: string,
  name: WipType,
};

export type ErrorToken = {
  type: TokenType.error,
  name: QueryError,
  value: QueryToken,
};

export type UnparsedToken = {
  type: TokenType.unparsed,
  value: string,
};

export type CombinatorToken = DescendantToken | ChildToken | SiblingToken | AdjacentToken | ParentToken;

export type QueryToken = CombinatorToken | ElementToken | StartToken | WipToken | ErrorToken | UnparsedToken;
