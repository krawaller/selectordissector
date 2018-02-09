import * as React from 'react';

import { QueryToken, TokenType, Collection } from '../../types';

import Factory, {div, span, p, strong, h1, ul, li} from '../../builder';
import Element from './element';
import Form from './form';
import HistoryStep from './historystep';
import {mainStyles} from '../styles';

import parser from '../../parser';
import matcher from '../../matcher';
import validator from '../../validator';
import {getDescendantPaths, describeError} from '../../helpers';

import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
} from 'rmwc/Toolbar';
import { TextField } from 'rmwc/TextField';
import { FormField } from 'rmwc/FormField';
import {
  List
} from 'rmwc/List';
import { Typography } from 'rmwc/Typography';
import { Elevation } from 'rmwc/Elevation';
import { Grid, GridCell } from 'rmwc/Grid';

const tree = div({lang:'sv'},[
  h1('Wow this is cool'),
  div([
    p('yeah, well, hihi!'),
    p(['This is',strong('really'),'dumb!']),
    Factory('hr')(),
    ul([
      li('make the bed'),
      li({class:'important'}, strong('DO THE DISHES')),
      li('take out trash')
    ])
  ])
]);

type MainState = {
  selector: string
  selectorTokens: QueryToken[]
  message: string
  idx: number
}

export default class Main extends React.Component<{}, MainState> {
  constructor(props){
    super(props);
    this.updateSelector = this.updateSelector.bind(this);
    this.updateIdx = this.updateIdx.bind(this);
    this.state = {selector: '', message: '', idx: 0, selectorTokens: []};
  }
  updateIdx(nbr){
    this.setState({idx: nbr});
  }
  updateSelector(selector){
    this.setState({ selector })
    let valError = validator(selector);
    if (!valError){
      const tokens = parser(selector)[0];
      this.setState({
        message: '',
        selectorTokens: tokens,
        idx: tokens.length // not -1 since we'll add start later
      });
    } else {
      this.setState({
        message: describeError(valError), // 'Error! ' + valError[0] + (valError[1] ? ' (' + valError[1] + ')' : ''),
        selectorTokens: [],
        idx: 0
      });
    }
  }
  render(){
    let coll = [[666]];
    type HistoryStep = {token: QueryToken, coll: Collection};
    let history: HistoryStep[] = [];
    if (this.state.selector !== ''){
      const start: QueryToken = {type: TokenType.start};
      history = this.state.selectorTokens.reduce( (acc, token) => acc.concat({
        token: token,
        coll: matcher(tree, acc[acc.length-1].coll, token).result
      }), [{token: start, coll: getDescendantPaths(tree, [])} as HistoryStep] );
      coll = history[this.state.idx].coll;
    }
    return (
      <div style={mainStyles}>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Selector Dissector</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <div className="content">
          <TextField box withLeadingIcon="zoom_in" label="CSS selector to dissect" onInput={event => this.updateSelector(event.target.value)} />
          {this.state.message}

          {!history.length && <Typography use="title">Welcome! Enter a selector above to get started.</Typography>}

          <Grid>
            {
              !!history.length && (
                <GridCell span="6">
                  <Typography use="title">Selection steps</Typography>
                  <List>
                    {history.map((h, n) => (
                      <HistoryStep
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
