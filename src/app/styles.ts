export const elemStyles = {
  matched: {
    color: 'white',
    backgroundColor: 'green'
  },
  mayMatch: {
    transition: 'color 1s ease, background-color 1s ease',
  },
  element: {
    fontFamily: 'monospace',
    marginBottom: '1px',
    borderRadius: '5px'
  },
  singleLine: {
    display: 'inline-block'
  },
  child: {
    marginLeft: '2em'
  },
  tag: {
    borderRadius: '5px',
    paddingLeft: '2px',
    paddingRight: '2px'
  },
  ownLineEndTag: {
    opacity: 0.4
  }
};

export const formStyles = {
  container: {
    display: 'inline-block',
  },
  input: {},
  button: {},
};

export const mainStyles = {
  container: {}
};

export const merge = (...objs) => Object.assign.apply(Object,[{}].concat(objs));
