import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import SmallMedium from "./components/text/SmallMedium";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import axios from "./util/axiosInstance";

function SellerInfo() {
  const seller = useSelector((state) => state.login.user);
  const [images, setImages] = useState([]);
  function fetchSellerInfo() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/info/${seller.id}`)
      .then((res) => {
        console.log(res.data);
      });
  }

  function fetchImages() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/image-file/seller/${seller.id}`
      )
      .then((res) => {
        setImages(res.data);
      });
  }

  useEffect(() => {
    fetchSellerInfo();
    fetchImages();
  }, []);

  return (
    <div>
      <Header />
      <LeftRightContainer>
        <ColContainer width="276px">
          <SellerSide />
          <GapH height="89px" />
        </ColContainer>
        <ColContainer>
          <GapH height="89px" />
          <RowContainer
            justify="start"
            width="1200px"
            height="121px"
            background="#F0F5FA"
          >
            <GapW width="30px" />
            <BoldLarge fontsize="40px">가게 정보</BoldLarge>
          </RowContainer>
          <RowContainer justify="start" align="start">
            <GapW width="71px" />
            <ColContainer
              width="311px"
              height="1214px"
              justify="start"
              align="start"
              gap="58px"
            >
              <GapH height="50px" />
              <BoldSmallMedium>상호명</BoldSmallMedium>
              <BoldSmallMedium>대표자</BoldSmallMedium>
              <BoldSmallMedium>사업자 등록번호</BoldSmallMedium>
              <BoldSmallMedium>사업장 소재지</BoldSmallMedium>
              <BoldSmallMedium>고객센터</BoldSmallMedium>
              <BoldSmallMedium>전화번호</BoldSmallMedium>
              <BoldSmallMedium>이메일</BoldSmallMedium>
              <BoldSmallMedium>가게 대표 이미지</BoldSmallMedium>
            </ColContainer>
            <ColContainer
              width="800px"
              height="1214px"
              justify="start"
              align="start"
              gap="58px"
            >
              <GapH height="50px" />
              <SmallMedium>{seller.businessName}</SmallMedium>
              <SmallMedium>{seller.name}</SmallMedium>
              <SmallMedium>{seller.businessNumber}</SmallMedium>
              <SmallMedium>{seller.businessLocation}</SmallMedium>
              <SmallMedium>{seller.businessNumber}</SmallMedium>
              <SmallMedium>{seller.phoneNumber}</SmallMedium>
              <SmallMedium>{seller.email}</SmallMedium>
              <img
                src={images.at(0)}
                alt="tmp"
                style={{
                  width: "455px",
                  height: "355px",
                  objectFit: "cover",
                }}
              />
            </ColContainer>
          </RowContainer>
        </ColContainer>
      </LeftRightContainer>
    </div>
  );
}

export default SellerInfo;
