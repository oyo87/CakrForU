/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import axios from "./util/axiosInstance";
import BoldMedium from "./components/text/BoldMedium";
import Medium from "./components/text/Medium";

function SellerPortfolio() {
  const seller = useSelector((state) => state.login.user);

  return (
    <div>
      <Header />
      <LeftRightContainer>
        <ColContainer width="276px">
          <SellerSide />
          <GapH height="89px" />
        </ColContainer>
        <ColContainer align="start">
          <GapH height="89px" />
          <RowContainer
            justify="start"
            width="1200px"
            height="121px"
            background="#F0F5FA"
          >
            <GapW width="30px" />
            <BoldLarge fontsize="40px">{seller.businessName}</BoldLarge>
          </RowContainer>
          <GapH height="50px" />
          <RowContainer justify="start">
            <GapW width="30px" />

            <BoldMedium>포트폴리오</BoldMedium>
          </RowContainer>
          <GapH height="58px" />
        </ColContainer>
      </LeftRightContainer>
    </div>
  );
}

export default SellerPortfolio;
