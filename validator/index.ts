import parser from '../parser';
import {QueryToken, TokenType} from '../types';
import {isCombinator} from '../helpers';

export enum QueryError {
  parseError = 'parseError',
  parentCombinator = 'parentCombinator',
  adjacentCombinators = 'adjacentCombinators',
  endingCombinator = 'endingCombinator',
  leadingCombinator = 'leadingCombinator',
  isPseudoSelector = 'isPseudoSelector',
  hasPseudoSelector = 'hasPseudoSelector',
  unknownPseudoSelector = 'unknownPseudoSelector',
  nthOfTypeDataError = 'nthOfTypeDataError',
}


type Context = {
  path: number[],
  pos: number,
  previous: QueryToken | null,
  remaining: QueryToken[]
}


function val(context: Context){
  if (context.remaining.length === 0) {
    return null;
  }
  const token = context.remaining[0];

  //console.log(token);

  if (token.type === 'parent' as TokenType){
    return [QueryError.parentCombinator, context.path.concat(context.pos)];
  }

  if (token.type === 'pseudo' && token.name === 'is'){
    return [QueryError.isPseudoSelector, context.path.concat(context.pos)];
  }

  if (token.type === 'pseudo' && token.name === 'has'){
    return [QueryError.hasPseudoSelector, context.path.concat(context.pos)];
  }

  if (token.type === 'pseudo' && token.name === 'nth-of-type'){
    if (token.data === null || token.data === '0' || !(!isNaN(token.data) || token.data === 'odd' || token.data === 'even')){
      return [QueryError.nthOfTypeDataError, context.path.concat(context.pos)];
    }
  }

  if (context.remaining.length === 1 && isCombinator(token)){
    return [QueryError.endingCombinator, context.path.concat(context.pos)];
  }

  if (context.pos === 0 && isCombinator(token)){
    return [QueryError.leadingCombinator, context.path.concat(context.pos)];
  }

  if (isCombinator(token) && isCombinator(context.previous)){
    return [QueryError.adjacentCombinators, context.path.concat(context.pos)];
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
    return [QueryError.parseError];
  }
}
