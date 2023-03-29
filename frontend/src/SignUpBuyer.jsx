import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import RowContainer from "./components/layout/RowContainer";
import ColContainer from "./components/layout/ColContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmall from "./components/text/BoldSmall";
import MediumSmall from "./components/text/MediumSmall";
import Input from "./components/Input";
import GapH from "./components/layout/GapH";
import Button1 from "./components/button/Button1";
import Button4 from "./components/button/Button4";
import GapW from "./components/layout/GapW";
import Select from "./components/Select";
import BoldMedium from "./components/text/BoldMedium";
import BuyerCarousel from "./components/BuyerCarousel";
import NaverIcon from "./assets/img/naver_icon.png";

const HorizonBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || "start"};
  align-items: center;
  width: 539px;
  gap: ${(props) => props.gap || "0px"};
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function SignUpBuyer() {
  return (
    <div>
      <Header />
      <LeftRightContainer
        justify="center"
        background="white"
        minHeight="calc(100vh - 60px)"
      >
        <RowContainer
          width="1434px"
          boxShadow="0 0 20px 10px rgba(0, 0, 0, 0.15)"
          background="white"
        >
          <ColContainer width="50%">
            <BoldLarge color="#BE1E1E">SIGN UP</BoldLarge>
            <GapH height="35px" />
            <HorizonBox>
              <MediumSmall>이메일</MediumSmall>
            </HorizonBox>
            <GapH height="10px" />
            <Input width="539px" height="55px" borderRadius="10px" />
            <GapH height="25px" />
            <HorizonBox>
              <MediumSmall>비밀번호</MediumSmall>
            </HorizonBox>
            <GapH height="10px" />
            <Input width="539px" height="55px" borderRadius="10px" />
            <GapH height="25px" />
            <HorizonBox>
              <ColContainer width="64%" align="start">
                <MediumSmall>닉네임</MediumSmall>
              </ColContainer>
              <ColContainer width="1%" />
              <ColContainer width="35%" align="start">
                <MediumSmall>성별</MediumSmall>
              </ColContainer>
            </HorizonBox>
            <GapH height="10px" />
            <HorizonBox>
              <Input width="344px" height="55px" borderRadius="10px" />
              <GapW width="11px" />
              <Select width="183px" height="55px" options={["여성", "남성"]} />
            </HorizonBox>
            <GapH height="25px" />
            <HorizonBox>
              <MediumSmall>생년월일</MediumSmall>
            </HorizonBox>
            <GapH height="10px" />
            <HorizonBox>
              <Input width="201px" height="55px" borderRadius="10px" />
              <GapW width="11px" />
              <Input width="161px" height="55px" borderRadius="10px" />
              <GapW width="11px" />
              <Input width="161px" height="55px" borderRadius="10px" />
            </HorizonBox>
            <GapH height="25px" />
            <HorizonBox>
              <MediumSmall>연락처</MediumSmall>
            </HorizonBox>
            <GapH height="10px" />
            <HorizonBox>
              <Select
                width="201px"
                height="55px"
                options={[
                  "010",
                  "011",
                  "012",
                  "013",
                  "015",
                  "016",
                  "017",
                  "018",
                  "019",
                ]}
              />
              <GapW width="11px" />
              <Input width="161px" height="55px" borderRadius="10px" />
              <GapW width="11px" />
              <Input width="161px" height="55px" borderRadius="10px" />
            </HorizonBox>
            <GapH height="35px" />
            <HorizonBox justify="end" gap="6px">
              <Button1>메인으로</Button1>
              <Button1>회원가입</Button1>
            </HorizonBox>
          </ColContainer>
          <ColContainer width="50%">
            <BoldMedium>나만의 케이크를 주문해보세요</BoldMedium>
            <BoldMedium color="#BE1E1E">Better Special Cake</BoldMedium>
            <GapH height="28px" />
            <BuyerCarousel />
            <GapH height="20px" />
            <BoldSmall>간편 회원가입도 준비되어 있어요</BoldSmall>
            <GapH height="18px" />
            <Link
              to="http://j8a604.p.ssafy.io:8080/oauth2/authorization/naver?redirect_uri=http://j8a604.p.ssafy.io/oauth/redirect"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button4 width="460px" background="#06BE34">
                <FlexBox>
                  <img src={NaverIcon} alt="naver" />
                  <MediumSmall color="white">네이버로 로그인하기</MediumSmall>
                </FlexBox>
              </Button4>
            </Link>
          </ColContainer>
        </RowContainer>
      </LeftRightContainer>
    </div>
  );
}

export default SignUpBuyer;
