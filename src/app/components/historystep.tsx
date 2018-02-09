import * as React from 'react';

import {historyStyles, merge} from '../styles';

import { QueryToken, Collection, TokenType, AttributeAction, AttributeToken, TagToken, PseudoName, FormulaType } from '../../types';
import { classifyFormula } from '../../helpers';

type HistoryStepProps = {
  callback: (nbr) => void
  token: QueryToken
  coll: Collection
  idx: number,
  selIdx: number
};

const HistoryStep: React.StatelessComponent<HistoryStepProps> = ({callback, token, coll, idx, selIdx}) => {
  const s = historyStyles;
  const handler = ()=>{
    if (idx > selIdx) callback(idx);
    else if (idx < selIdx) callback (idx)
    else if (idx === selIdx && idx > 0) callback(idx-1)
    else callback(0)
  }
  return (
    <div style={s.container}>
      <button onClick={handler} style={merge(s.button, idx <= selIdx && s.activeButton)}>{print(token)}</button>
      <span style={s.description}>{describe(token)}</span>
    </div>
  );
};

export default HistoryStep;

function print(token: QueryToken): string {
  switch(token.type){
    case TokenType.tag: return (token as TagToken).name;
    case TokenType.universal: return '*';
    case TokenType.start: return 'START';
    case TokenType.child: return '>';
    case TokenType.descendant: return '_';
    case TokenType.attribute: {
      let t = token as AttributeToken;
      switch(t.action){
        case AttributeAction.element: return `.${t.name}`;
        case AttributeAction.exists: return `[${t.name}]`;
        case AttributeAction.equals: return `[${t.name}=${t.value}]`;
        // TODO - start and end etc
      }
    }
    case TokenType.adjacent: return '+';
    case TokenType.sibling: return '~';
    case TokenType.pseudo: return `:${token.name}` + (token.data ? `(${token.data})` : '')
  }
}

function describe(token: QueryToken): string {
  switch(token.type){
    case TokenType.start: return `Start with all elements in the entire document.`;
    case TokenType.tag: return `Keep only the elements where the type is "${(token as TagToken).name}".`
    case TokenType.universal: return `Keep all of those elements.`;
    case TokenType.child: return `Now take all children of those elements.`;
    case TokenType.descendant: return `Now take all descendants of those elements.`;
    case TokenType.attribute: {
      let t = token as AttributeToken;
      switch(t.action){
        case AttributeAction.element: return `Keep all elements where the "class" attribute contains the word "${t.value}".`;
        case AttributeAction.exists: return `Keep all elements that have the attribute "${t.name}".`;
        case AttributeAction.equals: return `Keep all elements where the attribute "${t.name}" equals "${t.value}".`;
        default: return `[[[ description for this type not created yet, sorry ]]]`
      }
    }
    case TokenType.adjacent: return `Now take all adjacent younger siblings of those elements.`;
    case TokenType.sibling: return `Now take all younger siblings of those elements.`;
    case TokenType.pseudo: {
      switch(token.name){
        case PseudoName.empty: return `Keep all elements that contain no text nodes or other elements.`;
        case PseudoName.firstChild: return `Keep all elements that is the oldest sibling (not counting text nodes)`;
        case PseudoName.lastChild: return `Keep all elements that is the youngest sibling (not counting text nodes)`;
        case PseudoName.firstOfType: return `Keep all elements that is the oldest of its type among the siblings.`;
        case PseudoName.lastOfType: return `Keep all elements that is the youngest of its type among the siblings.`;
        case PseudoName.onlyChild: return `Keep all elements that have no siblings (not counting text nodes).`;
        case PseudoName.onlyOfType: return `Keep all elements that have no siblings of the same type.`;
        case PseudoName.nthChild: {
          const classification = classifyFormula(token.data);
          switch(classification[0]){
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
          switch(classification[0]){
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
        default: `[[[ description for this type not created yet, sorry ]]]`
      }
    }
  }
}
