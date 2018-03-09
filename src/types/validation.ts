import {Path, Selector} from "./";

export enum QueryError {
  parseError = "parseError",
  parentCombinator = "parentCombinator",
  adjacentCombinators = "adjacentCombinators",
  leadingCombinator = "leadingCombinator",
  unknownPseudoSelector = "unknownPseudoSelector",
  faultyFormula = "faultyFormula",
  missingParens = "missingParens",
  extraneousParens = "extraneousParens",
}

export type ValidationDetailedError = [QueryError, Selector, Path];

export type ValidationError = [QueryError.parseError] | ValidationDetailedError;
