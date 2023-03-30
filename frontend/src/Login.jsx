import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "./util/axiosInstance";
import BoldLarge from "./components/text/BoldLarge";
import Button4 from "./components/button/Button4";
import Input from "./components/Input";
import NaverIcon from "./assets/img/naver_icon.png";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import { RadioButton } from "./components/Radio";
import SmallMedium from "./components/text/SmallMedium";
import MediumSmall from "./components/text/MediumSmall";
import Small from "./components/text/Small";
import UpDownContainer from "./components/layout/UpDownContainer";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";

const HorizonBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 64px;
  gap: ${(props) => props.gap || "0px"};
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Login() {
  const [selectedUserType, setSelectedUserType] = useState("buyer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/${selectedUserType}/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access-token", res.data);
        navigate("/");
      });
  };

  return (
    <div>
      <Header />
      <UpDownContainer
        align="center"
        justify="center"
        minHeight="calc(100vh - 60px)"
      >
        <ColContainer width="23.9%">
          <BoldLarge>LOGIN</BoldLarge>
          <GapH height="40px" />
          <HorizonBox gap="10px">
            <SmallMedium fontsize="30px">Email</SmallMedium>
            <div style={{ flexGrow: 1 }} />
            <RadioButton
              name="userType"
              onChange={() => setSelectedUserType("buyer")}
              checked={selectedUserType === "buyer"}
            />
            <Small>구매자</Small>
            <GapW width="5px" />
            <RadioButton
              name="userType"
              onChange={() => setSelectedUserType("seller")}
              checked={selectedUserType === "seller"}
            />
            <Small>판매자</Small>
          </HorizonBox>
          <Input
            width="100%"
            height="64px"
            placeholder="이메일"
            onChange={handleChange}
            name="email"
          />
          <GapH height="15px" />
          <HorizonBox>
            <SmallMedium fontsize="30px">Password</SmallMedium>
          </HorizonBox>
          <Input
            width="100%"
            height="64px"
            type="password"
            placeholder="비밀번호"
            onChange={handleChange}
            name="password"
          />
          <GapH height="40px" />
          <Button4 width="100%" background="#FF9494" onClick={handleSubmit}>
            <SmallMedium color="white">로그인</SmallMedium>
          </Button4>
          {selectedUserType === "buyer" && (
            <div>
              <GapH height="21px" />
            </div>
          )}
          {selectedUserType === "buyer" && (
            <Link
              // to="http://j8a604.p.ssafy.io:8080/oauth2/authorization/naver?redirect_uri=http://j8a604.p.ssafy.io/oauth/redirect"
              to="http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth/redirect"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <Button4 width="100%" background="#06BE34">
                <FlexBox>
                  <img src={NaverIcon} alt="naver" />
                  <SmallMedium color="white">네이버로 로그인하기</SmallMedium>
                </FlexBox>
              </Button4>
            </Link>
          )}
          <GapH height="20px" />
          <HorizonBox
            style={{
              justifyContent: "center",
              gap: "13px",
            }}
          >
            <MediumSmall fontsize="18px" color="#9e9e9e">
              계정이 없으신가요?
            </MediumSmall>
            {selectedUserType === "buyer" && (
              <Link
                to="/signup/buyer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MediumSmall fontsize="18px">구매자 회원가입</MediumSmall>
              </Link>
            )}
            {selectedUserType === "seller" && (
              <Link
                to="/signup/seller"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MediumSmall fontsize="18px">판매자 회원가입</MediumSmall>
              </Link>
            )}
          </HorizonBox>
        </ColContainer>
      </UpDownContainer>
    </div>
  );
}

export default Login;
