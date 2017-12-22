export type TokenType = 'tag' | 'descendant' | 'child' | 'sibling' | 'adjacent' | 'universal';

export type UniversalToken = {
  type: 'universal'
};

export type TagToken = {
  type: 'tag'
  name: string
};

export type PseudoToken = {
  type: 'pseudo'
  name: 'first-of-type' | 'last-of-type' | 'only-of-type' | 'empty' | 'is' | 'has' | 'first-child' | 'last-child'
  data?: any
}

export type AttributeToken = {
  type: 'attribute'
  name: string
  action: 'equals' | 'exists' | 'start' | 'end' | 'element' // element means it is a class test
  value?: string
}

export type ElementToken = UniversalToken | TagToken | PseudoToken | AttributeToken;

export type DescendantToken = {
  type: 'descendant'
};

export type ChildToken = {
  type: 'child'
}

export type SiblingToken = {
  type: 'sibling'
}

export type AdjacentToken = {
  type: 'adjacent'
}

export type CombinatorToken = DescendantToken | ChildToken | SiblingToken | AdjacentToken;

export type QueryToken = CombinatorToken | ElementToken;
