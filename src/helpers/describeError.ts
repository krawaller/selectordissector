import {travelArray} from "../helpers";
import {PseudoToken, QueryError, ValidationDetailedError, ValidationError} from "../types";

export function describeError(valError: ValidationError): string {
  if (valError[0] === QueryError.parseError) { return `Couldn't parse the selector`; }
  const [error, tokens, path] = valError as ValidationDetailedError;
  const token: PseudoToken = travelArray(tokens, path);
  switch (valError[0]) {
    case QueryError.parseError: return `Couldn't parse the selector`;
    case QueryError.adjacentCombinators: return `A combinator cannot follow on another combinator`;
    case QueryError.endingCombinator: return `Your selector cannot end with a combinator`;
    case QueryError.leadingCombinator: return `Your selector cannot begin with a combinator`;
    case QueryError.parentCombinator: return `We have chosen not to implement the parent combinator`;
    case QueryError.faultyFormula: return `The :${token.name} pseudo selector argument is invalid`;
    case QueryError.missingParens: return `The :${token.name} pseudo selector should have parenthesis`;
    case QueryError.extraneousParens: return `The :${token.name} pseudo selector should not have parenthesis`;
    case QueryError.unknownPseudoSelector: return `We haven't implemented the :${token.name} pseudo selector`;
  }
}
