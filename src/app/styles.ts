export const elemStyles = {
  matched: {
    color: 'white',
    backgroundColor: '#A261FF',
    borderColor: '#7400FF'
  },
  mayMatch: {
    transition: 'color 0.5s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
  },
  element: {
    fontFamily: 'monospace',
    borderRadius: '5px',
    margin: '1px',
    padding: '1px',
    border: '1px solid transparent',
    borderColor: 'transparent'
  },
  singleLine: {
    display: 'inline-block'
  },
  child: {
    marginLeft: '2em'
  },
  tag: {
    borderRadius: '5px',
    margin: '1px',
    padding: '1px',
    border: '1px solid transparent',
    borderColor: 'transparent'
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
  container: {},
  link: {
    color: 'white'
  }
};

export const merge = (...objs) => Object.assign.apply(Object,[{}].concat(objs));
