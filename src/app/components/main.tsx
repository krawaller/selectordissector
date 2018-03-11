import * as PropTypes from "prop-types";
import {ReactElement} from "react";
import * as React from "react";

import autobind from "autobind-decorator";
import { Grid, GridCell } from "rmwc/Grid";

import { makeHistory, treesByName } from "../../helpers";
import parser from "../../parser";
import { History, QueryToken, TokenType, TreeName } from "../../types";

import { contentContainerStyles } from "../styles";

import Element from "./element";
import Header from "./header";
import HistoryListComp from "./historylist";
import InfoDialog from "./infodialog";
import SelectorFieldComp from "./selectorfield";
import TreeSelect from "./treeselect";
import WelcomeComp from "./welcome";

type MainState = {
  query: string,
  selectorTokens: QueryToken[],
  history: History,
  idx: number,
  infoDialogHeadline?: string,
  infoDialogOpen: boolean,
  infoDialogContent?: ReactElement<any>,
  treeName: TreeName,
};

export type DialogContext = {
  openDialog: (header: string, elem: ReactElement<any>) => void,
};

export default class Main extends React.Component<{}, MainState> {
  public static childContextTypes = {
    openDialog: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {query: "", idx: 0, selectorTokens: [], infoDialogOpen: false, history: [], treeName: "article"};
  }
  public getChildContext() {
    return {openDialog: this.openDialog};
  }
  @autobind
  public openDialog(title: string, elem: ReactElement<any>) {
    this.setState({
      infoDialogContent: elem,
      infoDialogHeadline: title,
      infoDialogOpen: true,
    });
  }
  @autobind
  public closeDialog() {
    this.setState({infoDialogOpen: false});
  }
  @autobind
  public updateIdx(nbr) {
    this.setState({idx: nbr});
  }
  @autobind
  public updateTreeName(name: TreeName) {
    this.setState({treeName: name});
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
      history: query ? makeHistory(tokens, treesByName[this.state.treeName]) : [],
      idx,
      selectorTokens: tokens,
    });
  }
  public render() {
    const coll = (this.state.history[this.state.idx] || {coll: null}).coll || [[666]];
    return (
      <div>
        <Header />
        <div style={contentContainerStyles}>
          <Grid>
            <GridCell span="6">
              <SelectorFieldComp onUpdate={this.updateSelector} query={this.state.query}/>
              {
                !this.state.history.length
                  ? <React.Fragment>
                      <WelcomeComp />
                      <TreeSelect treeName={this.state.treeName} updateTreeName={this.updateTreeName} />
                    </React.Fragment>
                  : <HistoryListComp
                      idx = {this.state.idx}
                      updateIdx = {this.updateIdx}
                      history = {this.state.history}
                    />
              }
            </GridCell>
            <GridCell span="6">
              <Element elem={treesByName[this.state.treeName]} currColl={coll} />
            </GridCell>
          </Grid>
        </div>
        <InfoDialog
          isOpen={this.state.infoDialogOpen}
          close={this.closeDialog}
          content={this.state.infoDialogContent}
          headline={this.state.infoDialogHeadline}
        />
      </div>
    );
  }
}
