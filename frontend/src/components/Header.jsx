import React from "react";
import styled from "styled-components";
import BoldMedium from "./text/BoldMedium";
import Small from "./text/Small";
import Button1 from "./button/Button1";
import LogoDog from "../assets/img/logo_dog.png";
import GapW from "./GapW";

// 사이트 헤더 컴포넌트
function Header() {
  const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid #e5e5e5;
  `;
  const LogoSection = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const MenuSection = styled.div`
    width: 53%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 48px;

    &::before {
      content: "";
      display: block;
      width: 30px;
    }
  `;
  const LoginSection = styled.div`
    width: 27%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
  `;

  return (
    <HeaderContainer>
      <LogoSection>
        <BoldMedium>CakeForU</BoldMedium>
        <GapW width="10px" />
        <img
          src={LogoDog}
          alt="logo"
          style={{
            height: "30px",
          }}
        />
      </LogoSection>
      <MenuSection>
        <Small>케이크</Small>
        <Small>가게</Small>
        <Small>추천</Small>
        <Small>리뷰</Small>
      </MenuSection>
      <LoginSection>
        <Small>로그인</Small>
        <Button1>
          <Small color="white">회원가입</Small>
        </Button1>
      </LoginSection>
    </HeaderContainer>
  );
}

export default Header;
