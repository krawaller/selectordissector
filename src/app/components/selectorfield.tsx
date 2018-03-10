import * as React from "react";
import * as ReactDOM from "react-dom";

import { TextField } from "rmwc/TextField";

type SelectorFieldProps = {
  onUpdate: (query: string) => void,
  query: string,
};

export default class SelectorField extends React.Component<SelectorFieldProps, null> {
  private field: TextField;
  public componentDidMount() {
    const input: HTMLInputElement = ReactDOM.findDOMNode(this.field).querySelector("input[type=text]");
    input.focus();
  }
  // Hack to compensate for RMWC bug where label will erroneously lose float-above class
  public componentDidUpdate() {
    const label: HTMLLabelElement = ReactDOM.findDOMNode(this.field).querySelector("label");
    setTimeout(() => {
      if (this.props.query) {
        label.classList.add("mdc-text-field__label--float-above");
      }
    }, 50);
  }
  public render() {
    return (
      <TextField
        box
        ref={(field) => this.field = field}
        withLeadingIcon="zoom_in"
        label="CSS selector to dissect"
        onInput={(event) => this.props.onUpdate(event.target.value)}
        className="textfieldhacktarget"
        value={this.props.query}
      />
    );
  }
}
