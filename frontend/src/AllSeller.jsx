import React, { useState, useEffect } from "react";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import GapH from "./components/layout/GapH";
import SmallMedium from "./components/text/SmallMedium";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import PinkSearch from "./assets/img/pink_search.png";
import axios from "./util/axiosInstance";
import StoreCard from "./components/StoreCard";
import Header from "./components/Header";

function AllSeller() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get(`/seller/search/all`)
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.log("error = ", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <UpDownContainer align="center">
        <GapH height="34px" />
        <RowContainer
          height="61px"
          width="451px"
          border="1px solid"
          borderRadius="30px"
          borderColor="#E3E3E3"
          position="relative"
        >
          <SmallMedium>내 지역 선택</SmallMedium>
          <img
            src={PinkSearch}
            alt="img"
            style={{
              width: "50px",
              position: "absolute",
              right: "26px",
            }}
          />
        </RowContainer>
        <GapH height="24px" />
        <RowContainer width="1194px" justify="start">
          <BoldSmallMedium>모든 가게</BoldSmallMedium>
        </RowContainer>
        <GapH height="24px" />
        <RowContainer width="1194px" gap="21px">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridGap: "21px",
            }}
          >
            {sellers.map((item) => {
              return (
                <StoreCard
                  title={item.businessDescription}
                  situation={item.situation}
                  sellerId={item.id}
                  imgUrl={item.imageUrls}
                  businessLocation={item.businessLocation}
                />
              );
            })}
          </div>
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default AllSeller;
