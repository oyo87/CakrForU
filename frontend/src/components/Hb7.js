import styled from "styled-components";

const Hb7 = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: ${(props) => {
    if (props.font) {
      return props.font;
    }
    if (props.theme && props.theme.font) {
      return props.theme.font;
    }
    return "Roboto";
  }};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default Hb7;
