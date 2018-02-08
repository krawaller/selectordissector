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
import {getDescendantPaths} from '../../helpers';

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
    this.state = {selector: '', message: 'Welcome! Enter a selector and prepare for MAGIC OMG OMG!', idx: 0, selectorTokens: []};
  }
  updateIdx(nbr){
    this.setState({idx: nbr});
  }
  updateSelector(str){
    let valError = validator(str);
    if (!valError){
      const tokens = parser(str)[0];
      this.setState({
        selector: str,
        message: 'Current selector: ' + str,
        selectorTokens: tokens,
        idx: tokens.length // not -1 since we'll add start later
      });
    } else {
      this.setState({
        selector: '',
        message: 'Error! ' + valError[0] + (valError[1] ? ' (' + valError[1] + ')' : ''),
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
        coll: matcher(tree, acc[acc.length-1].coll, token)
      }), [{token: start, coll: getDescendantPaths(tree, [])} as HistoryStep] );
      coll = history[this.state.idx].coll;
    }
    return (
      <div style={mainStyles}>
        <Form callback={this.updateSelector} />
        {this.state.message}
        {
          history.length > 0 && (
            <React.Fragment>
              <hr/>
              {history.map((h,n) => <HistoryStep key={n} token={h.token} coll={h.coll} idx={n} selIdx={this.state.idx} callback={this.updateIdx} />)}
            </React.Fragment>
          ) 
        }
        <hr/>
        <Element elem={tree} currColl={coll} />
      </div>
    );
  }
}
