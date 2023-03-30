import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/loginSlice";
import axios from "../util/axiosInstance";
import BoldMedium from "./text/BoldMedium";
import Small from "./text/Small";
import Button1 from "./button/Button1";
import Button3 from "./button/Button3";
import LogoDog from "../assets/img/logo_dog.png";
import GapW from "./layout/GapW";

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

// 사이트 헤더 컴포넌트
function Header({ handleClickOutModal }) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.user);

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

  const handleLogout = () => {
    dispatch(logout());
    window.alert("로그아웃 되었습니다.");
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      const token = localStorage.getItem("access-token");
      if (token) {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/buyer/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((response) => {
            dispatch(login(response.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/");
          })
          .catch(() => {
            axios
              .get(`${process.env.REACT_APP_BACKEND_URL}/seller/`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access-token"
                  )}`,
                },
              })
              .then((response) => {
                dispatch(login(response.data));
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");
              });
          });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function loginFalse() {
    return (
      <LoginSection>
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          <Small cursor="pointer">로그인</Small>
        </Link>
        <div style={{ position: "relative" }} ref={buttonRef}>
          <Button1 onClick={toggleSignupMenu}>
            <Small color="white" cursor="pointer">
              회원가입
            </Small>
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
          </Menu>
        </div>
      </LoginSection>
    );
  }

  function loginTrue() {
    return (
      <LoginSection>
        <Link to="/mylist" style={{ textDecoration: "none", color: "inherit" }}>
          <Small cursor="pointer">마이리스트</Small>
        </Link>
        <Small onClick={handleLogout} cursor="pointer">
          로그아웃
        </Small>
      </LoginSection>
    );
  }
  return (
    <div style={{ position: "relative" }} ref={headerRef}>
      <HeaderContainer onClick={handleClickOutModal}>
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
          <Link
            to="/main"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Small cursor="pointer">케이크</Small>
          </Link>
          <Link
            to="/popular"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Small cursor="pointer">가게</Small>
          </Link>
          <Link
            to="/recommend/personal"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Small cursor="pointer">추천</Small>
          </Link>
          <Small cursor="pointer">리뷰</Small>
        </MenuSection>
        {loginUser ? loginTrue() : loginFalse()}
      </HeaderContainer>
    </div>
  );
}

export default Header;
