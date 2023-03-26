import React from "react";
import styled from "styled-components";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import Medium from "./components/text/Medium";
import MediumSmall from "./components/text/MediumSmall";

function CTest() {
  const Contain = styled.div`
    width: 521px;
    height: 354px;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `;

  const ItemsContain = styled.div`
    width: 521px;
    height: 521px;
  `;

  const ItemsWrap = styled.div`
    width: 100%;
    height: 100%;
    // border-radius: 20px;
    // overflow: hidden;
    // margin: 0 20px;

    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    // }
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
      content:
        "회원이라면 누구나 판매자에게 직접 커스텀 케이크를 주문할 수 있어요",
    },
    {
      title: "RECOMMEND",
      content: "기념일, 성별, 연령 등 나에게 딱 맞는 케이크를 추천받아요.",
    },
    {
      title: "CUSTOMIZE",
      content:
        "상상만 하던 케이크 디자인을 실현해보고 주문까지 한 번에 할 수 있어요",
    },
  ];

  const items = cards.map((card) => {
    return (
      <ItemsContain>
        <ItemsWrap>
          <Medium>{card.title}</Medium>
          <MediumSmall>{card.content}</MediumSmall>
        </ItemsWrap>
      </ItemsContain>
    );
  });

  return (
    <Contain>
      <AliceCarousel
        mouseTracking
        infinite={1000}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        paddingRight={40}
      />
    </Contain>
  );
}

export default CTest;
