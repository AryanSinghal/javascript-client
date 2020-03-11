import React, { Fragment } from 'react';
import PropType from 'prop-types';

export const RadioGroup = (props) => {
  const { value, error, options, onChange } = props;
  return (
    options && options.length && options.map((option) => (
      <>
        <Fragment key={option.label}>
          <input type="radio" name="specialty" value={option.value} onChange={onChange} defaultChecked={value === option.value} />
          {option.label}
          <br />
        </Fragment>
      </>
    ))
  );
};

RadioGroup.propType = {
  value: PropType.string,
  error: PropType.bool,
  options: PropType.array.isRequired,
  onChange: PropType.func,
};
RadioGroup.defaultProps = {
  value: '',
  error: false,
};
