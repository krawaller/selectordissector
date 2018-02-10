import * as React from "react";

import { Collection, QueryToken, TokenType } from "../../types";

import Factory, {div, h1, li, p, span, strong, ul} from "../../builder";
import {mainStyles} from "../styles";
import Element from "./element";
import Form from "./form";
import Header from "./header";
import HistoryStepComp from "./historystep";
import InfoDialog from "./infodialog";

import {describeError, getDescendantPaths} from "../../helpers";
import matcher from "../../matcher";
import parser from "../../parser";
import validator from "../../validator";

import { Button } from "rmwc/Button";
import { Elevation } from "rmwc/Elevation";
import { FormField } from "rmwc/FormField";
import { Grid, GridCell } from "rmwc/Grid";
import {
  List,
} from "rmwc/List";
import { TextField } from "rmwc/TextField";
import { Typography } from "rmwc/Typography";

const tree = div({lang: "sv"}, [
  h1("Wow this is cool"),
  div([
    p("yeah, well, hihi!"),
    p(["This is", strong("really"), "dumb!"]),
    Factory("hr")(),
    ul([
      li("make the bed"),
      li({class: "important"}, strong("DO THE DISHES")),
      li("take out trash"),
    ]),
  ]),
]);

type MainState = {
  selector: string,
  selectorTokens: QueryToken[],
  message: string,
  isError?: boolean,
  idx: number,
  InfoDialogOpen: boolean,
};

export default class Main extends React.Component<{}, MainState> {
  constructor(props) {
    super(props);
    this.updateSelector = this.updateSelector.bind(this);
    this.updateIdx = this.updateIdx.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.state = {selector: "", message: "", idx: 0, selectorTokens: [], InfoDialogOpen: false};
  }
  public toggleDialog() {
    this.setState({InfoDialogOpen: !this.state.InfoDialogOpen});
  }
  public updateIdx(nbr) {
    this.setState({idx: nbr});
  }
  public updateSelector(selector) {
    this.setState({ selector });
    const valError = validator(selector);
    if (!valError) {
      const tokens = parser(selector)[0];
      this.setState({
        idx: tokens.length, // not -1 since we'll add start later
        isError: false,
        message: "",
        selectorTokens: tokens,
      });
    } else {
      this.setState({
        idx: 0,
        isError: true,
        message: describeError(valError),
        selectorTokens: [],
      });
    }
  }
  public render() {
    let coll = [[666]];
    type HistoryStep = {token: QueryToken, coll: Collection};
    let history: HistoryStep[] = [];
    if (this.state.selector !== "") {
      const start: QueryToken = {type: TokenType.start};
      history = this.state.selectorTokens.reduce( (acc, token) => acc.concat({
        coll: matcher(tree, acc[acc.length - 1].coll, token).result,
        token,
      }), [{token: start, coll: getDescendantPaths(tree, [])} as HistoryStep] );
      coll = history[this.state.idx].coll;
    }
    return (
      <div style={mainStyles}>
        <Header openInfoDialog={this.toggleDialog} />
        <div className="content">
          <TextField box withLeadingIcon="zoom_in" label="CSS selector to dissect" onInput={(event) => this.updateSelector(event.target.value)} />
          {this.state.message}

          {!history.length && <Typography use="title">Welcome! Enter a selector above to get started.</Typography>}

          <Grid>
            {
              !!history.length && (
                <GridCell span="6">
                  <Typography use="title">Selection steps</Typography>
                  <List>
                    {history.map((h, n) => (
                      <HistoryStepComp
                        key={n}
                        token={h.token}
                        coll={h.coll}
                        idx={n}
                        selIdx={this.state.idx}
                        callback={this.updateIdx}
                      />
                    ))}
                  </List>
                </GridCell>
              )
            }
            {
              !!history.length && (
                <GridCell span="6">
                  <Typography use="title">Selection result</Typography>
                  <Element elem={tree} currColl={coll} />
                </GridCell>
              )
            }
          </Grid>
        </div>
        <InfoDialog isOpen={this.state.InfoDialogOpen} close={this.toggleDialog} />
      </div>
    );
  }
}
