import * as React from "react";
import Spinner from "react-spinner-material";

import { classifyFormula, describeToken, printToken } from "../../helpers";
import { Collection, QueryToken, TokenType } from "../../types";

import {
  ListItem,
  ListItemGraphic,
  ListItemSecondaryText,
  ListItemText,
} from "rmwc/List";

import {
  Radio,
} from "rmwc/Radio";

type HistoryStepProps = {
  callback: () => void
  token: QueryToken
  coll: Collection
  idx: number
  selIdx: number,
};

const HistoryStep: React.StatelessComponent<HistoryStepProps> = ({callback, token, coll, idx, selIdx}) => {
  const handler = () => {
    if (token.type === TokenType.wip || token.type === TokenType.error) {
      return;
    }
    callback();
  };
  return (
    <ListItem onClick={handler}>
      <ListItemGraphic>
        {token.type === TokenType.wip ? (
          <Spinner
            size={22}
            spinnerColor={"#333"}
            spinnerWidth={2}
            visible={true} />
        ) : token.type === TokenType.error ? (
          <span>error</span>
        ) : (
          <Radio checked={idx === selIdx} onChange={() => {return; }} />
        )}
      </ListItemGraphic>
      <ListItemText>
        {printToken(token)}
        <ListItemSecondaryText>{describeToken(token)}</ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
};

export default HistoryStep;
