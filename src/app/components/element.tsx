import * as React from "react";

import {isTextNode} from "../../builder";
import {collContainsPath} from "../../helpers";
import {Collection, ContentNode, Path, TextNode, VirtualElement} from "../../types";
import {elemStyles as s, merge} from "../styles";

type ElementProps = {
  indent?: number
  elem: VirtualElement,
  path?: Path,
  currColl?: Collection,
};

const Element: React.StatelessComponent<ElementProps> = ({indent= 0, elem, currColl= [], path= []}) => {
  let styles = s.element;
  if (indent > 0) { styles = merge(styles, s.child); }
  const matched = collContainsPath(currColl, path);
  if (isTextNode(elem)) {
    // Printing a lone text node
    return (
      <div><div style={merge(styles, s.singleLine)}><span style={s.text}>{elem.content}</span></div></div>
    );
  } else if (elem.children.length === 1 && isTextNode(elem.children[0])) {
    // Printing an element containing just a text node
    const child = elem.children[0] as TextNode;
    return (
      <div><div style={merge(styles, s.singleLine, s.mayMatch, matched && s.matched)}><StartTag elem={elem}/><span style={s.text}>{child.content}</span><EndTag elem={elem}/></div></div>
    );
  } else if (!elem.children || !elem.children.length) {
    // Printing an empty element
    return (
      <div><div style={merge(styles, s.singleLine, s.mayMatch, matched && s.matched)}><StartTag elem={elem}/><EndTag elem={elem} empty={true}/></div></div>
    );
  } else {
    // Printing a multiline element
    return (
      <div style={styles}>
        <StartTag elem={elem} matched={matched} mayMatch/>
          {elem.children.map((child, n) => <Element key={path.concat(n).join("-")} elem={child} indent={indent + 1} path={path.concat(n)} currColl={currColl} />)}
          <EndTag elem={elem} matched={matched} mayMatch ownLine/>
      </div>
    );
  }
};

export default Element;

type TagType = {
  elem: ContentNode
  matched?: boolean
  mayMatch?: boolean,
};

type EndTagType = TagType & {
  ownLine?: boolean,
  empty?: boolean,
};

const StartTag: React.StatelessComponent<TagType> = ({elem, matched, mayMatch}) => {
  const attrs = Object.keys(elem.attrs).map(name => (
    <React.Fragment>
      <span style={s.tagAttributeName}> {name}</span>
      {elem.attrs[name] !== null && (
        <React.Fragment>
          <span style={s.tagAttributeEquals}>=</span>
          <span style={s.tagAttributeValueDelimiter}>"</span>
          <span style={s.tagAttributeValue}>{elem.attrs[name]}</span>
          <span style={s.tagAttributeValueDelimiter}>"</span>
        </React.Fragment>
      )}
    </React.Fragment>
  )); // " " + (elem.attrs[name] === "null" ? name : `${name}="${elem.attrs[name]}"`)).join("");
  return (
    <span style={merge(s.tag, mayMatch && s.mayMatch, matched && s.matched)}>
      <span style={s.tagDelimiter}>&lt;</span>
      <span style={s.tagType}>{elem.type}</span>
      {attrs}
      <span style={s.tagDelimiter}>&gt;</span>
    </span>
  );
};

const EndTag: React.StatelessComponent<EndTagType> = ({elem, matched, mayMatch, ownLine, empty}) => {
  return (
    <span style={merge(s.tag, ownLine && s.ownLineEndTag, mayMatch && s.mayMatch, matched && s.matched, empty && s.tagEndEmpty)}>
      <span style={s.tagDelimiter}>&lt;/</span>
      <span style={s.tagType}>{elem.type}</span>
      <span style={s.tagDelimiter}>&gt;</span>
    </span>
  );
};
