import styled from "styled-components";

const B5 = styled.div`
  font-size: 60px;
  font-weight: normal;
  font-family: ${(props) => {
    if (props.font) {
      return props.font;
    }
    if (props.theme && props.theme.font) {
      return props.theme.font;
    }
    return "Nanum GarMaesGeur";
  }};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default B5;
