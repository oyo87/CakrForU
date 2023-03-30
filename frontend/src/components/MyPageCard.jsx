import React from "react";
import { useDispatch } from "react-redux";
import ColContainer from "./layout/ColContainer";
import Tmp from "../assets/img/login_image.png";
import GapH from "./layout/GapH";
import Small from "./text/Small";
import Medium from "./text/Medium";
// import MediumSmall from "./text/MediumSmall";
import EmptyHeart from "../assets/img/empty_heart.png";
import { openPortfolio } from "../store/modalSlice";

function MyPageCard({
  sellerId,
  createdAt,
  pickUpDate,
  color,
  shape,
  sheetTaste,
  creamTaste,
  situation,
}) {
  const desc = [color, shape, sheetTaste, creamTaste, situation].join(" #");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openPortfolio());
  };

  return (
    <ColContainer
      width="300px"
      height="500px"
      border="1px solid"
      borderColor="#D9D9D9"
      borderTop="1px solid"
      borderTopColor="#D9D9D9"
      onClick={handleClick}
      cursor="pointer"
      align="center"
    >
      <GapH />
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          src={Tmp}
          alt="img"
          style={{
            width: "250px",
            height: "250px",
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
        <GapH height="14px" />
        <Medium color="#A5A6A6" cursor="pointer">
          {sellerId}
        </Medium>
        <Small>{createdAt}</Small>
        <Small>{pickUpDate}</Small>
        <GapH height="1px" />
      </ColContainer>
      <ColContainer
        height="62px"
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
      </ColContainer>
    </ColContainer>
  );
}

export default MyPageCard;
