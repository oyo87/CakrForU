import React from "react";
// import styled from "styled-components";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import GapH from "./components/layout/GapH";
import SmallMedium from "./components/text/SmallMedium";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import Card from "./components/Card";

function Popular() {
  return (
    <UpDownContainer align="center">
      <GapH height="34px" />
      <RowContainer
        height="61px"
        width="451px"
        border="1px solid"
        borderRadius="30px"
        borderColor="#E3E3E3"
      >
        <SmallMedium>내 지역 선택</SmallMedium>
      </RowContainer>
      <GapH height="24px" />
      <RowContainer width="1190px" justify="start">
        <BoldSmallMedium>인기 케이크</BoldSmallMedium>
      </RowContainer>
      <GapH height="24px" />
      <RowContainer>
        <Card />
      </RowContainer>
    </UpDownContainer>
  );
}

export default Popular;
