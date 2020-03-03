import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <>
    <p>
      <b> This is a Disabled Input </b>
    </p>
    <TextField disabled value="Disabled Input" style={{ border: 'grey solid 1px' }} />
    <br />
    <br />
    <p>
      <b> A Valid Input </b>
    </p>
    <TextField value="Accessible" style={{ border: '#DAA59A solid 1px' }} />
    <br />
    <br />
    <p>
      <b>An Input with error</b>
    </p>
    <TextField value="101" style={{ border: 'red solid 1px' }} />
    <p style={{ color: 'red' }}>Could not be greater than</p>
  </>
);
export default TextFieldDemo;
