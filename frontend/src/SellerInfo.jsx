import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import SmallMedium from "./components/text/SmallMedium";
import UpDownContainer from "./components/layout/UpDownContainer";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import axios from "./util/axiosInstance";

function SellerInfo() {
  const seller = useSelector((state) => state.login.user);
  function fetchSellerInfo() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/info/${seller.id}`)
      .then((res) => {
        console.log(res.data);
      });
  }

  useEffect(() => {
    fetchSellerInfo();
  }, []);

  return (
    <div>
      <Header />
      <UpDownContainer>
        <LeftRightContainer>
          <GapW width="160px" />
          <SellerSide />
          <GapW width="99px" />
          <ColContainer>
            <GapH height="89px" />
            <RowContainer justify="start" height="121px" background="#F0F5FA">
              <GapW width="30px" />
              <BoldLarge>가게 정보</BoldLarge>
            </RowContainer>
            <GapH height="139px" />
            <ColContainer>
              <GapW width="69px" />
              <LeftRightContainer>
                <ColContainer align="start">
                  <BoldSmallMedium>상호명</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>대표자</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>사업자 등록번호</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>사업자 소재지</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>고객센터</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>전화번호</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>이메일</BoldSmallMedium>
                  <GapH height="70px" />
                  <BoldSmallMedium>가게 대표 이미지</BoldSmallMedium>
                </ColContainer>
                <GapW width="200px" />
                <ColContainer align="start">
                  <SmallMedium>{seller.businessName}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>{seller.name}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>{seller.businessNumber}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>{seller.businessLocation}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>{seller.businessNumber}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>{seller.phoneNumber}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>{seller.email}</SmallMedium>
                  <GapH height="70px" />
                  <SmallMedium>가게 대표 이미지</SmallMedium>
                </ColContainer>
              </LeftRightContainer>
            </ColContainer>
          </ColContainer>
        </LeftRightContainer>
      </UpDownContainer>
    </div>
  );
}

export default SellerInfo;
