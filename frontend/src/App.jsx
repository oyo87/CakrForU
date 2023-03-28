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
import RecommendPersonal from "./RecommendPersonal";
import Testpage from "./test/Testpage";
import Popular from "./Popular";
import Mypage from "./Mypage";
import PortfolioModal from "./components/PortfolioModal";

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
        <Route path="/popular" element={<Popular />} />
        <Route path="/modal" element={<PortfolioModal />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/test" element={<Testpage />} />
        <Route path="/dragsize" element={<DragSize />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
        <Route path="/recommend/personal" element={<RecommendPersonal />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
