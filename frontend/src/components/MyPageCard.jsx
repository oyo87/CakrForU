import React from "react";
import { useDispatch } from "react-redux";
import ColContainer from "./layout/ColContainer";
import Tmp from "../assets/img/login_image.png";
import GapH from "./layout/GapH";
import Small from "./text/Small";
import BoldMedium from "./text/BoldMedium";
import EmptyHeart from "../assets/img/empty_heart.png";
import { openPortfolio } from "../store/modalSlice";
import Button1 from "./button/Button1";

function MyPageCard({
  sellerId,
  createdAt,
  pickUpDate,
  sheetShape,
  sheetTaste,
  creamTaste,
  sheetSize,
}) {
  const desc = [" ", sheetShape, sheetTaste, creamTaste, sheetSize].join(" #");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openPortfolio());
  };

  return (
    <ColContainer
      width="370px"
      height="480px"
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
        <Small color="#A5A6A6" cursor="pointer">
          <GapH height="10px" />
          {desc}
          <GapH />
        </Small>
        <GapH height="20px" />
        <Button1>상세보기</Button1>
      </ColContainer>
      <GapH height="20px" />
    </ColContainer>
  );
}

export default MyPageCard;
