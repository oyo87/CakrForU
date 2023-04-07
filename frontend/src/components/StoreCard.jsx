import React from "react";
import { useNavigate } from "react-router-dom";
import ColContainer from "./layout/ColContainer";
import GapH from "./layout/GapH";
import Small from "./text/Small";
import BoldMediumSmall from "./text/BoldMediumSmall";
import Logo2 from "../assets/img/logo2.png";

function StoreCard({ title, imgUrl, sellerId, businessLocation }) {
  const navigate = useNavigate();
  const desc = "#".concat(businessLocation);

  const handleClick = () => {
    navigate(`/store/${sellerId}`);
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
          src={imgUrl[0] ? imgUrl[0] : Logo2}
          alt="img"
          style={{
            width: "222px",
            height: "217px",
            objectFit: "cover",
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

export default StoreCard;
