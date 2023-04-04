import React from "react";
import ColContainer from "./layout/ColContainer";
import RowContainer from "./layout/RowContainer";
import Large from "./text/Large";
import GapH from "./layout/GapH";
import GapW from "./layout/GapW";
import SmallMedium from "./text/SmallMedium";

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
          <SmallMedium>Cake For U</SmallMedium>
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
