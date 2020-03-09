import React, { Component } from 'react';
import PropType from 'prop-types';
import { OPERATORS } from '../../configs/constants';

export class Math extends Component {
  constructor(props) {
    super(props);
  }

  calResult = (first, second, operator) => {
    let result = first + operator + second;
    result = (OPERATORS.includes(operator)) ? eval(result) : 'Invalid Operation';
    return result;
  };

  render() {
    const {
      first, second, operator, children,
    } = this.props;
    const result = this.calResult(first, second, operator);
    return (children !== undefined)
      ? (<p>{children(first, second, operator)}</p>)
      : (<p>{`${first} ${operator} ${second} = ${result}`}</p>);
  }
}

Math.protoType = {
  first: PropType.number.isRequired,
  second: PropType.number.isRequired,
  operator: PropType.oneOf(['+', '-', '/', '*']).isRequired,
  children: PropType.func,
};

Math.defaultProps = {
  children: undefined,
};
