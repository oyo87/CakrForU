import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./Login";
import Main from "./Main";
import DragSize from "./DragSize";
import AuthPage from "./AuthPage";
import SignUpBuyer from "./SignUpBuyer";
import SignUpSeller from "./SignUpSeller";

function App() {
  const AppContainer = styled.div`
    &,
    & * {
      box-sizing: border-box;
    }
  `;
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/buyer" element={<SignUpBuyer />} />
        <Route path="/signup/seller" element={<SignUpSeller />} />
        <Route path="/main" element={<Main />} />
        <Route path="/dragsize" element={<DragSize />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
