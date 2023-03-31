import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColContainer from "./layout/ColContainer";
import GapH from "./layout/GapH";
import SmallMedium from "./text/SmallMedium";

function SellerSide() {
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();

  const navigateToInfo = () => {
    navigate("/seller/info");
  };

  const navigateToOrder = () => {
    navigate("/seller/order");
  };

  const navigateToCustom = () => {
    navigate("/seller/custom");
  };

  const handleHover = (buttonId) => {
    setIsHovered(buttonId);
  };

  const handleLeave = () => {
    setIsHovered(null);
  };

  return (
    <ColContainer align="start">
      <GapH height="85px" />
      <button
        type="button"
        style={{ border: "none", backgroundColor: "white" }}
        onMouseEnter={() => handleHover(1)}
        onMouseLeave={handleLeave}
        onClick={navigateToInfo}
      >
        <SmallMedium
          style={{
            color: isHovered === 1 ? "#FFACAC" : "black",
            border: "none",
            backgroundColor: "white",
            fontWeight: isHovered === 1 ? "bold" : "normal",
          }}
        >
          가게 정보
        </SmallMedium>
      </button>
      <GapH height="30px" />
      <button
        type="button"
        style={{ border: "none", backgroundColor: "white" }}
        onMouseEnter={() => handleHover(2)}
        onMouseLeave={handleLeave}
        onClick={navigateToOrder}
      >
        <SmallMedium
          style={{
            color: isHovered === 2 ? "#FFACAC" : "black",
            border: "none",
            backgroundColor: "white",
            fontWeight: isHovered === 2 ? "bold" : "normal",
          }}
        >
          주문 관리
        </SmallMedium>
      </button>
      <GapH height="30px" />
      <button
        type="button"
        style={{ border: "none", backgroundColor: "white" }}
        onMouseEnter={() => handleHover(3)}
        onMouseLeave={handleLeave}
      >
        <SmallMedium
          style={{
            color: isHovered === 3 ? "#FFACAC" : "black",
            border: "none",
            backgroundColor: "white",
            fontWeight: isHovered === 3 ? "bold" : "normal",
          }}
        >
          포트폴리오
        </SmallMedium>
      </button>
      <GapH height="30px" />
      <button
        type="button"
        style={{ border: "none", backgroundColor: "white" }}
        onMouseEnter={() => handleHover(4)}
        onMouseLeave={handleLeave}
        onClick={navigateToCustom}
      >
        <SmallMedium
          style={{
            color: isHovered === 4 ? "#FFACAC" : "black",
            border: "none",
            backgroundColor: "white",
            fontWeight: isHovered === 4 ? "bold" : "normal",
          }}
        >
          주문서 커스텀
        </SmallMedium>
      </button>
    </ColContainer>
  );
}

export default SellerSide;
