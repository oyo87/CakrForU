import React from "react";
import styled from "styled-components";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import Welcome3d from "./assets/img/welcome_3d.png";
import Welcome2d from "./assets/img/welcome_2d.png";
import WelcomeMain from "./assets/img/welcome_main.png";
import Blue from "./assets/img/blue.png";
import Pink from "./assets/img/pink.png";
import Candle from "./assets/img/candle.png";

function CTest() {
  const Contain = styled.div`
    width: 1000px;
    height: 1000px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  `;

  const ItemsContain = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 10px;
  `;

  const ItemsWrap = styled.div`
    width: 100%;
    height: 380px;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 1,
    },
  };

  const handleDragStart = (e) => e.preventDefault();

  const images = [Welcome3d, Welcome2d, WelcomeMain, Blue, Pink, Candle];

  const items = images.map((image) => {
    return (
      <ItemsContain>
        <ItemsWrap>
          <img src={image} alt="" onDragStart={handleDragStart} />
          <h1>hihi</h1>
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
