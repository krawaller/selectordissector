import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Factory, {div, span, p, strong, h1} from '../builder';
import Element from './components/element';

const tree = div({lang:'sv'},[
  h1('Wow this is cool'),
  div([
    p('yeah, well, hihi!'),
    p('etc etc.')
  ])
]);

ReactDOM.render(
  <Element elem={tree} />,
  document.getElementById('app')
);
