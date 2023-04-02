import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import axios from "./util/axiosInstance";
import { userType } from "./store/loginSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genderDict = { 남성: "M", 여성: "F" };

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedPrefix, setSelectedPrefix] = useState(null);

  const handleGender = (e) => {
    setSelectedGender(e.value);
  };

  const handlePrefix = (e) => {
    setSelectedPrefix(e.value);
  };

  const calculateAge = (birthYearStr, birthMonthStr, birthDayStr) => {
    const birthYear = parseInt(birthYearStr, 10);
    const birthMonth = parseInt(birthMonthStr, 10);
    const birthDay = parseInt(birthDayStr, 10);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    let age = todayYear - birthYear;
    if (
      todayMonth < birthMonth ||
      (todayMonth === birthMonth && todayDay < birthDay)
    ) {
      age -= 1;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const buyerSaveRequestDto = {
      email: e.target[0].value,
      password: e.target[1].value,
      nickname: e.target[2].value,
      gender: genderDict[selectedGender],
      age: calculateAge(
        e.target[4].value,
        e.target[5].value,
        e.target[6].value
      ),
      phoneNumber: `${selectedPrefix}${e.target[8].value}${e.target[9].value}`,
    };
    axios.post("/buyer/signup", buyerSaveRequestDto).then((res) => {
      console.log(res);
      axios
        .post("buyer/login", {
          email: buyerSaveRequestDto.email,
          password: buyerSaveRequestDto.password,
        })
        .then((res2) => {
          if (res2.status === 200) {
            localStorage.setItem("access-token", res2.data);
            dispatch(userType("buyer"));
            navigate("/");
          }
        });
    });
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
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
              <Input
                width="539px"
                height="55px"
                borderRadius="10px"
                type="password"
              />
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
                <Select
                  width="183px"
                  height="55px"
                  options={["여성", "남성"]}
                  onChange={handleGender}
                />
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
                  onChange={handlePrefix}
                />
                <GapW width="11px" />
                <Input width="161px" height="55px" borderRadius="10px" />
                <GapW width="11px" />
                <Input width="161px" height="55px" borderRadius="10px" />
              </HorizonBox>
              <GapH height="35px" />
              <HorizonBox justify="end" gap="6px">
                <Button1
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  메인으로
                </Button1>
                <Button1 type="submit">회원가입</Button1>
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
      </form>
    </div>
  );
}

export default SignUpBuyer;
