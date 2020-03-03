import React from 'react';
import { TextField, Slider } from '../../components';

const TextFieldDemo = () => (
  <>
    <Slider />
    <p>
      <b> This is a Disabled Input </b>
    </p>
    <TextField disabled value="Disabled Input" />
    <br />
    <br />
    <p>
      <b> A Valid Input </b>
    </p>
    <TextField value="Accessible" />
    <br />
    <br />
    <p>
      <b>An Input with error</b>
    </p>
    <TextField value="101" error />
    <p style={{ color: 'red' }}>Could not be greater than</p>
  </>
);
export default TextFieldDemo;
