import styled from "styled-components";

const Hb5 = styled.div`
  font-size: 60px;
  font-weight: bold;
  font-family: ${(props) => {
    if (props.font) {
      return props.font;
    }
    if (props.theme && props.theme.font) {
      return props.theme.font;
    }
    return "NanumGothic";
  }};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default Hb5;
