import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../util/axiosInstance";
import GapH from "./layout/GapH";
import Button1 from "./button/Button1";
import ColContainer from "./layout/ColContainer";
import BoldLarge from "./text/BoldLarge";
import Medium from "./text/Medium";
import RowContainer from "./layout/RowContainer";
// import BoldMedium from "./text/BoldMedium";
import MediumSmall from "./text/MediumSmall";
import BoldMedium from "./text/BoldMedium";
import BoldMediumSmall from "./text/BoldMediumSmall";

const SideBar = styled.div`
  width: 440px;
  height: 100vh;
  top: 100;
  left: 0;
  z-index: 1;
`;

function StoreDetailSidebar() {
  const { storeId } = useParams();
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/info/${storeId}`)
      .then((res) => {
        console.log(res);
        setSeller(res.data);
      });
  }, []);

  return (
    <div>
      <SideBar>
        <ColContainer justify="start" align="center">
          <GapH height="150px" />
          {seller.imageUrls ? (
            <img
              src={seller.imageUrls[0]}
              alt={seller.businessName}
              width="300px"
              height="250px"
            />
          ) : null}
          <GapH height="37px" />
          <BoldLarge>{seller.businessName}</BoldLarge>
          <GapH height="46px" />
          <RowContainer gap="20px">
            <BoldMediumSmall>리뷰수</BoldMediumSmall>
            <MediumSmall>test</MediumSmall>
            <BoldMediumSmall>별점수</BoldMediumSmall>
            <MediumSmall>test</MediumSmall>
          </RowContainer>
          <GapH height="39px" />
          <MediumSmall>{seller.businessDescription}</MediumSmall>
          <MediumSmall>#test #test</MediumSmall>
          <hr style={{ color: "black", width: "100%" }} />
          <RowContainer style={{ justifyContent: "space-evenly" }}>
            <BoldMediumSmall>주소</BoldMediumSmall>
            <MediumSmall>
              {seller.businessLocation} {seller.buildingName}{" "}
              {seller.detailedAddress}
            </MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "space-evenly" }}>
            <BoldMediumSmall>전화번호</BoldMediumSmall>
            <MediumSmall>
              {seller.phoneNumber
                ? seller.phoneNumber
                    .slice(0, 3)
                    .concat("-")
                    .concat(seller.phoneNumber.slice(3, 7))
                    .concat("-")
                    .concat(seller.phoneNumber.slice(7))
                : null}
            </MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "space-evenly" }}>
            <BoldMediumSmall>문의계정</BoldMediumSmall>
            <MediumSmall>{seller.contact}</MediumSmall>
          </RowContainer>
          <Button1>
            <BoldMedium>주문하기</BoldMedium>
          </Button1>
          <Medium>포트폴리오</Medium>
          <Medium>리뷰</Medium>
        </ColContainer>
      </SideBar>
    </div>
  );
}

export default StoreDetailSidebar;
