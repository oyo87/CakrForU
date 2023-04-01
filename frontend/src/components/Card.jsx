import React from "react";
import { useDispatch } from "react-redux";
import ColContainer from "./layout/ColContainer";
import GapH from "./layout/GapH";
import Small from "./text/Small";
import BoldMediumSmall from "./text/BoldMediumSmall";
import EmptyHeart from "../assets/img/empty_heart.png";
import { setPortfolio, openPortfolio } from "../store/modalSlice";

function Card({
  title,
  imgUrl,
  sellerId,
  situation,
  size,
  shape,
  color,
  sheetTaste,
  creamTaste,
  detail,
}) {
  const desc = [color, shape, sheetTaste, creamTaste, situation].join(" #");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openPortfolio());
    dispatch(
      setPortfolio({ size, shape, color, sheetTaste, creamTaste, detail })
    );
  };

  return (
    <ColContainer
      width="222px"
      height="393px"
      border="1px solid"
      borderColor="#D9D9D9"
      onClick={handleClick}
      cursor="pointer"
      align="start"
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          src={imgUrl}
          alt="img"
          style={{
            width: "222px",
            height: "217px",
            objectFit: "cover",
          }}
        />
        <img
          src={EmptyHeart}
          alt="img"
          style={{
            position: "absolute",
            width: "20px",
            top: "10px",
            right: "10px",
            zIndex: "1",
          }}
        />
      </div>
      <ColContainer
        height="110px"
        align="start"
        paddingLeft="10px"
        paddingRight="10px"
        justify="start"
      >
        <GapH height="10px" />
        <Small color="#A5A6A6" cursor="pointer">
          {sellerId}
        </Small>
        <GapH height="5px" />
        <BoldMediumSmall cursor="pointer">{title}</BoldMediumSmall>
      </ColContainer>
      <ColContainer
        height="70px"
        borderTop="1px solid"
        borderColor="#D9D9D9"
        borderTopColor="#D9D9D9"
        paddingLeft="10px"
        paddingRight="10px"
        justify="start"
      >
        <GapH height="10px" />
        <Small color="#A5A6A6" cursor="pointer">
          {desc}
        </Small>
        <GapH />
      </ColContainer>
    </ColContainer>
  );
}

export default Card;
