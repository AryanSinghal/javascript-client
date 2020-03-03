import React from 'react';
import MyStyle from './style';

const TextField = (props) => {
  const { disabled = '', value = '', error = false } = props;
  if (disabled === true) {
    return (<MyStyle type="text" className="disabled" disabled value={value} />);
  }
  return (<MyStyle type="text" className={(error) ? 'error' : ''} value={value} />);
};
export default TextField;
