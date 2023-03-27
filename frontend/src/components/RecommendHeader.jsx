import React from "react";
import ColContainer from "./ColContainer";
import RowContainer from "./RowContainer";
import Small from "./text/Small";
import Large from "./text/Large";
import GapH from "./GapH";
import GapW from "./GapW";

function RecommendHeader() {
  return (
    <span>
      <GapH height="40px" />
      <hr />
      <RowContainer justify="start" height="220px">
        <ColContainer>
          <GapW width="432px" justify="start" />
        </ColContainer>
        <ColContainer align="start" height="100%">
          <GapH height="57px" />
          <Small>Cake For U</Small>
          <Large>케이크 추천</Large>
          <GapH height="66px" />
        </ColContainer>
      </RowContainer>
      <hr />
      <GapH height="40px" />
    </span>
  );
}

export default RecommendHeader;
