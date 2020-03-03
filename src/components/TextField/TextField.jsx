import React from 'react';
import MyStyle from './style';

const TextField = (props) => {
  const { disabled = '', value = '', error = false } = props;
  return (<MyStyle type="text" className={(error) ? 'error' : ''} disabled={disabled} value={value} />);
};
export default TextField;
