import * as React from "react";

import { ValidationError } from "../../types";

import { describeError } from "../../helpers";

import { Typography } from "rmwc/Typography";

type ErrorProps = {
  error: ValidationError,
};

const Error: React.StatelessComponent<ErrorProps> = ({error}) => (
  <Typography>{describeError(error)}</Typography>
);

export default Error;
