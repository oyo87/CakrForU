import React from "react";
import styled from "styled-components";
import Hb5 from "./components/Hb5";
import Button from "./components/Button";
import Input from "./components/Input";
import Milk from "./assets/img/milk.png";
import H7 from "./components/H7";
import Hb7 from "./components/Hb7";
import NaverIcon from "./assets/img/naver_icon.png";
import GapW from "./components/GapW";
import GapH from "./components/GapH";
import { RadioButton } from "./components/Radio";

function Login() {
  const LoginContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 104px);
    background-color: #f2f1f6;
  `;
  const ImageContainer = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    height: 100%;
  `;
  const LoginForm = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 35.6%;
    height: 72.5%;
    min-width: 200px;
    min-height: 300px;
    // background-color: #aaaaaa;
    margin-top: 7%;
  `;
  const HorizonBox = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 120px;
    gap: ${(props) => props.gap || "0px"};
  `;
  const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  return (
    <LoginContainer>
      <ImageContainer>
        <img src={Milk} alt="milk" />
      </ImageContainer>
      <LoginForm>
        <Hb5>LOGIN</Hb5>
        <GapH height="50px" />
        <HorizonBox gap="10px">
          <Hb7 fontsize="30px">이메일</Hb7>
          <div style={{ flexGrow: 1 }} />
          <RadioButton name="userType" />
          <H7>구매자</H7>
          <GapW width="5px" />
          <RadioButton name="userType" />
          <H7>판매자</H7>
        </HorizonBox>
        <GapH height="11px" />
        <Input width="100%" height="120px" />
        <GapH height="21px" />
        <HorizonBox>
          <Hb7 fontsize="30px">비밀번호</Hb7>
        </HorizonBox>
        <GapH height="11px" />
        <Input width="100%" height="120px" />
        <GapH height="50px" />
        <Button width="100%" height="120px" background="#FF9494">
          <Hb7 color="white">로그인</Hb7>
        </Button>
        <GapH height="21px" />
        <Button width="100%" height="120px" background="#06BE34">
          <a
            href="http://j8a604.p.ssafy.io:8080/oauth2/authorization/naver?redirect_uri=http://j8a604.p.ssafy.io/oauth/redirect"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <FlexBox>
              <img src={NaverIcon} alt="naver" />
              <Hb7 color="white">네이버로 로그인하기</Hb7>
            </FlexBox>
          </a>
        </Button>
        <GapH height="41px" />
        <HorizonBox
          style={{
            justifyContent: "center",
            gap: "13px",
          }}
        >
          <H7 fontsize="18px" color="#9e9e9e">
            계정이 없으신가요?
          </H7>
          <H7 fontsize="18px">구매자 회원가입</H7>
        </HorizonBox>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
