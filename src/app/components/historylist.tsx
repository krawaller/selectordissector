import * as React from "react";

import { List } from "rmwc/List";

import { History } from "../../types";
import HistoryStepComp from "./historystep";

type HistoryListProps = {
  idx: number,
  history: History,
  updateIdx: (n: number) => void,
};

const HistoryList: React.StatelessComponent<HistoryListProps> = ({history, idx, updateIdx}) => {
  return (
    <List>
      {history.map((h, n) => (
        <React.Fragment key={n}>
          <HistoryStepComp
            token={h.token}
            coll={h.coll}
            idx={n}
            selIdx={idx}
            callback={() => updateIdx(n)}
          />
          {n === 0 && (
            <li role="separator" className="mdc-list-divider"></li>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HistoryList;
