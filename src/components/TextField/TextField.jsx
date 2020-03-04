import React from 'react';
import PropType from 'prop-types';
import MyStyle from './style';

const TextField = (props) => {
  const { disabled, value, error } = props;
  return (<MyStyle type="text" className={(error) ? 'error' : ''} disabled={disabled} value={value} />);
};
TextField.propType = {
  disabled: PropType.string,
  value: PropType.string,
  error: PropType.bool,
};
TextField.defaultProps = {
  disabled: '',
  value: '',
  error: false,
};
export default TextField;
