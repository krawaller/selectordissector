import * as React from "react";

import {isTextNode} from "../../builder";
import {collContainsPath} from "../../helpers";
import {Collection, ContentNode, Path, TextNode, VirtualElement} from "../../types";
import {elemStyles as s} from "../styles";

type ElementProps = {
  indent?: number
  elem: VirtualElement,
  path?: Path,
  currColl?: Collection,
};

const Element: React.StatelessComponent<ElementProps> = ({indent= 0, elem, currColl= [], path= []}) => {
  const matched = collContainsPath(currColl, path);
  if (isTextNode(elem)) {
    // Printing a lone text node that has other siblings
    return (
      <div><div style={s.container(true, false, indent > 0)}><span style={s.textNode(matched)}>{elem.content}</span></div></div>
    );
  } else if (elem.children.length === 1 && isTextNode(elem.children[0])) {
    // Printing an element containing just a text node
    const child = elem.children[0] as TextNode;
    return (
      <div>
        <div style={s.container(true, matched, indent > 0)}>
          <StartTag elem={elem} matched={matched}/>
          <span style={s.textNode(matched)}>{child.content}</span>
          <EndTag elem={elem} matched={matched}/>
        </div>
      </div>
    );
  } else if (!elem.children || !elem.children.length) {
    // Printing an empty element
    const selfClose = ["img", "hr"].indexOf(elem.type) > -1;
    return (
      <div>
        <div style={s.container(true, matched, indent > 0)}>
          <StartTag elem={elem} matched={matched} selfClose={selfClose} />
          {!selfClose && <EndTag elem={elem} matched={matched} empty/>}
        </div>
      </div>
    );
  } else {
    // Printing a multiline element
    return (
      <div style={s.container(false, matched, indent > 0)}>
        <div style={s.connector(matched)}/>
        <StartTag elem={elem} matched={matched} alone/>
          {elem.children.map((child, n) => <Element key={path.concat(n).join("-")} elem={child} indent={indent + 1} path={path.concat(n)} currColl={currColl} />)}
        <EndTag elem={elem} matched={matched} alone/>
      </div>
    );
  }
};

export default Element;

type TagType = {
  alone?: boolean,
  elem: ContentNode,
  matched?: boolean,
  selfClose?: boolean,
};

type EndTagType = TagType & {
  ownLine?: boolean,
  empty?: boolean,
};

const StartTag: React.StatelessComponent<TagType> = ({elem, matched, alone, selfClose}) => {
  const attrs = Object.keys(elem.attrs).map(name => (
    <React.Fragment>
      <span style={s.tagPart("start", matched, "attrName")}> {name}</span>
      {elem.attrs[name] !== null && (
        <React.Fragment>
          <span style={s.tagPart("start", matched, "attrEq")}>=</span>
          <span style={s.tagPart("start", matched, "attrDelim")}>"</span>
          <span style={s.tagPart("start", matched, "attrVal")}>{elem.attrs[name]}</span>
          <span style={s.tagPart("start", matched, "attrDelim")}>"</span>
        </React.Fragment>
      )}
    </React.Fragment>
  ));
  return (
    <span style={s.tag("start", alone, matched)}>
      <span style={s.tagPart("start", matched, "delimeter")}>&lt;</span>
      <span style={s.tagPart("start", matched, "type")}>{elem.type}</span>
      {attrs}
      {selfClose && <span style={s.tagPart("start", matched, "delimeter")}>/</span>}
      <span style={s.tagPart("start", matched, "delimeter")}>&gt;</span>
    </span>
  );
};

const EndTag: React.StatelessComponent<EndTagType> = ({elem, matched, alone, empty}) => {
  return (
    <span style={s.tag("end", alone, matched, empty)}>
      <span style={s.tagPart("start", matched, "delimeter")}>&lt;/</span>
      <span style={s.tagPart("start", matched, "type")}>{elem.type}</span>
      <span style={s.tagPart("start", matched, "delimeter")}>&gt;</span>
    </span>
  );
};
