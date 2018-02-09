import * as React from 'react';

import { QueryToken, Collection } from '../../types';
import { classifyFormula, printToken, describeToken } from '../../helpers';

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
  SimpleListItem
} from 'rmwc/List';

type HistoryStepProps = {
  callback: (nbr) => void
  token: QueryToken
  coll: Collection
  idx: number
  selIdx: number
};

const HistoryStep: React.StatelessComponent<HistoryStepProps> = ({callback, token, coll, idx, selIdx}) => {
  const handler = ()=>{
    if (idx > selIdx) callback(idx);
    else if (idx < selIdx) callback(idx);
    else if (idx === selIdx && idx > 0) callback(idx-1);
    else callback(0);
  }
  return (
    <SimpleListItem onClick={handler} graphic={idx <= selIdx ? 'check_box' : 'check_box_outline_blank'} text={printToken(token)} secondaryText={describeToken(token)} />
  );
};

export default HistoryStep;
