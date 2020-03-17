import React from 'react';
import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Math } from '../../components';
import { theme } from '../../theme';

export class ChildrenDemo extends React.Component {
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
      <div align="center">
        <Math first="2" second="3" operator="^">{this.children}</Math>
        <Math first="6" second="3" operator="+">{this.children}</Math>
        <Math first="32" second="9" operator="-">{this.children}</Math>
        <Math first="4" second="33" operator="*">{this.children}</Math>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">
            <Math first="25" second="13" operator="?">{this.children}</Math>
            <Math first="2" second="3" operator="/">{this.children}</Math>
          </Typography>
        </ThemeProvider>
      </div>
    );
  }
}
