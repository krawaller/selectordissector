import * as React from "react";

import { classifyFormula, describeToken, printToken } from "../../helpers";
import { Collection, QueryToken, TokenType } from "../../types";

import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemSecondaryText,
  ListItemText,
  SimpleListItem,
} from "rmwc/List";

type HistoryStepProps = {
  callback: (nbr) => void
  token: QueryToken
  coll: Collection
  idx: number
  selIdx: number,
};

const HistoryStep: React.StatelessComponent<HistoryStepProps> = ({callback, token, coll, idx, selIdx}) => {
  const handler = () => {
    if (token.type === TokenType.wip) {
      return;
    } else if (idx > selIdx || idx < selIdx) {
      callback(idx);
    } else if (idx === selIdx && idx > 0) {
      callback(idx - 1);
    } else {
      callback(0);
    }
  };
  const graphic = token.type === TokenType.wip
    ? "check_box_disabled"
    : idx <= selIdx
      ? "check_box"
      : "check_box_outline_blank";
  return (
    <SimpleListItem onClick={handler} graphic={graphic} text={printToken(token)} secondaryText={describeToken(token)} />
  );
};

export default HistoryStep;
