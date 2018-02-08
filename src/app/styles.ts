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
    //opacity: 0.4
  },
  text: {
    //fontStyle: 'italic' as 'italic',
    //color: '#777'
  }
};

export const formStyles = {
  container: {
    display: 'inline-block',
  },
  input: {},
  button: {},
};

export const historyStyles = {
  container: {},
  button: {
    width: '120px',
    display: 'inline-block',
    marginRight: '5px'
  },
  activeButton: {
    boxShadow: 'inset 1px 1px 10px #333'
  },
  description: {}
};

export const mainStyles = {
  container: {}
};

export const merge = (...objs) => Object.assign.apply(Object,[{}].concat(objs));
