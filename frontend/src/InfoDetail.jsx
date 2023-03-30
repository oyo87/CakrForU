/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import UpDownContainer from "./components/layout/UpDownContainer";
import Header from "./components/Header";
import BoldMedium from "./components/text/BoldMedium";
import Small from "./components/text/Small";
import Button4 from "./components/button/Button4";
import Input from "./components/Input";
import BoldSmall from "./components/text/BoldSmall";
import axios from "./util/axiosInstance";

const GrandParent = styled.div`
  height: 90vh;
`;
const Parent = styled.div`
  height: 100%;
`;
const HeaderBox = styled.div`
  height: 30%;
  background-color: #8c8279;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20%;
  padding: 3%;
  flex-direction: column;
`;
const Box = styled.div`
  height: 55%;
  border: #b8b8b8 solid 1px;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  top: 20px;
  margin: 10px 20% 0;
  padding: 3%;
  align-items: center;
`;
const FooterBox = styled.div`
  height: 15%;
  background: #8c8279;
  display: flex;
  position: relative;
  margin: 10px 20% 0;
`;
const Text = styled.div`
  margin-top: 10px;
  margin-left: auto;
`;
const Title = styled.div`
  margin-right: 20px;
`;
const Item1 = styled.div`
  width: 20%;
  height: auto;
`;
const Item2 = styled.div`
  width: 40%;
  height: auto;
`;
const Item3 = styled.div`
  width: 60%;
  height: auto;
`;
const Item4 = styled.div`
  width: 100%;
  height: auto;
  text-align: right;
`;
function Headbox() {
  const textRef = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();

  const show2 = () => {
    const ani2 = gsap.fromTo(
      text3Ref.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 6,
        ease: "strong.inOut",
      }
    );
    return () => {
      ani2.kill();
    };
  };
  const show = () => {
    const ani2 = gsap.fromTo(
      text2Ref.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: "strong.inOut",
      }
    );
    return () => {
      ani2.kill();
    };
  };
  const remove = () => {
    const ani = gsap.from(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 2,
      ease: "strong.inOut",
    });
    return () => {
      ani.kill();
      // show();
    };
  };

  useEffect(() => {
    setTimeout(() => remove(), 0);
    setTimeout(() => show(), 500);
    setTimeout(() => show2(), 1000);
  }, []);

  return (
    <HeaderBox>
      <Text>
        <BoldMedium color="white" ref={textRef}>
          회원정보
        </BoldMedium>
      </Text>
      <Text
        ref={text2Ref}
        style={{
          opacity: 0,
        }}
      >
        <Small color="white">
          현재 비밀번호, 새로운 비밀번호, 새로운 비밀번호 확인 작성 후 비밀번호
          변경 버튼을 누르면 적용됩니다
        </Small>
      </Text>
      <Text
        ref={text3Ref}
        style={{
          opacity: 0,
        }}
      >
        <Small color="rgb(198 178 160)">
          * 네이버 로그인 회원은 비밀번호 변경이 제한됩니다
        </Small>
      </Text>
    </HeaderBox>
  );
}
function CheckNaverAndChangePassword() {
  const onPasswordBtnClick = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/buyer/pw`, {
        // eslint-disable-next-line no-use-before-define
        email: passwordFormData.email,
        // eslint-disable-next-line no-use-before-define
        prePassword: passwordFormData.prePassword,
        // eslint-disable-next-line no-use-before-define
        newPassword: passwordFormData.newPassword,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [passwordFormData, setPasswordFormData] = useState({
    email: userInfo.email,
    prePassword: "",
    newPassword: "",
  });
  const [checkPassword, setCheckPassword] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const setCheckPw = (e) => {
    const { value } = e.target;
    setCheckPassword(value);
  };
  function CheckChange() {
    if (checkPassword) {
      if (passwordFormData.newPassword === checkPassword) {
        return (
          <Item4>
            <Small color="blue">비밀번호가 일치합니다</Small>
          </Item4>
        );
      }
      return (
        <Item4>
          <Small color="red">비밀번호가 일치하지 않습니다</Small>
        </Item4>
      );
    }
  }
  if (userInfo.providerType !== "NAVER") {
    return (
      <>
        <Item1>
          <BoldSmall>비밀번호 변경</BoldSmall>
        </Item1>
        <Item1>
          <Small>현재 비밀번호</Small>
        </Item1>
        <Item3>
          <Input
            placeholder="현재 비밀번호를 입력해주세요"
            height="44px"
            width="100%"
            name="prePassword"
            onChange={handleChange}
          />
        </Item3>
        <Item1 />
        <Item1>
          <Small>새로운 비밀번호</Small>
        </Item1>
        <Item3>
          <Input
            placeholder="새로운 비밀번호를 입력해주세요"
            height="44px"
            width="100%"
            name="newPassword"
            onChange={handleChange}
          />
        </Item3>
        <Item1 />
        <Item1>
          <Small>새로운 비밀번호</Small>
        </Item1>
        <Item2>
          <Input
            placeholder="새로운 비밀번호를 입력해주세요"
            height="44px"
            width="100%"
            name="checkPassword"
            onChange={setCheckPw}
            value={checkPassword}
          />
        </Item2>
        <Item1>
          <Button4
            onClick={onPasswordBtnClick}
            height="44px"
            style={{ float: "right" }}
          >
            비밀번호 변경
          </Button4>
        </Item1>
        <CheckChange />
      </>
    );
  }
}
function InfoDetail() {
  function Titles(props) {
    return (
      <Item2>
        <Title>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          <BoldSmall>{props.title}</BoldSmall>
        </Title>
      </Item2>
    );
  }
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const profile = ["이메일", "닉네임", "성별", "핸드폰 번호"];
  const profileJson = [
    userInfo.email,
    userInfo.nickname,
    userInfo.gender,
    userInfo.phoneNumber,
  ];
  const array = [];
  array.push({ profile, profileJson });
  array.push({ profile, profileJson });
  array.push({ profile, profileJson });
  array.push({ profile, profileJson });
  return (
    <UpDownContainer>
      <Header />
      <GrandParent>
        <Parent>
          <Headbox />
          <Box>
            {/* eslint-disable-next-line react/jsx-no-useless-fragment,no-shadow */}
            {array.map(({ profile, profileJson }, index) => (
              <>
                <Titles title={profile[index]} />
                <Item3>
                  <Small>{profileJson[index]}</Small>
                </Item3>
              </>
            ))}
            <CheckNaverAndChangePassword />
          </Box>
          <FooterBox />
        </Parent>
      </GrandParent>
    </UpDownContainer>
  );
}
export default InfoDetail;
