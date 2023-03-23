import styled from "styled-components";

const Input = styled.input`
  width: ${(props) => props.width || "490px"};
  height: ${(props) => props.height || "58px"};
  type: text;
  placeholder: ${(props) => (props.placeholder ? props.placeholder : "")};
  text-indent: 20px;
`;

export default Input;
