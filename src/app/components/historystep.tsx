import * as React from "react";
import Spinner from "react-spinner-material";

import { describeToken, printToken } from "../../helpers";
import { Collection, QueryToken, TokenType } from "../../types";

import { listItemStyles, listTextStyles } from "../styles";

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
  const print = printToken(token);
  const description = describeToken(token);
  const selectHandler = () => {
    if (token.type === TokenType.wip || token.type === TokenType.error) {
      return;
    }
    callback();
  };
  return (
    <ListItem onClick={selectHandler} style={listItemStyles}>
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
      <ListItemText style={listTextStyles}>
        {print}
        <ListItemSecondaryText style={listTextStyles}>{description}</ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  );
};

export default HistoryStep;
