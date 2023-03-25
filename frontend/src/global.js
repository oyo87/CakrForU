import { createGlobalStyle } from "styled-components";

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
    font-family: 'NanumSquareNeoEB';
    src: url('./fonts/NanumSquareNeoTTF-cBd.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Nanum GarMaesGeur';
    src: url('./fonts/Nanum GarMaesGeur.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NanumSquareR';
    src: url('./fonts/NanumSquareR.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NanumSquareB';
    src: url('./fonts/NanumSquareB.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NanumSquareEB';
    src: url('./fonts/NanumSquareEB.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Nanum GaRamYeonGgoc';
    src: url('./fonts/Nanum Nanum GaRamYeonGgoc.ttf') format('truetype');
  }
`;

export default GlobalStyle;
