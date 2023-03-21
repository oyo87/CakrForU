import React from "react";
import styled from "styled-components";
import B5 from "./B5";
import H7 from "./H7";
import Button from "./Button";
import LogoDog from "../assets/img/logo_dog.png";

// 사이트 헤더 컴포넌트
function Header() {
  const HeaderContainer = styled.header`
    width: 100%;
    height: 100px;
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
        <B5>CakeForU</B5>
        <img src={LogoDog} alt="logo" />
      </LogoSection>
      <MenuSection>
        <H7>케이크</H7>
        <H7>가게</H7>
        <H7>추천</H7>
      </MenuSection>
      <LoginSection>
        <H7>로그인</H7>
        <Button width="219px" height="56px">
          <H7 color="white">회원가입</H7>
        </Button>
      </LoginSection>
    </HeaderContainer>
  );
}

export default Header;
