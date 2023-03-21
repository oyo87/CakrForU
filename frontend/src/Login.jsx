import React from "react";
import styled from "styled-components";
import Hb5 from "./components/Hb5";
import Button from "./components/Button";
import H7 from "./components/H7";
// import B4 from "../components/B4";
// import B5 from "../components/B5";
// import B7 from "../components/B7";
import Input from "./components/Input";
import Milk from "./assets/img/milk.png";
import Hb7 from "./components/Hb7";

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
    height: 52.5%;
    min-width: 200px;
    min-height: 300px;
    // background-color: #aaaaaa;
    margin-top: 8%;
  `;
  const HorizonBox = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 7.2%;
    // background-color: #bbbbbb;
  `;

  return (
    <LoginContainer>
      <ImageContainer>
        <img src={Milk} alt="milk" />
      </ImageContainer>
      <LoginForm>
        <Hb5>LOGIN</Hb5>
        <HorizonBox>
          <H7 fontsize="30px">이메일</H7>
          <div style={{ flexGrow: 1 }} />
          hi
        </HorizonBox>
        <Input width="100%" height="7.2%" />
        <HorizonBox>
          <H7 fontsize="30px">비밀번호</H7>
        </HorizonBox>
        <Input width="100%" height="7.2%" />
        <Button width="100%" height="7.2%" background="#FF9494">
          <Hb7 color="white">로그인</Hb7>
        </Button>
        <Button width="100%" height="7.2%" background="#06BE34">
          <Hb7 color="white">네이버로 로그인하기</Hb7>
        </Button>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
