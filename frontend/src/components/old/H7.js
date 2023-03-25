import styled from "styled-components";

const H7 = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "20px";
  }};
  font-weight: normal;
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

export default H7;
