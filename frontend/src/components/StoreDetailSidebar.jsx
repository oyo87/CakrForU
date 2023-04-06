import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../util/axiosInstance";
import GapH from "./layout/GapH";
import Button1 from "./button/Button1";
import ColContainer from "./layout/ColContainer";
import BoldLarge from "./text/BoldLarge";
import RowContainer from "./layout/RowContainer";
import MediumSmall from "./text/MediumSmall";
import BoldMedium from "./text/BoldMedium";
import BoldMediumSmall from "./text/BoldMediumSmall";

const SideBar = styled.div`
  width: 440px;
  height: 100vh;
`;

function StoreDetailSidebar() {
  const { storeId } = useParams();
  const [seller, setSeller] = useState([]);
  const [sellerDesc, setSellerDesc] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/info/${storeId}`)
      .then((res) => {
        setSeller(res.data);
      });

    axios.get(`/seller/form/${storeId}`).then((response) => {
      const tmp1 = Object.entries(response.data.sheetShape);
      const filtered1 = tmp1.filter(([, ok]) => ok === true);
      const tmp2 = Object.entries(response.data.sheetSize);
      const filtered2 = tmp2.filter(([, ok]) => ok === true);
      const tmp3 = Object.entries(response.data.sheetTaste);
      const filtered3 = tmp3.filter(([, ok]) => ok === true);
      const tmp4 = Object.entries(response.data.creamTaste);
      const filtered4 = tmp4.filter(([, ok]) => ok === true);

      setSellerDesc(
        `#${String(Object.values(filtered1)[0]).split(",true")[0]} #${
          String(Object.values(filtered4)[0]).split(",true")[0]
        } #${String(Object.values(filtered3)[0]).split(",true")[0]} #${
          String(Object.values(filtered2)[0]).split(",true")[0]
        } `
      );
    });
  }, []);

  return (
    <div>
      <SideBar>
        <ColContainer justify="start" align="center" gap="30px">
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

          <MediumSmall>{seller.businessDescription}</MediumSmall>
          <MediumSmall color="#716F6F">{sellerDesc}</MediumSmall>
          <hr style={{ color: "black", width: "100%" }} />
          <RowContainer style={{ justifyContent: "space-evenly" }}>
            <BoldMediumSmall>주소</BoldMediumSmall>
            <MediumSmall>
              <ColContainer>
                <div style={{ color: "#716F6F" }}>
                  {seller.businessLocation}
                </div>
                <div style={{ color: "#716F6F" }}>
                  {seller.buildingName} {seller.detailedAddress}
                </div>
              </ColContainer>
            </MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "space-evenly" }}>
            <BoldMediumSmall>전화번호</BoldMediumSmall>
            <MediumSmall color="#716F6F">
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
            <MediumSmall style={{ color: "#716F6F" }}>
              {seller.contact}
            </MediumSmall>
          </RowContainer>
          <GapH height="50px" />
          <Link
            to={"/makeOrder/".concat(storeId)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button1 width="200px">
              <BoldMedium color="white">주문하기</BoldMedium>
            </Button1>
          </Link>
          <GapH />
        </ColContainer>
      </SideBar>
    </div>
  );
}

export default StoreDetailSidebar;
