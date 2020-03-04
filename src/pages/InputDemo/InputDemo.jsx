import React from 'react';
import { SelectField } from '../../components';
import { TextField } from '../../components';
import { RadioGroup } from '../../components';



export const InputDemo = () => {
  return (
    <>
      <p>Name</p>
      <TextField onChange={((e) => { console.log(e.target.value); })} />
      <p> Select the game you play </p>
      <SelectField />
      <p>What you Do</p>
      <RadioGroup />
    </>
  );
};
