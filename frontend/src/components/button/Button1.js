import styled from "styled-components";

const Button1 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 16px;
  background: ${(props) => {
    if (props.background) {
      return props.background;
    }
    if (props.theme && props.theme.background) {
      return props.theme.background;
    }
    return "black";
  }};
  color: ${(props) => {
    if (props.color) {
      return props.color;
    }
    if (props.theme && props.theme.color) {
      return props.theme.color;
    }
    return "white";
  }};
  border: ${(props) => {
    if (props.border) {
      return props.border;
    }
    return "none";
  }};
  border-radius: 5px;
`;

export default Button1;
