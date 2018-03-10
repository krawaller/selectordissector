export const elemStyles = {
  child: {
    marginLeft: "2em",
  },
  element: {
    border: "1px solid transparent",
    borderColor: "transparent",
    borderRadius: "5px",
    fontFamily: "monospace",
    fontSize: "12px",
    margin: "1px",
    padding: "1px",
  },
  matched: {
    backgroundColor: "#A261FF",
    borderColor: "#7400FF",
    color: "white",
  },
  mayMatch: {
    transition: "color 0.5s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out",
  },
  ownLineEndTag: {
    // opacity: 0.4
  },
  singleLine: {
    display: "inline-block",
  },
  tag: {
    border: "1px solid transparent",
    borderColor: "transparent",
    borderRadius: "5px",
    margin: "1px",
    padding: "1px",
  },
  tagAttributeEquals: { /* the equal sign before an attribute value */
    color: "magenta",
  },
  tagAttributeName: { /* the name of an attribute */
    color: "green",
  },
  tagAttributeValue: { /* the attribute value inside quotes */
    color: "brown",
  },
  tagAttributeValueDelimiter: { /* the quote around an attribute value */
    color: "gold",
  },
  tagDelimiter: { /* the < and </ and > parts */
    color: "red",
  },
  tagEndEmpty: {
    marginLeft: "-4px",
  },
  tagType: { /* the type of an element inside a tag */
    color: "blue",
  },
  text: {
    // fontStyle: 'italic' as 'italic',
    // color: '#777'
  },
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
