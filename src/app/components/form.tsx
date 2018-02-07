import * as React from 'react';

import {formStyles} from '../styles';

type FormProps = {
  callback: (str) => void,
};

const Form: React.StatelessComponent<FormProps> = ({callback}) => {
  let input;
  return (
    <form style={formStyles.container} onSubmit={(e)=>{e.preventDefault(); callback(input.value);}}>
      <input ref={f=>input=f} style={formStyles.input} placeholder="Enter CSS selector"/>
      <input type="submit" style={formStyles.button} value="Submit" />
    </form>
  );
};

export default Form;
