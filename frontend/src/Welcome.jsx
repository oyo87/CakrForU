import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import Header from "./components/Header";
import WelcomeImg from "./assets/img/welcome.png";
import BoldMedium from "./components/text/BoldMedium";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import BoldLarge from "./components/text/BoldLarge";
import SmallMedium from "./components/text/SmallMedium";
import TextContainer from "./components/TextContainer";
import WelcomeCard from "./components/WelcomeCard";
import WelcomMain from "./assets/img/welcome_main.png";
import Welcome3d from "./assets/img/welcome_3d.png";
import Welcome2d from "./assets/img/welcome_2d.png";
import LeftButton from "./assets/img/left_button.png";
import RightButton from "./assets/img/right_button.png";

const ContentContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;
const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 55%;
`;

const Button = styled.button`
  position: absolute;
  z-index: 2;
  ${(props) => (props.left ? "left: -45px;" : "right: -45px;")}
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;
function TypingText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const message = "당신의 소중한 하루를 완성해 줄 특별한 케이크";

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setText(message.substring(0, index));
  }, [index]);

  return (
    <RowContainer height="22%" align="end" id="my-element">
      <BoldMedium>{text}</BoldMedium>
    </RowContainer>
  );
}
function Welcome() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      title: "3D 모델링",
      content: `더 실감나게, 더 완성도 있게`,
      url: Welcome3d,
      width: "197px",
      background: "#25231F",
      titleTop: "17.21%",
      contentTop: "30.84%",
      imgTop: "39.55%",
      color: "white",
      rightContent: `어떤 케이크를 만들어야 할 지 고민되는
당신을 위한 3D 모델링 케이크가 준비되어 있어요

인기 디자인의 3D 모델을 참고해 케이크 디자인의
영감을 떠올리고 설정한대로 원하는 맛의 케이크를 주문까지

새로운 커스텀 케이크의 세계로 당신을 초대합니다`,
    },
    {
      title: "메인페이지",
      content: `기념일을 위한 케이크를
추천해드려요`,
      url: WelcomMain,
      width: "152px",
      background: "#F6F1EE",
      titleTop: "17.21%",
      contentTop: "34.74%",
      imgTop: "46.02%",
      rightContent: `기념일을 위해 어떤 케이크를 해야 할지 고민될 때
추천 서비스를 이용할 수 있어요

인기 케이크, 인기 가게를 확인하고 케이크를
간편하게 주문할 수 있어요

CAKE FOR U의 메인페이지로 이동합니다.`,
      link: "/main",
    },
    {
      title: "케이크 DIY",
      content: `케이크 디자인을 해볼까요?`,
      url: Welcome2d,
      width: "152px",
      background: "#FBFBFB",
      titleTop: "15.58%",
      contentTop: "79.22%",
      imgTop: "27.36%",
      rightContent: `
남다른 디자인으로 소중한 하루를 만들고 싶은 당신을 위해

간편한 스티커 게임으로 케이크를 만들고
설정 그대로 주문까지 할 수 있어요

2D 모델링 페이지로 이동합니다.`,
      link: "/dragSize",
    },
  ];

  const handleButtonClick = (direction) => {
    setActiveCard((prevIndex) =>
      direction === "left"
        ? (prevIndex - 1 + cards.length) % cards.length
        : (prevIndex + 1) % cards.length
    );
  };

  const getTransformStyle = (index, activeCardIndex) => {
    if (index === activeCardIndex) {
      return "translateX(0)";
    }
    if (index === (activeCardIndex + 1) % cards.length) {
      return "translateX(40%)";
    }
    if (index === (activeCardIndex - 1 + cards.length) % cards.length) {
      return "translateX(-40%)";
    }
    if (index === (activeCardIndex + 2) % cards.length) {
      return "translateX(80%)";
    }
    return "translateX(-80%)";
  };

  const getOpacityStyle = (index, activeCardIndex) => {
    if (index === activeCardIndex) {
      return "1";
    }
    return "0.4";
  };
  const cardRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [cards]);
  return (
    <UpDownContainer>
      <Header />
      <ContentContainer>
        <ImageContainer>
          <StyledImage src={WelcomeImg} alt="welcome" />
        </ImageContainer>
        <MainContainer>
          <TypingText />
          <GapH height="50px" />
          <RowContainer height="39%">
            <ColContainer width="50%" justify="end" direction="auto">
              <CardContainer>
                <Button left onClick={() => handleButtonClick("left")}>
                  <img src={LeftButton} alt="left" />
                </Button>
                {cards.map((card, index) => (
                  <WelcomeCard
                    key={card.url}
                    title={card.title}
                    content={card.content}
                    url={card.url}
                    width={card.width}
                    background={card.background}
                    titleTop={card.titleTop}
                    contentTop={card.contentTop}
                    imgTop={card.imgTop}
                    color={card.color}
                    onClick={() => navigate(card.link)}
                    isActive={index === activeCard}
                    style={{
                      position: "absolute",
                      zIndex: index === activeCard ? 2 : 1,
                      transition: "all 0.5s ease",
                      transform: getTransformStyle(index, activeCard),
                      opacity: getOpacityStyle(index, activeCard),
                    }}
                  />
                ))}
                <Button right onClick={() => handleButtonClick("right")}>
                  <img src={RightButton} alt="right" />
                </Button>
              </CardContainer>
              <GapW width="100px" />
            </ColContainer>
            <ColContainer width="4.7%" />
            <ColContainer
              width="45.3%"
              justify="start"
              align="start"
              direction="column"
            >
              <GapH height="35px" />
              <BoldLarge>{cards[activeCard].title}</BoldLarge>
              <GapH height="20px" />
              <TextContainer ref={cardRef}>
                <SmallMedium>{cards[activeCard].rightContent}</SmallMedium>
              </TextContainer>
            </ColContainer>
          </RowContainer>
        </MainContainer>
      </ContentContainer>
    </UpDownContainer>
  );
}

export default Welcome;
