import React from 'react';
import PropType from 'prop-types';

export const SelectField = (props) => {
  const { value, error } = props;
  return (
    <select>
      <option>select</option>
    </select>
  );
};
SelectField.propType = {
  value: PropType.string,
  error: PropType.bool,
};
SelectField.defaultProps = {
  value: '',
  error: false,
};
