import styled from "styled-components";

const UpDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "auto"};
  justify-content: ${(props) => props.justify || "auto"};
  min-height: ${(props) => props.minHeight || "100vh"};
  height: ${(props) => props.height || "auto"};
  width: ${(props) => props.width || "auto"};
  background-color: ${(props) => props.background || "transparent"};
`;

export default UpDownContainer;
