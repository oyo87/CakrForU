import React from "react";
import { useDispatch } from "react-redux";
import ColContainer from "./layout/ColContainer";
import GapH from "./layout/GapH";
import Small from "./text/Small";
import BoldMedium from "./text/BoldMedium";
import EmptyHeart from "../assets/img/empty_heart.png";
import { openPortfolio } from "../store/modalSlice";
import Button1 from "./button/Button1";
import Logo2 from "../assets/img/logo2.png";

function MyPageCard({
  sellerId,
  createdAt,
  pickUpDate,
  sheetShape,
  sheetTaste,
  creamTaste,
  sheetSize,
  imageUrl,
  imageAlt,
}) {
  const desc = [" ", sheetShape, sheetTaste, creamTaste, sheetSize].join(" #");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openPortfolio());
  };

  return (
    <ColContainer
      width="450px"
      height="750px"
      border="1px solid"
      borderColor="#D9D9D9"
      borderTop="1px solid"
      borderTopColor="#D9D9D9"
      onClick={handleClick}
      cursor="pointer"
      align="center"
      justify="space-evenly"
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <GapH height="20px" />
        <img
          src={imageUrl || Logo2}
          alt={imageAlt}
          style={{
            width: "400px",
            height: "400px",
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
        align="center"
        paddingLeft="10px"
        paddingRight="10px"
        justify="center"
      >
        <GapH height="20px" />
        <BoldMedium color="black" cursor="pointer">
          {sellerId}
        </BoldMedium>
        <GapH height="20px" />
        <Small>주문일자 {createdAt}</Small>
        <GapH height="20px" />
        <Small>수정일자 {pickUpDate}</Small>
        <GapH height="20px" />
      </ColContainer>
      <ColContainer
        borderTop="1px solid"
        borderColor="#D9D9D9"
        borderTopColor="#D9D9D9"
        paddingLeft="10px"
        paddingRight="10px"
        justify="center"
      >
        <Small color="#A5A6A6" cursor="pointer">
          {desc}
        </Small>
        <GapH height="30px" />
        <Button1>상세보기</Button1>
      </ColContainer>
    </ColContainer>
  );
}

export default MyPageCard;
