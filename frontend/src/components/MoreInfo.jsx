import styled from "styled-components";
import React from "react";
import BoldMedium from "./text/BoldMedium";
import ArrowImage from "../assets/img/arrow_circle_down.png";

const Box = styled.span`
  display: flex;
  margin-top: 4.68rem;
  cursor: pointer;
`;
const Arrow = styled.img`
  margin-left: 0.5rem;
  position: relative;
  bottom: 3px;
`;
function MoreInfo() {
  return (
    <div>
      <Box>
        <BoldMedium style={{ textAlign: "center" }}>더 보기</BoldMedium>
        <Arrow src={ArrowImage} alt="arrow_circle_down" />
      </Box>
    </div>
  );
}

export default MoreInfo;
