import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import BoldMedium from "./text/BoldMedium";
import Small from "./text/Small";
import Button1 from "./button/Button1";
import Button3 from "./button/Button3";
import LogoDog from "../assets/img/logo_dog.png";
import GapW from "./GapW";

// 사이트 헤더 컴포넌트
function Header() {
  const headerRef = useRef();
  const buttonRef = useRef();

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const [signupMenuVisible, setSignupMenuVisible] = useState(false);

  const toggleSignupMenu = () => {
    setSignupMenuVisible(!signupMenuVisible);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setSignupMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    background-color: white;
  `;
  const LogoSection = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const ClickSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
  const Menu = styled.div`
    display: ${({ visible }) => (visible ? "flex" : "none")};
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 1;
    top: 100%; // Position the menu below the button
    left: 0; // Align the menu with the left side of the button
  `;

  return (
    <div style={{ position: "relative" }} ref={headerRef}>
      <HeaderContainer>
        <LogoSection>
          <ClickSection onClick={handleLogoClick}>
            <BoldMedium>CakeForU</BoldMedium>
            <GapW width="10px" />
            <img
              src={LogoDog}
              alt="logo"
              style={{
                height: "30px",
              }}
            />
          </ClickSection>
        </LogoSection>
        <MenuSection>
          <Small>케이크</Small>
          <Small>가게</Small>
          <Small>추천</Small>
          <Small>리뷰</Small>
        </MenuSection>
        <LoginSection>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Small>로그인</Small>
          </Link>
          <div style={{ position: "relative" }} ref={buttonRef}>
            <Button1 onClick={toggleSignupMenu}>
              <Small color="white">회원가입</Small>
            </Button1>
            <Menu visible={signupMenuVisible}>
              <Link
                to="/signup/buyer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button3
                  width="150px"
                  borderRadius="0px"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  구매자 회원가입
                </Button3>
              </Link>
              <Link
                to="/signup/seller"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button3
                  width="150px"
                  borderRadius="0px"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  판매자 회원가입
                </Button3>
              </Link>
              {/* <Small>Choice 1</Small> */}
              {/* <Small>Choice 2</Small> */}
            </Menu>
          </div>
        </LoginSection>
      </HeaderContainer>
    </div>
  );
}

export default Header;
