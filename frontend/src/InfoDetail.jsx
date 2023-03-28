import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import UpDownContainer from "./components/UpDownContainer";
import Header from "./components/Header";
import BoldMedium from "./components/text/BoldMedium";
import Small from "./components/text/Small";

function InfoDetail() {
  const GrandParent = styled.div`
    height: 100vh;
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
    border: black;
    background: black;
    color: white;
    display: flex;
    top: 20px;
    margin: 10px 20% 0;
  `;
  const FooterBox = styled.div`
    height: 15%;
    border: black;
    background: black;
    color: white;
    display: flex;
    position: relative;
    margin: 10px 20% 0;
  `;
  const Text = styled.div`
    margin-top: 10px;
    margin-left: auto;
  `;
  const textRef = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();
  const [active, setActive] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const timeout = setTimeout(() => remove(), 0);
    return () => clearTimeout(timeout);
  }, [textRef]);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const timeout = setTimeout(() => show(), 400);
    return () => clearTimeout(timeout);
  }, [active]);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const timeout = setTimeout(() => show2(), 800);
    return () => clearTimeout(timeout);
  }, [active]);
  const remove = () => {
    const ani = gsap.from(textRef.current, {
      y: 100,
      opacity: 0,
      display: "none",
      duration: 2,
      ease: "strong.inOut",
      onComplete: () => setActive(false),
    });
    return () => {
      ani.kill();
    };
  };
  const show = () => {
    const ani2 = gsap.from(text2Ref.current, {
      y: 100,
      opacity: 0,
      display: "none",
      duration: 3,
      ease: "strong.inOut",
    });
    return () => {
      ani2.kill();
    };
  };
  const show2 = () => {
    const ani2 = gsap.from(text3Ref.current, {
      y: 100,
      opacity: 0,
      display: "none",
      duration: 5,
      ease: "strong.inOut",
    });
    return () => {
      ani2.kill();
    };
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  function Textcomponent() {
    return (
      <>
        <Text ref={text2Ref}>
          <Small color="white">
            비밀번호 변경 시 현재 비밀번호, 새로운 비밀번호, 새로운 비밀번호
            확인 작성 후 비밀번호 변경 버튼을 누르면 적용됩니다
          </Small>
        </Text>
        <Text ref={text3Ref}>
          <Small color="white">
            닉네임/전화번호 변경 시 변경 내용 입력 후 변경사항 저장을 누르면
            적용됩니다
          </Small>
        </Text>
      </>
    );
  }
  return (
    <UpDownContainer>
      <Header />
      <GrandParent>
        <Parent>
          <HeaderBox>
            <Text>
              <BoldMedium color="white" ref={textRef}>
                회원정보
              </BoldMedium>
            </Text>
            {!active && Textcomponent()}
          </HeaderBox>
          <Box />
          <FooterBox>dd</FooterBox>
        </Parent>
      </GrandParent>
    </UpDownContainer>
  );
}
export default InfoDetail;
