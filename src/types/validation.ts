import {Path, QueryToken} from "./";

export enum QueryError {
  parseError = "parseError",
  parentCombinator = "parentCombinator",
  adjacentCombinators = "adjacentCombinators",
  endingCombinator = "endingCombinator",
  leadingCombinator = "leadingCombinator",
  unknownPseudoSelector = "unknownPseudoSelector",
  faultyFormula = "faultyFormula",
  missingParens = "missingParens",
  extraneousParens = "extraneousParens",
}

export type ValidationDetailedError = [QueryError, QueryToken[], Path];

export type ValidationError = [QueryError.parseError] | ValidationDetailedError;
