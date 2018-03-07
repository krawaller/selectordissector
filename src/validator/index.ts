import {classifyFormula, isCombinatorToken} from "../helpers";
import parser from "../parser";
import {ErrorToken, FormulaType, Path, PseudoName, QueryError, QueryToken, Selector, TokenType, ValidationDetailedError, ValidationError} from "../types";

const usesFormula = [PseudoName.nthChild, PseudoName.nthOfType];
const needsParens = [PseudoName.nthChild, PseudoName.nthOfType];

type Context = {
  path: number[],
  pos: number,
  previous: QueryToken | null,
  remaining: QueryToken[],
  tokens: QueryToken[],
};

function fail(error: QueryError, context: Context): ValidationDetailedError {
  return [error, context.tokens, context.path.concat(context.pos)];
}

function val(context: Context): ValidationDetailedError {
  if (context.remaining.length === 0) {
    return null;
  }
  const token = context.remaining[0];

  if (token.type === TokenType.pseudo && Object.keys(PseudoName).map((k) => PseudoName[k]).indexOf(token.name) === -1) {
    return fail(QueryError.unknownPseudoSelector, context);
  }

  if (token.type === TokenType.parent) {
    return fail(QueryError.parentCombinator, context);
  }

  if (context.remaining.length === 1 && isCombinatorToken(token)) {
    return fail(QueryError.endingCombinator, context);
  }

  if (context.pos === 0 && isCombinatorToken(token)) {
    return fail(QueryError.leadingCombinator, context);
  }

  if (isCombinatorToken(token) && isCombinatorToken(context.previous)) {
    return fail(QueryError.adjacentCombinators, context);
  }

  if (token.type === TokenType.pseudo && needsParens.indexOf(token.name) > -1 && token.data === null) {
    return fail(QueryError.missingParens, context);
  }

  if (token.type === TokenType.pseudo && needsParens.indexOf(token.name) === -1 && token.data !== null) {
    return fail(QueryError.extraneousParens, context);
  }

  if (token.type === TokenType.pseudo && usesFormula.indexOf(token.name) > -1) {
    if (classifyFormula(token.data)[0] === FormulaType.unknown) {
      return fail(QueryError.faultyFormula, context);
    }
  }

  if (token.type === TokenType.error) {
    return fail(token.name, context);
  }

  return val({
    path: context.path,
    pos: context.pos + 1,
    previous: token,
    remaining: context.remaining.slice(1),
    tokens: context.tokens,
  });
}

export function validateSelector(sel: Selector): ValidationDetailedError {
  return val({
    path: [],
    pos: 0,
    previous: null,
    remaining: sel,
    tokens: sel,
  });
}

export default function validateQuery(query: string): ValidationError | null {
  const q = parser(query)[0]; // TODO - handle multiple!
  return val({
    path: [],
    pos: 0,
    previous: null,
    remaining: q,
    tokens: q,
  });
}
