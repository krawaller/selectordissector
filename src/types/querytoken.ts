export enum TokenType {
  descendant = 'descendant',
  child = 'child',
  sibling = 'sibling',
  adjacent = 'adjacent',
  tag = 'tag',
  universal = 'universal',
  pseudo = 'pseudo',
  attribute = 'attribute'
}

export type UniversalToken = {
  type: TokenType.universal
};

export type TagToken = {
  type: TokenType.tag
  name: string
};

export enum PseudoName {
  firstOfType = 'first-of-type',
  lastOfType = 'last-of-type',
  onlyOfType = 'only-of-type',
  empty = 'empty',
  is = 'is',
  has = 'has',
  firstChild = 'first-child',
  lastChild = 'last-child',
  nthOfType = 'nth-of-type',
  nthChild = 'nthChild',
  not = 'not'
}

export type PseudoToken = {
  type: TokenType.pseudo
  name: PseudoName
  data?: any
}

export enum AttributeAction {
  equals = 'equals',
  exists = 'exists',
  start = 'start',
  end = 'end',
  element = 'element'  // element means it is a class test
}

export type AttributeToken = {
  type: TokenType.attribute,
  name: string
  action: AttributeAction
  value?: string
  ignoreCase?: boolean
}

export type ElementToken = UniversalToken | TagToken | PseudoToken | AttributeToken;

export type DescendantToken = {
  type: TokenType.descendant
};

export type ChildToken = {
  type: TokenType.child
}

export type SiblingToken = {
  type: TokenType.sibling
}

export type AdjacentToken = {
  type: TokenType.adjacent
}

export type CombinatorToken = DescendantToken | ChildToken | SiblingToken | AdjacentToken;

export type QueryToken = CombinatorToken | ElementToken;
