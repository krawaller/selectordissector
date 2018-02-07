import * as React from 'react';

import Factory, {div, span, p, strong, h1} from '../../builder';
import Element from './element';
import Form from './form';
import {mainStyles} from '../styles';

import parser from '../../parser';
import matcher from '../../matcher';
import validator from '../../validator';
import {getDescendantPaths} from '../../helpers';

const tree = div({lang:'sv'},[
  h1('Wow this is cool'),
  div([
    p('yeah, well, hihi!'),
    p('etc etc.')
  ])
]);

type MainState = {
  selector: string
  message: string
}

export default class Main extends React.Component<{}, MainState> {
  constructor(props){
    super(props);
    this.updateSelector = this.updateSelector.bind(this);
    this.state = {selector: '', message: 'Welcome! Enter a selector above!'};
  }
  updateSelector(str){
    let valError = validator(str);
    if (!valError){
      this.setState({selector: str, message: 'Current selector: ' + str});
    } else {
      this.setState({
        selector: '',
        message: 'Error! ' + valError[0] + (valError[1] ? ' (' + valError[1] + ')' : '')
      });
    }
  }
  render(){
    let coll = [[666]];
    if (this.state.selector !== ''){
      let sel = parser(this.state.selector)[0];
      coll = sel.reduce((acc, token)=> matcher(tree, acc, token), getDescendantPaths(tree, []));
    }
    return (
      <div style={mainStyles}>
        <Form callback={this.updateSelector} />
        {this.state.message}
        <hr/>
        <Element elem={tree} currColl={coll} />
      </div>
    );
  }
}
