import styled from 'styled-components';

const ButtonStyle = styled.button`{
    padding: 1%;
    border-radius: 4px;
    border: grey solid 1px;
    color: black;
  }
  &.success{
    background-color: green;
  }
  & .disabled{
    color: grey;
  }`;
export default ButtonStyle;