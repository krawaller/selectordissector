import {classifyFormula} from "../";
import {FormulaType, PseudoName, PseudoToken} from "../../types";

export default function describePseudo(token: PseudoToken) {
  switch (token.name) {
    case PseudoName.empty: return `Keep all elements that contain no text nodes or other elements.`;
    case PseudoName.firstChild: return `Keep all elements that is the oldest sibling (not counting text nodes)`;
    case PseudoName.lastChild: return `Keep all elements that is the youngest sibling (not counting text nodes)`;
    case PseudoName.firstOfType: return `Keep all elements that is the oldest of its type among the siblings.`;
    case PseudoName.lastOfType: return `Keep all elements that is the youngest of its type among the siblings.`;
    case PseudoName.onlyChild: return `Keep all elements that have no siblings (not counting text nodes).`;
    case PseudoName.onlyOfType: return `Keep all elements that have no siblings of the same type.`;
    case PseudoName.nthChild: {
      const classification = classifyFormula(token.data);
      switch (classification[0]) {
        case FormulaType.even: return `Keep all elements whose position among the siblings (not counting text nodes) is even.`;
        case FormulaType.odd: return `Keep all elements whose position among the siblings (not counting text nodes) is odd.`;
        case FormulaType.mult: return `Keep all elements whose position among the siblings (not counting text nodes) is a multiple of ${classification[1]}.`;
        case FormulaType.multAndNegOffset: return `Keep all elements whose position among the siblings (not counting text nodes) is ${classification[2]} less than a multiple of ${classification[1]}.`;
        case FormulaType.multAndPosOffset: return `Keep all elements whose position among the siblings (not counting text nodes) is ${classification[2]} more than a multiple of ${classification[1]}.`;
        case FormulaType.exact: return `Keep all elements whose position among the siblings (not counting text nodes) is ${classification[1]}.`;
        case FormulaType.negAndOffset: return `Keep all elements who is among the first ${classification[1]} of the siblings (not counting text nodes).`;
        default: return `[[[ description for this type not created yet, sorry ]]]`;
      }
    }
    case PseudoName.nthOfType: {
      const classification = classifyFormula(token.data);
      switch (classification[0]) {
        case FormulaType.even: return `Keep all elements whose position among the same-type siblings is even.`;
        case FormulaType.odd: return `Keep all elements whose position among the same-type siblings is odd.`;
        case FormulaType.mult: return `Keep all elements whose position among the same-type siblings is a multiple of ${classification[1]}.`;
        case FormulaType.multAndNegOffset: return `Keep all elements whose position among the same-type siblings is ${classification[2]} less than a multiple of ${classification[1]}.`;
        case FormulaType.multAndPosOffset: return `Keep all elements whose position among the same-type siblings is ${classification[2]} more than a multiple of ${classification[1]}.`;
        case FormulaType.exact: return `Keep all elements whose position among the same-type siblings is ${classification[1]}.`;
        case FormulaType.negAndOffset: return `Keep all elements who is among the first ${classification[1]} of the same-type siblings.`;
        default: return `[[[ description for this type not created yet, sorry ]]]`;
      }
    }
    default: return `[[[ description for this type not created yet, sorry ]]]`;
  }
}
