import * as React from "react";
import * as ReactDOM from "react-dom";

import { History, QueryToken, TokenType } from "../../types";

import { mainStyles } from "../styles";
import Element from "./element";
import Header from "./header";
import HistoryListComp from "./historylist";
import InfoDialog from "./infodialog";

import { basicTree, makeHistory } from "../../helpers";

import parser from "../../parser";

import { FormField } from "rmwc/FormField";
import { Grid, GridCell } from "rmwc/Grid";
import { TextField } from "rmwc/TextField";
import { Typography } from "rmwc/Typography";

type MainState = {
  query: string,
  selectorTokens: QueryToken[],
  message: string,
  idx: number,
  InfoDialogOpen: boolean,
};

export default class Main extends React.Component<{}, MainState> {
  private field: TextField;
  constructor(props) {
    super(props);
    this.updateSelector = this.updateSelector.bind(this);
    this.updateIdx = this.updateIdx.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.state = {query: "", message: "", idx: 0, selectorTokens: [], InfoDialogOpen: false};
  }
  public componentDidMount() {
    const input: HTMLInputElement = ReactDOM.findDOMNode(this.field).querySelector("input[type=text]");
    input.focus();
  }
  public toggleDialog() {
    this.setState({InfoDialogOpen: !this.state.InfoDialogOpen});
  }
  public updateIdx(nbr) {
    this.setState({idx: nbr});
  }
  public updateSelector(query) {
    this.setState({ query });
    const tokens = parser(query)[0];
    const idx =
      tokens.length && (tokens[tokens.length - 1].type === TokenType.wip || tokens[tokens.length - 1].type === TokenType.error)
        ? tokens.length - 1
        : tokens.length; // not -1 since we'll add start later
    this.setState({
      idx,
      message: "",
      selectorTokens: tokens,
    });
  }
  public render() {
    let coll = [[666]];
    let history: History = [];
    if (this.state.query !== "") {
      history = makeHistory(this.state.selectorTokens, basicTree);
      coll = history[this.state.idx].coll;
    }
    return (
      <div style={mainStyles}>
        <Header openInfoDialog={this.toggleDialog} />
        <div className="content">
          <TextField
            box
            ref={(field) => this.field = field}
            withLeadingIcon="zoom_in"
            label="CSS selector to dissect"
            onInput={(event) => this.updateSelector(event.target.value)}
          />
          <Grid>
            <GridCell span="6">
              <Typography use="title">Selection steps</Typography><br/>
              {
                !history.length
                  ? <Typography>Welcome! Enter a selector above to get started.</Typography>
                  : this.state.message
              }
              <HistoryListComp
                idx = {this.state.idx}
                updateIdx = {this.updateIdx}
                history = {history}
              />
            </GridCell>
            <GridCell span="6">
              <Typography use="title">Selection result</Typography>
              <Element elem={basicTree} currColl={coll} />
            </GridCell>
          </Grid>
        </div>
        <InfoDialog isOpen={this.state.InfoDialogOpen} close={this.toggleDialog} />
      </div>
    );
  }
}
