import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ColContainer from "./layout/ColContainer";
import Medium from "./text/Medium";

const SideBar = styled.div`
  width: 440px;
  height: 100vh;
  top: 100;
  left: 0;
  z-index: 1;
`;

function RecommendSidebar() {
  return (
    <div>
      <SideBar>
        <ColContainer justify="start" align="start">
          <Link
            to="/recommend/personal"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "20px 70px",
            }}
          >
            <Medium>취향</Medium>
          </Link>
          <Link
            to="/recommend/theme"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "20px 70px",
            }}
          >
            <Medium>테마</Medium>
          </Link>
          <Link
            to="/recommend/combination"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "20px 70px",
            }}
          >
            <Medium>조합</Medium>
          </Link>
          <Link
            to="/recommend/wishlist"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "20px 70px",
            }}
          >
            <Medium>빅데이터</Medium>
          </Link>
        </ColContainer>
      </SideBar>
    </div>
  );
}

export default RecommendSidebar;
