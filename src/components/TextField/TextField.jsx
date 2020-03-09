import React from 'react';
import PropType from 'prop-types';
import { MyStyle, Error } from './style';

const TextField = (props) => {
  const { disabled, value, error, onChange, onBlur } = props;
  return (
    <>
      <MyStyle type="text" className={(error) ? 'error' : ''} disabled={disabled} onBlur={onBlur} placeholder={value} onChange={onChange} />
      <Error>{error}</Error>
    </>
  );
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
