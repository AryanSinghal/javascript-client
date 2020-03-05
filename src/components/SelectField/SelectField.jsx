import React from 'react';
import PropType from 'prop-types';
import { Select, Option } from './style';

export const SelectField = (props) => {
  const { error, options, onChange, defaultText, value } = props;
  return (
    <Select defaultValue={value} onChange={onChange}>
      { defaultText && <Option value="">{defaultText}</Option> }
      {
        options && options.length && options.map((option) => (
          <Option key={option.label} value={option.value}>{option.label}</Option>
        ))
      }
    </Select>
  );
};
SelectField.propType = {
  value: PropType.string,
  error: PropType.bool,
  options: PropType.array.isRequired,
  defaultText: PropType.string,
  onChange: PropType.func,
};
SelectField.defaultProps = {
  error: false,
  defaultText: '',
};
