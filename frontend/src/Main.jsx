import React from "react";
import styled from "styled-components";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import Small from "./components/text/Small";
import Button1 from "./components/button/Button1";
import GapH from "./components/layout/GapH";
import Pick1 from "./assets/img/pick1.png";
import Pick2 from "./assets/img/pick2.png";
import Pick3 from "./assets/img/pick3.png";
import Mask1 from "./assets/img/mask1.png";
import Mask2 from "./assets/img/mask2.png";
import Mask3 from "./assets/img/mask3.png";
import Mask4 from "./assets/img/mask4.png";
import BoldMedium from "./components/text/BoldMedium";
import MediumSmall from "./components/text/MediumSmall";
import GapW from "./components/layout/GapW";

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

function Main() {
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
      <UpDownContainer>
        <RowContainer
          justify="start"
          background="#8C8279"
          height="calc(100vh / 2)"
        >
          <img
            src={Mask1}
            alt="mask1"
            style={{
              height: "100%",
            }}
          />
          <GapW width="180px" />
          <ColContainer align="start">
            <BoldMedium color="white">위시리스트 기반 추천</BoldMedium>
            <BoldSmallMedium color="white">
              내 위시리스트랑 비슷한 취향의 케이크는?
            </BoldSmallMedium>
            <GapH height="23px" />
            <MediumSmall color="white">
              AI가 당신의 위시리스트를 분석하여
            </MediumSmall>
            <MediumSmall color="white">
              당신에게 맞는 케이크를 추천해드립니다.
            </MediumSmall>
            <GapH height="38px" />
            <Button1 background="#615143">
              <Small color="white">자세히 보기</Small>
            </Button1>
          </ColContainer>
        </RowContainer>
        <RowContainer
          justify="end"
          background="#F0F0E8"
          height="calc(100vh / 2)"
        >
          <ColContainer align="start">
            <BoldMedium>성별/나이 기반 추천</BoldMedium>
            <BoldSmallMedium>내 또래가 좋아하는 케이크는?</BoldSmallMedium>
            <GapH height="23px" />
            <MediumSmall>당신의 성별과 나이에 기반하여</MediumSmall>
            <MediumSmall>비슷한 그룹의 사용자들이</MediumSmall>
            <MediumSmall>좋아할만한 케이크를 추천해드립니다.</MediumSmall>
            <GapH height="38px" />
            <Button1 background="#B5B59E">
              <Small color="white">자세히 보기</Small>
            </Button1>
          </ColContainer>
          <GapW width="350px" />
          <img
            src={Mask2}
            alt="mask2"
            style={{
              height: "100%",
            }}
          />
        </RowContainer>
      </UpDownContainer>
      <UpDownContainer>
        <RowContainer
          justify="start"
          background="#EEF1FF"
          height="calc(100vh / 2)"
        >
          <img
            src={Mask3}
            alt="mask3"
            style={{
              height: "100%",
            }}
          />
          <GapW width="180px" />
          <ColContainer align="start">
            <BoldMedium>재료/조합별 추천</BoldMedium>
            <BoldSmallMedium>지금 가장 인기있는 조합은?</BoldSmallMedium>
            <GapH height="23px" />
            <MediumSmall>당신이 선택한 조합에 맞게</MediumSmall>
            <MediumSmall>인기있는 케이크를 추천해드립니다.</MediumSmall>
            <GapH height="38px" />
            <Button1 background="#CED7FF">
              <Small color="white">자세히 보기</Small>
            </Button1>
          </ColContainer>
        </RowContainer>
        <RowContainer
          justify="end"
          background="#F8F8F8"
          height="calc(100vh / 2)"
        >
          <ColContainer align="start">
            <BoldMedium>상황/기념일 추천</BoldMedium>
            <BoldSmallMedium>
              곧 다가오는 기념일, 어떤 케이크가 좋을까요?
            </BoldSmallMedium>
            <GapH height="23px" />
            <MediumSmall>다가오는 생일이나 연인과의 기념일</MediumSmall>
            <MediumSmall>그 날에 어울리는 케이크를 추천해드립니다.</MediumSmall>
            <GapH height="38px" />
            <Button1 background="#FFACAC">
              <Small color="white">자세히 보기</Small>
            </Button1>
          </ColContainer>
          <GapW width="350px" />
          <img
            src={Mask4}
            alt="mask4"
            style={{
              height: "100%",
            }}
          />
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default Main;
