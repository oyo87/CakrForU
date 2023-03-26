import styled from "styled-components";

const ColContainer = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "100%"};
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
`;

export default ColContainer;
