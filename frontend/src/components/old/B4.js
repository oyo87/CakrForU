import styled from "styled-components";

const B4 = styled.div`
  font-size: 80px;
  font-weight: normal;
  font-family: "Nanum GarMaesGeur";
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default B4;
