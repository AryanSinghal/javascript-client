import styled from 'styled-components';

export const Select = styled.select`{
    width: 99%;
    height: 20%;
    padding: 1%;
    border-radius: 4px;
    border: grey solid 1px;
  }
  &.error{
    border: red solid 1px;
  }`;
export const Option = styled.option`{
  font-size: 14px;
}`;
