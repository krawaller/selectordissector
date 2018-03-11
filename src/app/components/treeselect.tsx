import * as React from "react";
import { Select } from "rmwc/Select";
import { Typography } from "rmwc/Typography";

import { treesByName } from "../../helpers";
import { TreeName } from "../../types";

type TreeSelectProps = {
  treeName: TreeName,
  updateTreeName: (name: TreeName) => void,
};

const TreeSelect: React.StatelessComponent<TreeSelectProps> = ({treeName, updateTreeName}) => (
  <div>
    <Typography use="body1">Select HTML tree to use: </Typography>
    <Select
      box
      value={treeName}
      onChange={e => updateTreeName(e.target.value)}
      options={Object.keys(treesByName)}
    />
  </div>
);

export default TreeSelect;
