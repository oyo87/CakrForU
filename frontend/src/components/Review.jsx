import React from "react";
import ColContainer from "./layout/ColContainer";
import RowContainer from "./layout/RowContainer";

import StarOn from "../assets/img/StarOn.png";
import SampleImg from "../assets/img/login_image.png";
import Small from "./text/Small";
import BoldSmallMedium from "./text/BoldSmallMedium";
import MediumSmall from "./text/MediumSmall";
import GapH from "./layout/GapH";
import GapW from "./layout/GapW";

function Review() {
  return (
    <ColContainer width="1194px" align="start">
      <RowContainer>
        <ColContainer width="400px" align="start">
          <BoldSmallMedium>리뷰제목</BoldSmallMedium>
          <GapH />
          <Small color="#999999">작성일</Small>
        </ColContainer>
        <RowContainer justify="end">
          <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
          <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
          <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
          <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
          <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
        </RowContainer>
      </RowContainer>
      <GapH height="10px" />
      <RowContainer justify="start">
        <img src={SampleImg} alt="sample" width="144px" height="144px" />
        <GapW width="100px" />
        <ColContainer
          align="start"
          style={{
            alignContent: "space-between",
            justifyContent: "space-between",
          }}
        >
          <MediumSmall>
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세
            무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세 남산위에 저
            소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세 무궁화 삼천리
            화려강산 대한사람 대한으로 길이 보전하세 가을하늘 공활한데 높고
            구름없이 밝은 달은 우리 가슴 일편 단심일세 무궁화 삼천리 화려강산
            대한사람 대한으로 길이 보전하세 이 기상과 이 맘으로 충성을 다하여
            괴로우나 즐거우나 나라 사랑하세 무궁화 삼...
          </MediumSmall>
          <ColContainer align="start" justify="end">
            <Small color="#999999">구매 가게 : </Small>
            <Small color="#999999">케이크 상세 내용 : </Small>
          </ColContainer>
        </ColContainer>
      </RowContainer>
    </ColContainer>
  );
}

export default Review;
