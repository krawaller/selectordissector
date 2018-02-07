import * as React from 'react';

import {VirtualElement, Path, Collection} from '../../types';
import {collContainsPath} from '../../helpers';
import {elemStyles as s, merge} from '../styles';

type ElementProps = {
  indent?: number
  elem: VirtualElement,
  path?: Path,
  currColl?: Collection,
};

const Element: React.StatelessComponent<ElementProps> = ({indent=0,elem,currColl=[],path=[]}) => {
  let styles = s.element;
  if (indent > 0) styles = merge(styles, s.child);
  const matched = collContainsPath(currColl, path);
  if (elem.content){
    return (
      <div><div style={merge(styles, s.singleLine, s.mayMatch, matched && s.matched)}><StartTag elem={elem}/>{elem.content}<EndTag elem={elem}/></div></div>
    );
  } else if (!elem.children || !elem.children.length){
    return (
      <div><div style={merge(styles, s.singleLine, s.mayMatch, matched && s.matched)}><StartTag elem={elem}/><EndTag elem={elem}/></div></div>
    );
  } else {
    return (
      <div style={styles}>
        <StartTag elem={elem} matched={matched} mayMatch/>
          {elem.children.map((child,n) => <Element key={path.concat(n).join('-')} elem={child} indent={indent+1} path={path.concat(n)} currColl={currColl} />)}
          <EndTag elem={elem} matched={matched} mayMatch ownLine/>
      </div>
    )
  }
};

export default Element;

type TagType = {
  elem: VirtualElement
  matched?: boolean
  mayMatch?: boolean
}

type EndTagType = TagType & {
  ownLine?: boolean
}

const StartTag: React.StatelessComponent<TagType> = ({elem, matched, mayMatch}) => {
  let attrs = Object.keys(elem.attrs).map(name => ' ' + (elem.attrs[name] === 'null' ? name : `${name}="${elem.attrs[name]}"`)).join('');
  return <span style={merge(s.tag, mayMatch && s.mayMatch, matched && s.matched)}>{`<${elem.type}${attrs}>`}</span>;
};

const EndTag: React.StatelessComponent<EndTagType> = ({elem, matched, mayMatch, ownLine}) => {
  return <span style={merge(s.tag, ownLine && s.ownLineEndTag, mayMatch && s.mayMatch, matched && s.matched)}>{`</${elem.type}>`}</span>;
};
