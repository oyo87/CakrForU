import styled from "styled-components";

const UpDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "auto"};
  justify-content: ${(props) => props.justify || "auto"};
  min-height: ${(props) => props.minHeight || "100vh"};
`;

export default UpDownContainer;
