import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Home";
import Login from "./Login";
import DragSize from "./DragSize";
import AuthPage from "./AuthPage";

function App() {
  const AppContainer = styled.div`
    &,
    & * {
      box-sizing: border-box;
    }
  `;
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dragsize" element={<DragSize />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
