import React from 'react';
import { Math } from '../../components';

export class ChildrenDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  children = (first, second, operator, result) => {
    switch (operator) {
    case '+':
      return (`sum of ${first} and ${second} is ${result}`);
    case '-':
      return (`subtraction of ${first} and ${second} is ${result}`);
    case '/':
      return (`division of ${first} and ${second} is ${result}`);
    case '*':
      return (`multiplication of ${first} and ${second} is ${result}`);
    default:
      return (`${operator} of ${first} and ${second} is Invalid Operation`);
    }
  }

  render() {
    return (
      <>
        <Math first="2" second="3" operator="^" children={this.children} />
        <Math first="6" second="3" operator="+" children={this.children} />
        <Math first="32" second="9" operator="-" children={this.children} />
        <Math first="4" second="33" operator="*" />
        <Math first="25" second="13" operator="?" children={this.children} />
        <Math first="2" second="3" operator="/" />
      </>
    );
  }
}
