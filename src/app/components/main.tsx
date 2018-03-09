import * as React from "react";
import * as ReactDOM from "react-dom";

import { Collection, QueryToken, TokenType } from "../../types";

import Factory, {div, h1, li, p, span, strong, ul} from "../../builder";
import { mainStyles } from "../styles";
import Element from "./element";
import Header from "./header";
import HistoryStepComp from "./historystep";
import InfoDialog from "./infodialog";

import { getDescendantPaths } from "../../helpers";
import matcher from "../../matcher";
import parser from "../../parser";

import { Button } from "rmwc/Button";
import { Elevation } from "rmwc/Elevation";
import { FormField } from "rmwc/FormField";
import { Grid, GridCell } from "rmwc/Grid";
import { List } from "rmwc/List";
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
    this.state = {selector: "", message: "", idx: 0, selectorTokens: [], InfoDialogOpen: false};
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
  public updateSelector(selector) {
    this.setState({ selector });
    const tokens = parser(selector)[0];
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
            <GridCell span="6">
              <Typography use="title">Selection result</Typography>
              <Element elem={tree} currColl={coll} />
            </GridCell>
          </Grid>
        </div>
        <InfoDialog isOpen={this.state.InfoDialogOpen} close={this.toggleDialog} />
      </div>
    );
  }
}
