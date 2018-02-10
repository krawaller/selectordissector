import * as React from "react";

import { Collection, QueryToken, TokenType } from "../../types";

import Factory, {div, h1, li, p, span, strong, ul} from "../../builder";
import {mainStyles} from "../styles";
import Element from "./element";
import Form from "./form";
import HistoryStepComp from "./historystep";

import {describeError, getDescendantPaths} from "../../helpers";
import matcher from "../../matcher";
import parser from "../../parser";
import validator from "../../validator";

import { Elevation } from "rmwc/Elevation";
import { FormField } from "rmwc/FormField";
import { Grid, GridCell } from "rmwc/Grid";
import {
  List,
} from "rmwc/List";
import { TextField } from "rmwc/TextField";
import {
  Toolbar,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from "rmwc/Toolbar";
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
  selector: string
  selectorTokens: QueryToken[]
  message: string
  idx: number,
};

export default class Main extends React.Component<{}, MainState> {
  constructor(props) {
    super(props);
    this.updateSelector = this.updateSelector.bind(this);
    this.updateIdx = this.updateIdx.bind(this);
    this.state = {selector: "", message: "", idx: 0, selectorTokens: []};
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
        message: "",
        selectorTokens: tokens,
      });
    } else {
      this.setState({
        idx: 0,
        message: describeError(valError), // 'Error! ' + valError[0] + (valError[1] ? ' (' + valError[1] + ')' : ''),
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
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle>Selector Dissector</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <Typography use="caption">Crafted with &hearts; by <a style={mainStyles.link} href="http://edument.se?ref=seldis">Edument</a></Typography>
              <ToolbarIcon
                tag="a"
                href="https://github.com/krawaller/selectordissector"
                use={
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    />
                  </svg>
                }
              />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
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
      </div>
    );
  }
}
