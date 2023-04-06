/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ColContainer from "./layout/ColContainer";
import GapH from "./layout/GapH";
import Small from "./text/Small";
import BoldMediumSmall from "./text/BoldMediumSmall";
import EmptyHeart from "../assets/img/empty_heart.png";
import FilledHeart from "../assets/img/filled_heart.png";
import { setPortfolio, openPortfolio } from "../store/modalSlice";
import Logo2 from "../assets/img/logo2.png";
import axios from "../util/axiosInstance";

function Card({
  buyerId,
  portfolioId,
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
  filled,
  businessName,
  hit,
  createdAt,
}) {
  // RED, PINK, ORANGE, YELLOW, GREEN, BLUE, PURPLE, BLACK, WHITE, PASTEL, PRINTING
  if (color === "RED") color = "빨강";
  else if (color === "PINK") color = "분홍";
  else if (color === "ORANGE") color = "주황";
  else if (color === "YELLOW") color = "노랑";
  else if (color === "GREEN") color = "초록";
  else if (color === "BLUE") color = "파랑";
  else if (color === "PURPLE") color = "보라";
  else if (color === "BLACK") color = "검정";
  else if (color === "WHITE") color = "하얀";
  else if (color === "PASTEL") color = "파스텔";
  else if (color === "PRINTING") color = "프린팅";

  // VANILLA, CHOCOLATE, EARL_GRAY, RED_VELVET, MATCHA,
  // MOCHA, CHEESE, CARROT, SWEET_POTATO;
  if (sheetTaste === "VANILLA") sheetTaste = "바닐라시트";
  else if (sheetTaste === "CHOCOLATE") sheetTaste = "초콜릿시트";
  else if (sheetTaste === "EARL_GRAY") sheetTaste = "얼그레이시트";
  else if (sheetTaste === "RED_VELVET") sheetTaste = "레드벨벳시트";
  else if (sheetTaste === "MATCHA") sheetTaste = "말차시트";
  else if (sheetTaste === "MOCHA") sheetTaste = "모카시트";
  else if (sheetTaste === "CHEESE") sheetTaste = "치즈시트";
  else if (sheetTaste === "CARROT") sheetTaste = "당근시트";
  else if (sheetTaste === "SWEET_POTATO") sheetTaste = "고구마시트";

  // CIRCLE, HEART, RECTANGLE, OTHERS;
  if (shape === "CIRCLE") shape = "원형";
  else if (shape === "HEART") shape = "하트";
  else if (shape === "RECTANGLE") shape = "사각";
  else if (shape === "OTHERS") shape = "기타";

  // CREAM_CHEESE, WHIPPING_CREAM, CHOCOLATE_CREAM, OREO_CREAM, MATCHA_CREAM,
  // BLACK_SESAME_CREAM, SWEET_POTATO_CREAM, EARL_GRAY_CREAM, STRAWBERRY_CREAM;
  if (creamTaste === "CREAM_CHEESE") creamTaste = "크림치즈크림";
  else if (creamTaste === "WHIPPING_CREAM") creamTaste = "생크림";
  else if (creamTaste === "CHOCOLATE_CREAM") creamTaste = "초콜릿크림";
  else if (creamTaste === "OREO_CREAM") creamTaste = "오레오크림";
  else if (creamTaste === "MATCHA_CREAM") creamTaste = "말차크림";
  else if (creamTaste === "BLACK_SESAME_CREAM") creamTaste = "흑임자크림";
  else if (creamTaste === "SWEET_POTATO_CREAM") creamTaste = "고구마크림";
  else if (creamTaste === "EARL_GRAY_CREAM") creamTaste = "얼그레이크림";
  else if (creamTaste === "STRAWBERRY_CREAM") creamTaste = "딸기크림";

  // IDOL, COMPANY, SIXTIETH, BIRTHDAY, ANNIVERSARY, MARRIAGE, DISCHARGE, CHRISTMAS, ETC
  if (situation === "IDOL") situation = "아이돌";
  else if (situation === "COMPANY") situation = "입/퇴사";
  else if (situation === "SIXTIETH") situation = "환갑";
  else if (situation === "BIRTHDAY") situation = "생일";
  else if (situation === "ANNIVERSARY") situation = "기념일";
  else if (situation === "MARRIAGE") situation = "결혼케이크";
  else if (situation === "DISCHARGE") situation = "전역";
  else if (situation === "CHRISTMAS") situation = "크리스마스";
  else if (situation === "ETC") situation = "기타";

  const desc = "#".concat(
    [color, shape, sheetTaste, creamTaste, situation].join(" #")
  );
  const dispatch = useDispatch();
  const [isFilled, setIsFilled] = useState(filled);

  const addWishlist = (e) => {
    e.stopPropagation();
    setIsFilled(true);
    // if (!buyerId) return;
    console.log(buyerId);
    console.log(portfolioId);
    axios
      .post("/wish/", {
        buyer_id: buyerId,
        portfolio_id: portfolioId,
      })
      .then((res) => {
        console.log(res);
        console.log("end");
      });
  };

  const handleClick = () => {
    dispatch(openPortfolio());
    dispatch(
      setPortfolio({
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
        businessName,
        hit,
        createdAt,
      })
    );
  };
  const loginUser = localStorage.getItem("user");
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
          src={imgUrl ? imgUrl[0] : Logo2}
          alt="img"
          style={{
            width: "222px",
            height: "217px",
            objectFit: "cover",
          }}
        />
        {isFilled && loginUser && (
          <img
            src={FilledHeart}
            alt="img"
            style={{
              position: "absolute",
              width: "20px",
              top: "10px",
              right: "10px",
              zIndex: "1",
            }}
          />
        )}
        {!isFilled && loginUser && (
          <img
            src={EmptyHeart}
            onClick={addWishlist}
            alt="img"
            style={{
              position: "absolute",
              width: "20px",
              top: "10px",
              right: "10px",
              zIndex: "1",
            }}
          />
        )}
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
          {businessName}
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
