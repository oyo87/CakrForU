import React from "react";
import styled from "styled-components";
import UpDownContainer from "./components/UpDownContainer";
import RowContainer from "./components/RowContainer";
import Header from "./components/Header";
import ColContainer from "./components/ColContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import Small from "./components/text/Small";
import Button1 from "./components/button/Button1";
import GapH from "./components/GapH";
import Pick1 from "./assets/img/pick1.png";
import Pick2 from "./assets/img/pick2.png";
import Pick3 from "./assets/img/pick3.png";

function Main() {
  const ImageContainer = styled.div`
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "100%"};
    background-color: ${(props) => props.background || "white"};
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${(props) => props.transform || "none"};
    position: ${(props) => props.position || "absolute"};
    top: ${(props) => props.top || "auto"};
    right: ${(props) => props.right || "auto"};
    bottom: ${(props) => props.bottom || "auto"};
    left: ${(props) => props.left || "auto"};
  `;

  const StyledImage = styled.img`
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "100%"};
    transform: ${(props) => props.transform || "none"};
  `;

  return (
    <div>
      <Header />
      <UpDownContainer minHeight="calc(100vh - 60px)" background="#ADD098">
        <RowContainer justify="start" height="calc(100vh - 60px)">
          <ColContainer align="end" width="32%">
            <BoldLarge fontsize="120px" color="white">
              PICK
            </BoldLarge>
            <BoldLarge
              fontsize="100px"
              color="white"
              style={{ marginTop: "-30px" }}
            >
              YOUR
            </BoldLarge>
            <BoldLarge
              fontsize="56px"
              color="white"
              style={{ marginTop: "-20px" }}
            >
              FAVORITE
            </BoldLarge>
            <GapH height="10px" />
            <BoldSmallMedium color="white">원하는 케이크를</BoldSmallMedium>
            <GapH height="10px" />
            <BoldSmallMedium color="white">
              CakeForU에서 주문하세요
            </BoldSmallMedium>
            <GapH height="30px" />
            <Small color="white">가게에서 등록한 케이크를 확인하세요</Small>
            <GapH height="2px" />
            <Small color="white">원하는 케이크를 직접 디자인해보세요</Small>
            <GapH height="2px" />
            <Small color="white">내 정보를 기반으로 추천받으세요</Small>
            <GapH height="2px" />
            <Small color="white">인기 케이크를 선택하세요</Small>
            <GapH height="30px" />
            <Button1 background="#7DA763">
              <Small color="white">모든 케이크 보기</Small>
            </Button1>
          </ColContainer>
          <ColContainer align="start" width="68%">
            <ImageContainer
              width="238px"
              height="317px"
              transform="rotate(-16deg)"
              top="380px"
              left="750px"
            >
              <StyledImage src={Pick1} alt="pick1" width="97%" height="98%" />
            </ImageContainer>
            <ImageContainer
              width="240px"
              height="315px"
              top="290px"
              left="970px"
            >
              <StyledImage src={Pick2} alt="pick2" width="97%" height="98%" />
            </ImageContainer>
            <ImageContainer
              width="310px"
              height="408px"
              transform="matrix(0.94, 0.33, -0.38, 0.93, 0, 0)"
              top="350px"
              left="1170px"
            >
              <StyledImage src={Pick3} alt="pick3" width="97%" height="98%" />
            </ImageContainer>
          </ColContainer>
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default Main;
