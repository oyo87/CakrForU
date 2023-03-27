import React, { useState } from "react";
import styled from "styled-components";
import UpDownContainer from "./components/UpDownContainer";
import RowContainer from "./components/RowContainer";
import ColContainer from "./components/ColContainer";
import BoldMedium from "./components/text/BoldMedium";
import BoldLarge from "./components/text/BoldLarge";
import Button4 from "./components/button/Button4";
import GapW from "./components/GapW";
import GapH from "./components/GapH";
import Burger from "./assets/img/burger.png";
import Header from "./components/Header";

function Testpage() {
  const [isActive, setIsActive] = useState(false);
  const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: 100%;
  `;
  const SideBar = styled.div`
    width: 200px;
    height: 100%;
    top: 100;
    left: 0;
    background-color: red;
    position: absolute;
    z-index: 1;
  `;
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Header />
      {isActive && <SideBar />}
      <UpDownContainer>
        <RowContainer height="480px" background="#F0F0E8" justify="start">
          <GapW width="137px" />
          <ColContainer
            justify="start"
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <GapH height="148px" />
            <img src={Burger} alt="burger" />
          </ColContainer>
          <GapW width="150px" />
          <ColContainer align="start">
            <GapH height="107px" />
            <BoldMedium>MY PAGE</BoldMedium>
            <GapH height="74px" />
            <FlexBox>
              <BoldLarge>배진호 님의 마이페이지입니다.</BoldLarge>
              <GapW width="250px" />
              <Button4 background="#FFACAC">
                <BoldMedium color="white">회원정보 수정</BoldMedium>
              </Button4>
            </FlexBox>
          </ColContainer>
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default Testpage;
