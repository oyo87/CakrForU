import React from "react";
import ColContainer from "./components/layout/ColContainer";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import Medium from "./components/text/Medium";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import UpDownContainer from "./components/layout/UpDownContainer";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import Select from "./components/Select";

function SellerPortfolioRegist() {
  return (
    <div>
      <Header />
      <UpDownContainer>
        <LeftRightContainer>
          <ColContainer width="276px">
            <SellerSide />
            <GapH height="89px" />
          </ColContainer>
          <ColContainer gap="34px">
            <GapH height="35px" />
            <RowContainer justify="start" height="121px">
              <BoldLarge>라니케이크</BoldLarge>
            </RowContainer>
            <RowContainer justify="start">
              <BoldSmallMedium>포트폴리오 등록</BoldSmallMedium>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>구매자 성별</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Medium>여성</Medium>
                <Medium>남성</Medium>
              </RowContainer>
            </RowContainer>

            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>구매자 상황</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>구매자 연령대</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>호수</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>시트 모양</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>메인 컬러</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>시트맛</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>크림맛</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>이미지 첨부</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>케이크 설명</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer>
            </RowContainer>
          </ColContainer>
        </LeftRightContainer>
      </UpDownContainer>
    </div>
  );
}

export default SellerPortfolioRegist;
