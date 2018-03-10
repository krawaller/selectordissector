import * as React from "react";

import { Typography } from "rmwc/Typography";

const Welcome: React.StatelessComponent<null> = () => (
  <div>
    <Typography use="title" tag="h2">Welcome!</Typography>
    <Typography use="body1">
      Enter a selector to get a step-by-step explanation of how it works,
      and which element are caught each step!
    </Typography>
  </div>
);

export default Welcome;
