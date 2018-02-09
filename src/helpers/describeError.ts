import {QueryError} from '../types';

export function describeError(error: QueryError): string {
  switch(error){
    case QueryError.adjacentCombinators: return `A combinator cannot follow on another combinator`;
    case QueryError.endingCombinator: return `Your selector cannot end with a combinator`;
    case QueryError.extraneousParens: return `This pseudo selector should not have parenthesis`;
    case QueryError.faultyFormula: return `The pseudo selector argument is invalid`;
    case QueryError.leadingCombinator: return `Your selector cannot begin with a combinator`;
    case QueryError.missingParens: return `This pseudo selector should have parenthesis`;
    case QueryError.parentCombinator: return `We have chosen not to implement the parent combinator`;
    case QueryError.parseError: return `Couldn't parse the selector`;
    case QueryError.unknownPseudoSelector: return `We haven't implemented this pseudo selector`;
  }
}