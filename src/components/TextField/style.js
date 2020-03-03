import styled from 'styled-components';

const MyStyle = styled.input`{
    width: 97%;
    height: 20%;
    padding: 1%;
    border-radius: 4px;
    border: grey solid 1px;
  }
  &.error{
    border: red solid 1px;
  }`;
export default MyStyle;
