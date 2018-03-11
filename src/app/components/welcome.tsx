import * as React from "react";
import { Typography } from "rmwc/Typography";

import {accentTextStyles} from "../styles";

const Em: React.StatelessComponent<null> = ({children}) => (
  <span style={accentTextStyles}>{children}</span>
);

const Welcome: React.StatelessComponent<null> = () => (
  <div>
    <Typography use="title" tag="h3">Hello! :)</Typography>
    <Typography use="body1" tag="p">
      <Em>Enter a selector</Em> to get a <Em>step-by-step explanation</Em> of how it works,
      and see <Em>which elements are caught</Em> for each step!
    </Typography>
  </div>
);

export default Welcome;
