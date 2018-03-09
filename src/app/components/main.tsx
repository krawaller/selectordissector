import * as React from "react";

import autobind from "autobind-decorator";

import { History, QueryToken, TokenType } from "../../types";

import { mainStyles } from "../styles";
import Element from "./element";
import Header from "./header";
import HistoryListComp from "./historylist";
import InfoDialog from "./infodialog";
import SelectorFieldComp from "./selectorfield";
import WelcomeComp from "./welcome";

import { basicTree, makeHistory } from "../../helpers";

import parser from "../../parser";

import { Grid, GridCell } from "rmwc/Grid";
import { Typography } from "rmwc/Typography";

type MainState = {
  query: string,
  selectorTokens: QueryToken[],
  idx: number,
  InfoDialogOpen: boolean,
};

export default class Main extends React.Component<{}, MainState> {
  constructor(props) {
    super(props);
    this.state = {query: "", idx: 0, selectorTokens: [], InfoDialogOpen: false};
  }
  @autobind
  public toggleDialog() {
    this.setState({InfoDialogOpen: !this.state.InfoDialogOpen});
  }
  @autobind
  public updateIdx(nbr) {
    this.setState({idx: nbr});
  }
  @autobind
  public updateSelector(query) {
    this.setState({ query });
    const tokens = parser(query)[0];
    const idx =
      tokens.length && (tokens[tokens.length - 1].type === TokenType.wip || tokens[tokens.length - 1].type === TokenType.error)
        ? tokens.length - 1
        : tokens.length; // not -1 since makeHistory adds start token
    this.setState({
      idx,
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
          <SelectorFieldComp onUpdate={this.updateSelector} />
          <Grid>
            <GridCell span="6">
              <Typography use="headline">Selection steps</Typography><br/>
              {
                !history.length
                  ? <WelcomeComp />
                  : <HistoryListComp
                      idx = {this.state.idx}
                      updateIdx = {this.updateIdx}
                      history = {history}
                    />
              }
            </GridCell>
            <GridCell span="6">
              <Typography use="headline">Selection result</Typography>
              <Element elem={basicTree} currColl={coll} />
            </GridCell>
          </Grid>
        </div>
        <InfoDialog isOpen={this.state.InfoDialogOpen} close={this.toggleDialog} />
      </div>
    );
  }
}
