import React from 'react';
import PropType from 'prop-types';

export const RadioGroup = (props) => {
  const { value, error } = props;
  return (
    <input type="radio" name="specialty" value={value} />
  );
};
RadioGroup.propType = {
  value: PropType.string,
  error: PropType.bool,
};
RadioGroup.defaultProps = {
  value: '',
  error: false,
};
