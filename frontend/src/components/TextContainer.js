import styled from "styled-components";

const TextContainer = styled.div`
  width: ${(props) => props.width || "auto"};
  white-space: ${(props) => props.whiteSpace || "pre-wrap"};
  word-wrap: ${(props) => props.wordWrap || "break-word"};
`;

export default TextContainer;
