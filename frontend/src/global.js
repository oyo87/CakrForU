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
    font-family: 'Nanum GarMaesGeur';
    src: url('./fonts/Nanum GarMaesGeur.ttf') format('truetype');
  }
`;

export default GlobalStyle;
