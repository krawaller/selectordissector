const matchedStyles = {
  backgroundColor: "#A261FF",
  borderColor: "#7400FF",
  color: "white",
};

const transitions = {
  transition: "color 0.5s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out",
};

const potentialMatchStyles = {
  border: "1px solid transparent",
  borderColor: "transparent",
  borderRadius: "5px",
  ...transitions,
};

export const elemStyles = {
  container: (singleLine: boolean, matched: boolean, child: boolean) => ({
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
  }),
  tag: (kind: "start" | "end", alone: boolean, matched: boolean, empty?: boolean) => ({
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
  tagPart: (kind: "start" | "end", matched: boolean, part: "type" | "delimeter" | "attrName" | "attrVal" | "attrEq" | "attrDelim") => {
    // TODO - make this pretty :P
    let color;
    switch (part) {
      case "type": color = "blue"; break; // the type of an element inside a tag
      case "delimeter": color = "red"; break; // the < and </ and > parts
      case "attrName": color = "green"; break; // the name of an attribute
      case "attrEq": color = "magenta"; break; // the equal sign before an attribute value
      case "attrDelim": color = "gold"; break; // the quotes around an attribute value
      case "attrVal": color = "#FFC107"; break; // the attribute value within quotes
    }
    return {
      color: matched ? "white" : color,
      ...transitions,
    };
  },
  textNode: (matched: boolean) => ({

  }),
};

export const listItemStyles = {
  cursor: "pointer",
  height: "initial",
  marginBottom: "5px",
  marginTop: "5px",
  minHeight: "48px",
};

export const listTextStyles = {
  overflow: "initial",
  textOverflow: "initial",
  whiteSpace: "initial",
};

export const contentContainerStyles = {
  margin: "0 24px",
};

export const merge = (...objs) => Object.assign.apply(Object, [{}].concat(objs));
