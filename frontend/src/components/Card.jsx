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
  const desc = "#".concat(
    [color, shape, sheetTaste, creamTaste, situation].join(" #")
  );
  const dispatch = useDispatch();
  const [isFilled, setIsFilled] = useState(filled);

  const addWishlist = (e) => {
    e.stopPropagation();
    setIsFilled(true);
    // if (!buyerId) return;
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
        {isFilled && (
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
        {!isFilled && (
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
