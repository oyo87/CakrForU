import styled from "styled-components";

const H6 = styled.div`
  font-size: 40px;
  font-weight: normal;
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default H6;
