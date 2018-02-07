import * as React from 'react';

import {VirtualElement, Path, Collection} from '../../types';
import {collContainsPath} from '../../helpers';
import {elemStyles, merge} from '../styles';

type ElementProps = {
  indent?: number
  elem: VirtualElement,
  path?: Path,
  currColl?: Collection,
  prevColl?: Collection
};

const Element: React.StatelessComponent<ElementProps> = ({indent=0,elem,currColl=[],prevColl=[],path=[]}) => {
  let styles = elemStyles.element;
  if (collContainsPath(prevColl, path)) styles = merge(styles,elemStyles.matched);
  if (indent > 0) styles = merge(styles, elemStyles.child);
  const startTag = StartTag(elem);
  const endTag = EndTag(elem);
  if (elem.content){
    return (
      <div style={styles}>{startTag}{elem.content}{endTag}</div>
    );
  } else if (!elem.children || !elem.children.length){
    return (
      <div style={styles}>{startTag}{endTag}</div>
    );
  } else {
    return (
      <div style={styles}>
        {startTag}
          {elem.children.map((child,n) => <Element key={path.concat(n).join('-')} elem={child} indent={indent+1} path={path.concat(n)} currColl={currColl} prevColl={prevColl} />)}
        {endTag}
      </div>
    )
  }
};

export default Element;

const StartTag = (elem: VirtualElement) => {
  let attrs = Object.keys(elem.attrs).map(name => ' ' + (elem.attrs[name] === 'null' ? name : `${name}="${elem.attrs[name]}"`)).join('');
  return `<${elem.type}${attrs}>`;
};

const EndTag = (elem: VirtualElement) => `</${elem.type}>`;
