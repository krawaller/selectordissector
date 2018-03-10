import * as PropTypes from "prop-types";
import * as React from "react";
import Spinner from "react-spinner-material";

import { describeToken, printToken } from "../../helpers";
import { Collection, QueryToken, TokenType } from "../../types";

import {
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemSecondaryText,
  ListItemText,
} from "rmwc/List";

import { Typography } from "rmwc/Typography";

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

const HistoryStep: React.StatelessComponent<HistoryStepProps> = ({callback, token, coll, idx, selIdx}, {openDialog}) => {
  const print = printToken(token);
  const description = describeToken(token);
  const selectHandler = () => {
    if (token.type === TokenType.wip || token.type === TokenType.error) {
      return;
    }
    callback();
  };
  const infoHandler = () => openDialog( print, (
    <React.Fragment>
      <Typography use="body1">{description}</Typography>
    </React.Fragment>
  ));
  return (
    <ListItem onClick={selectHandler}>
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
        {print}
        <ListItemSecondaryText>{description}</ListItemSecondaryText>
      </ListItemText>
      <ListItemMeta onClick={infoHandler}>
        <span>info</span>
      </ListItemMeta>
    </ListItem>
  );
};

HistoryStep.contextTypes = {
  openDialog: PropTypes.func,
};

export default HistoryStep;
