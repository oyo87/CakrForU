import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Drag from "./Drag";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
        <Route path="/drag" element={<Drag />} />
        <Route path="/dragsize" element={<DragSize />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
