import React from 'react';
import PropType from 'prop-types';
import { default as ButtonStyle } from './style';

export const Button = (props) => {
  const { value, error, onChange, disabled } = props;
  return (
    <>
      <ButtonStyle type="button" disabled={disabled}>{value}</ButtonStyle>
    </>
  );
};

Button.propType = {
  value: PropType.string.isRequired,
  error: PropType.bool,
  color: PropType.string,
  onChange: PropType.func.isRequired,
  disabled: PropType.string,
  style: PropType.object,
};
Button.defaultProps = {
  error: false,
  style: {},
  color: 'default',
  disabled: '',
};
