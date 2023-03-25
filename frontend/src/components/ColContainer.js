import styled from "styled-components";

const ColContainer = styled.div`
  width: ${(props) => props.width || "auto"};
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction || "auto"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
`;

export default ColContainer;
