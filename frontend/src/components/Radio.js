import styled from "styled-components";

const RadioButton = styled.input.attrs({ type: "radio" })`
  cursor: pointer;
  accent-color: #ff0000;
  name: ${(props) => {
    if (props.name) {
      return props.name;
    }
    return null;
  }};
`;

const Label = styled.label``;

export { RadioButton, Label };
