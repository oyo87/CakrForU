import React from "react";
import styled from "styled-components";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import Medium from "./text/Medium";
import MediumSmall from "./text/MediumSmall";
import Notebook from "../assets/img/notebook.png";
import RowContainer from "./layout/RowContainer";
import ColContainer from "./layout/ColContainer";
import GapH from "./layout/GapH";

function BuyerCarousel() {
  const Contain = styled.div`
    width: 521px;
    height: 354px;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `;

  const ItemsContain = styled.div`
    width: 521px;
    height: 354px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 1,
    },
  };

  // const handleDragStart = (e) => e.preventDefault();

  const cards = [
    {
      title: "ORDER",
      content: `회원이라면 누구나 판매자에게 직접 커스텀 케이크를 주문할 수
있어요`,
      gap: "5px",
    },
    {
      title: "RECOMMEND",
      content: "기념일, 성별, 연령 등 나에게 딱 맞는 케이크를 추천받아요.",
      gap: "15px",
    },
    {
      title: "CUSTOMIZE",
      content: `상상만 하던 케이크 디자인을 실현해보고 주문까지 한 번에 할 수
있어요`,
      gap: "5px",
    },
  ];

  const items = cards.map((card) => {
    return (
      <ItemsContain>
        <ColContainer width="448px">
          <RowContainer justify="start">
            <Medium>{card.title}</Medium>
          </RowContainer>
          <GapH height="13px" />
          <RowContainer justify="start">
            <MediumSmall>{card.content}</MediumSmall>
          </RowContainer>
          <GapH height={card.gap} />
          <RowContainer>
            <img
              src={Notebook}
              alt="notebook"
              style={{
                width: "317px",
              }}
            />
          </RowContainer>
        </ColContainer>
      </ItemsContain>
    );
  });

  return (
    <Contain>
      <AliceCarousel
        mouseTracking
        infinite
        animationDuration={1000}
        autoPlayInterval={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Contain>
  );
}

export default BuyerCarousel;
