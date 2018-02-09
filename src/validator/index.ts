import parser from '../parser';
import {QueryToken, TokenType, PseudoName, Path, FormulaType} from '../types';
import {isCombinatorToken, classifyFormula} from '../helpers';

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
  unImplemented = 'unImplemented',
  faultyFormula = 'faultyFormula',
  missingParens = 'missingParens',
  extraneousParens = 'extraneousParens'
}

const usesFormula = [PseudoName.nthChild, PseudoName.nthOfType];
const needsParens = [PseudoName.nthChild, PseudoName.nthOfType];

const unImplementedPseudos = [PseudoName.not];

type Context = {
  path: number[],
  pos: number,
  previous: QueryToken | null,
  remaining: QueryToken[]
}

function fail(error: QueryError, context: Context){
  return [error, context.path.concat(context.pos)];
}

function val(context: Context){
  if (context.remaining.length === 0) {
    return null;
  }
  const token = context.remaining[0];

  if (token.type === TokenType.pseudo && Object.keys(PseudoName).map(k => PseudoName[k]).indexOf(token.name) === -1){
    return fail(QueryError.unknownPseudoSelector, context);
  }

  if (token.type === TokenType.pseudo && unImplementedPseudos.indexOf(token.name) !== -1){
    return fail(QueryError.unImplemented, context);
  }

  if (token.type === TokenType.parent){
    return fail(QueryError.parentCombinator, context);
  }

  if (token.type === TokenType.pseudo && token.name === 'is'){
    return fail(QueryError.isPseudoSelector, context);
  }

  if (token.type === TokenType.pseudo && token.name === 'has'){
    return fail(QueryError.hasPseudoSelector, context);
  }

  if (context.remaining.length === 1 && isCombinatorToken(token)){
    return fail(QueryError.endingCombinator, context);
  }

  if (context.pos === 0 && isCombinatorToken(token)){
    return fail(QueryError.leadingCombinator, context);
  }

  if (isCombinatorToken(token) && isCombinatorToken(context.previous)){
    return fail(QueryError.adjacentCombinators, context);
  }

  if (token.type === TokenType.pseudo && needsParens.indexOf(token.name) > -1 && token.data === null){
    return fail(QueryError.missingParens, context);
  }

  if (token.type === TokenType.pseudo && needsParens.indexOf(token.name) === -1 && token.data !== null){
    return fail(QueryError.extraneousParens, context);
  }

  if (token.type === TokenType.pseudo && usesFormula.indexOf(token.name) > -1){
    if (classifyFormula(token.data)[0] === FormulaType.unknown){
      return fail(QueryError.faultyFormula, context);
    }
  }

  return val({
    path: context.path,
    pos: context.pos + 1,
    previous: token,
    remaining: context.remaining.slice(1)
  });
}

export default function validate(query: string) : [QueryError] | [QueryError, Path] | null {
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
