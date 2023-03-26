import { createGlobalStyle } from "styled-components";
import NanumSquareR from "./fonts/NanumSquareR.ttf";
import NanumSquareB from "./fonts/NanumSquareB.ttf";
import NanumSquareEB from "./fonts/NanumSquareEB.ttf";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  form {
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: 'NanumSquareR';
    src: url(${NanumSquareR}) format('truetype');
  }
  @font-face {
    font-family: 'NanumSquareB';
    src: url(${NanumSquareB}) format('truetype');
  }
  @font-face {
    font-family: 'NanumSquareEB';
    src: url(${NanumSquareEB}) format('truetype');
  }
`;

export default GlobalStyle;
