export const elemStyles = {
  matched: {
    color: 'green'
  },
  element: {
    transition: 'color 1s ease',
    fontFamily: 'monospace',
    color: 'black'
  },
  child: {
    marginLeft: '2em'
  }
};

export const formStyles = {
  container: {},
  input: {},
  button: {}
};

export const mainStyles = {
  container: {}
};

export const merge = (curr, toAdd) => Object.assign({},curr,toAdd);
