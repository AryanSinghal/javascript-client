import React from 'react';
import { Math } from '../../components';

export class ChildrenDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  children = (first, second, operator, result) => {
    return (`sum of ${first} and ${second} is ${result}`);
  }

  render() {
    return (
      <Math first="2" second="3" operator="^" />
    );
  }
}
