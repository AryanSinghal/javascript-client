import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <>
    <p> This is a Disabled Input </p>
    <TextField disabled value="Disabled Input" style={{ border: 'grey solid 1px' }} />
    <br />
    <br />
    <p> A Valid Input </p>
    <TextField value="Accessible" style={{ border: '#DAA59A solid 1px' }} />
    <br />
    <br />
    <p>An Input with error</p>
    <TextField value="101" style={{ border: 'red solid 1px' }} />
    <p style={{ color: 'red' }}>Could not be greater than</p>
  </>
);
export default TextFieldDemo;
