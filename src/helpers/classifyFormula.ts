/* tslint:disable no-conditional-assignment */

import {FormulaClassification, FormulaType} from "../types";

export function classifyFormula(formula: string): FormulaClassification {
  let match;
  if ((match = formula.match(/^-n\+([0-9]+)$/))) { // -n+2
    return [FormulaType.negAndOffset, match[1]];
  } else if ((match = formula.match(/^[1-9][0-9]*$/))) { // 5
    return [FormulaType.exact, +formula];
  } else if ((match = formula.match(/^([0-9]+)n\+([0-9]+)$/))) { // 2n+3
    const multiplier = +match[1];
    const offset = +match[2];
    return [FormulaType.multAndPosOffset, multiplier, offset];
  } else if ((match = formula.match(/^([0-9]+)n\-([0-9]+)$/))) { // 2n-3
    const multiplier = +match[1];
    const offset = +match[2] * -1;
    return [FormulaType.multAndNegOffset, multiplier, offset];
  } else if ((match = formula.match(/^([0-9]+)n$/))) { // 5n
    const multiplier = +match[1];
    return [FormulaType.mult, multiplier];
  } else if (formula === "even") {
    return [FormulaType.even];
  } else if (formula === "odd") {
    return [FormulaType.odd];
  } else {
    return [FormulaType.unknown];
  }
}
