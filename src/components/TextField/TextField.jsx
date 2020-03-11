import React from 'react';
import PropType from 'prop-types';
import MyStyle from './style';

const TextField = (props) => {
  const { disabled, value, error, onChange } = props;
  return (<MyStyle type="text" className={(error) ? 'error' : ''} disabled={disabled} placeholder={value} onChange={onChange} />);
};
TextField.propType = {
  disabled: PropType.string,
  value: PropType.string,
  error: PropType.bool,
  onChange: PropType.func.isRequired,
};
TextField.defaultProps = {
  disabled: '',
  error: false,
};
export default TextField;
