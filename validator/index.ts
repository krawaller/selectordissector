import parser from '../parser';
import {QueryToken, QueryError, TokenType} from '../types';

export const parseError: QueryError = 'parseError';
export const parentCombinator: QueryError = 'parentCombinator';
export const adjacentCombinators: QueryError = 'adjacentCombinators';
export const endingCombinator: QueryError = 'endingCombinator';
export const leadingCombinator: QueryError = 'leadingCombinator';
export const isPseudoSelector: QueryError = 'isPseudoSelector';
export const hasPseudoSelector: QueryError = 'hasPseudoSelector';
export const unknownPseudoSelector: QueryError = 'unknownPseudoSelector';

type Context = {
  path: number[],
  pos: number,
  previous: QueryToken | null,
  remaining: QueryToken[]
}

function isCombinator(token: QueryToken){
  return token && !!{
    parent: 1,
    child: 1,
    adjacent: 1,
    sibling: 1
  }[token.type];
}

function val(context: Context){
  if (context.remaining.length === 0) {
    return null;
  }
  const token = context.remaining[0];

  console.log(token);

  if (token.type === 'parent' as TokenType){
    return [parentCombinator, context.path.concat(context.pos)];
  }

  if (token.type === 'pseudo' && token.name === 'is'){
    return [isPseudoSelector, context.path.concat(context.pos)];
  }

  if (token.type === 'pseudo' && token.name === 'has'){
    return [hasPseudoSelector, context.path.concat(context.pos)];
  }

  if (context.remaining.length === 1 && isCombinator(token)){
    return [endingCombinator, context.path.concat(context.pos)];
  }

  if (context.pos === 0 && isCombinator(token)){
    return [leadingCombinator, context.path.concat(context.pos)];
  }

  if (isCombinator(token) && isCombinator(context.previous)){
    return [adjacentCombinators, context.path.concat(context.pos)];
  }

  return val({
    path: context.path,
    pos: context.pos + 1,
    previous: token,
    remaining: context.remaining.slice(1)
  });
}

export default function validate(query: string){
  try {
    const q = parser(query)[0]; // TODO - handle multiple!
    return val({
      path: [],
      pos: 0,
      previous: null,
      remaining: q
    });
  } catch(e) {
    return [parseError];
  }
}
