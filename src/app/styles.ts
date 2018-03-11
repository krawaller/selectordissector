import {CSSProperties} from "react";

type Styles = CSSProperties;

const matchedStyles: Styles = {
  backgroundColor: "#A261FF",
  borderColor: "#7400FF",
  color: "white",
};

const transitions: Styles = {
  transition: "color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
};

const potentialMatchStyles: Styles = {
  border: "1px solid transparent",
  borderColor: "transparent",
  borderRadius: "5px",
  ...transitions,
};

export const elemStyles = {
  connector: (matched: boolean): Styles => ({
    bottom: "18px",
    left: "5px",
    position: "absolute",
    top: "17px",
    width: "1px",
    zIndex: 1,
    ...potentialMatchStyles,
    ...matched && matchedStyles,
    borderBottom: "none",
    borderRadius: "none",
    borderTop: "none",
  }),
  container: (singleLine: boolean, matched: boolean, child: boolean): Styles => ({
    fontFamily: "monospace",
    fontSize: "12px",
    ...child && {
      marginLeft: "1.5em",
    },
    ...singleLine && {
      display: "inline-block",
      marginBottom: "1px",
      // If the element is on one line, we put the match stuff directly on the container
      ...potentialMatchStyles,
      ...matched && matchedStyles,
    },
    ...!singleLine && {
      position: "relative",
    },
  }),
  tag: (kind: "start" | "end", alone: boolean, matched: boolean, empty?: boolean): Styles => ({
    display: "inline-block",
    padding: "1px",
    ...(kind === "end" && empty) && {
      marginLeft: "-3px", // prevent an empty element to look like it might contain a space
    },
    ...alone && {
      // For multiline elements we put the match stuff on the opening and closing tag
      marginBottom: "1px",
      ...potentialMatchStyles,
      ...matched && matchedStyles,
    },
  }),
  tagPart: (kind: "start" | "end", matched: boolean, part: "type" | "delimeter" | "attrName" | "attrVal" | "attrEq" | "attrDelim"): Styles => {
    // TODO - make this pretty :P
    let color;
    switch (part) {
      case "type": color = "#9b165e"; break; // the type of an element inside a tag
      case "delimeter": color = "#823aff"; break; // the < and </ and > parts
      case "attrName": color = "#ff5563"; break; // the name of an attribute
      case "attrEq": color = "#823aff"; break; // the equal sign before an attribute value
      case "attrDelim": color = "#823aff"; break; // the quotes around an attribute value
      case "attrVal": color = "#823aff"; break; // the attribute value within quotes
    }
    return {
      color: matched ? "white" : color,
      ...transitions,
    };
  },
  textNode: (matched: boolean): Styles => ({
    ...transitions,
    color: matched ? "white" : "#0a0402",
  }),
};

export const listItemStyles: Styles = {
  cursor: "pointer",
  height: "initial",
  marginBottom: "5px",
  marginTop: "5px",
  minHeight: "48px",
};

export const listTextStyles: Styles = {
  overflow: "initial",
  textOverflow: "initial",
  whiteSpace: "initial",
};

export const contentContainerStyles: Styles = {
  margin: "0 24px",
};

export const merge = (...objs) => Object.assign.apply(Object, [{}].concat(objs));
