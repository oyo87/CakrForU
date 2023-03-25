import styled from "styled-components";

const RowContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || "auto"};
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
`;

export default RowContainer;
