import {PseudoToken, QueryError, QueryToken} from "../types";

export function describeError(error: QueryError, token: QueryToken): string {
  const t = token as PseudoToken;
  switch (error) {
    case QueryError.parseError: return `Couldn't parse this part`;
    case QueryError.adjacentCombinators: return `A combinator cannot follow on another combinator`;
    case QueryError.leadingCombinator: return `Your selector cannot begin with a combinator`;
    case QueryError.parentCombinator: return `We have chosen not to implement the parent combinator`;
    case QueryError.faultyFormula: return `The :${t.name} pseudo selector argument is invalid`;
    case QueryError.missingParens: return `The :${t.name} pseudo selector should have parenthesis`;
    case QueryError.extraneousParens: return `The :${t.name} pseudo selector should not have parenthesis`;
    case QueryError.unknownPseudoSelector: return `We haven't implemented the :${t.name} pseudo selector`;
    case QueryError.faultyTypePosition: return `Types are only allowed after a combinator`;
  }
}
