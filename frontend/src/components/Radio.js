import styled from "styled-components";

const RadioButton = styled.input.attrs((props) => ({
  type: "radio",
  name: props.name || null,
  onChange: props.onChange || null,
  checked: props.checked || false,
}))`
  cursor: pointer;
  accent-color: #ff0000;
`;

const Label = styled.label``;

export { RadioButton, Label };
