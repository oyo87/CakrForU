import React from "react";
import styled from "styled-components";
import image from "./assets/img/login_image.png";
import googleLogo from "./assets/img/google_logo.png";
import Button from "./components/Button";
import H6 from "./components/H6";
import H7 from "./components/H7";
import B4 from "./components/B4";
import B5 from "./components/B5";
import B7 from "./components/B7";
import Input from "./components/Input";

function Login() {
  const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  `;
  const LeftSide = styled.div`
    width: 40%;
    height: 100%;
    min-width: 562px;
    min-height: 765px;
  `;
  const LoginContents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  `;
  const RightSide = styled.div`
    @media (max-width: 950px) {
      display: none;
    }
    position: relative;
    width: 60%;
    height: 100%;
  `;
  const RightField = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  `;
  const LoginImage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
  const FlexBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  return (
    <LoginContainer>
      <LeftSide>
        <LoginContents>
          <H6 style={{ marginBottom: 23 }}>환영합니다</H6>
          <H7 style={{ marginBottom: 35 }}>
            커스텀 케이크를 주문하는 가장 빠른 방법
          </H7>
          <form>
            <H7 style={{ marginBottom: 18 }}>이메일</H7>
            <Input
              placeholder="이메일을 입력하세요"
              style={{ marginBottom: 30 }}
            />
            <H7 style={{ marginBottom: 18 }}>패스워드</H7>
            <Input placeholder="**********" style={{ marginBottom: 26 }} />
            <FlexBox style={{ marginBottom: 31 }}>
              <input type="checkbox" style={{ marginRight: 10 }} />
              <H7 style={{ flexGrow: 1 }}>아이디 저장</H7>
              <H7>비밀번호 찾기</H7>
            </FlexBox>
            <Button
              background="black"
              color="white"
              style={{ marginBottom: 29 }}
            >
              <H7 color="white">로그인</H7>
            </Button>
          </form>
          <Button style={{ marginBottom: 100 }}>
            <H7>
              <FlexBox style={{ justifyContent: "center" }}>
                <img
                  src={googleLogo}
                  alt="google_logo"
                  style={{ marginRight: 5 }}
                />
                Google로 시작하기
              </FlexBox>
            </H7>
          </Button>
          <FlexBox style={{ justifyContent: "center" }}>
            <H7 style={{ marginRight: 30 }} color="#CCCCCC">
              계정이 없으신가요?
            </H7>
            <H7>회원가입</H7>
          </FlexBox>
        </LoginContents>
      </LeftSide>
      <RightSide>
        <RightField>
          <B4
            color="#E79CB3"
            style={{ position: "absolute", right: 44, top: 48 }}
          >
            CakeForU
          </B4>
          <B5
            color="#FFE3E1"
            style={{ position: "absolute", left: 44, bottom: 129 }}
          >
            Strawberry
          </B5>
          <B5
            color="#E79CB3"
            style={{ position: "absolute", left: 314, bottom: 129 }}
          >
            3단 케이크
          </B5>
          <B7
            color="white"
            style={{ position: "absolute", left: 109, bottom: 80 }}
          >
            사랑하는 사람을 위한 세상 단 하나뿐인 케이크
          </B7>
          <B7
            color="white"
            style={{ position: "absolute", left: 155, bottom: 55 }}
          >
            CakeForU에서 지금 주문하세요!
          </B7>
        </RightField>
        <LoginImage>
          <img src={image} alt="login" />
        </LoginImage>
      </RightSide>
    </LoginContainer>
  );
}

export default Login;
