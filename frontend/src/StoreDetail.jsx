import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import gsap from "gsap";
import { useParams } from "react-router-dom";
import axios from "./util/axiosInstance";
import Header from "./components/Header";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
// import ColContainer from "./components/layout/ColContainer";
// import MyPageCard from "./components/MyPageCard";
// import MyPageTitle from "./components/MyPageTitle";
import GapW from "./components/layout/GapW";
// import GapH from "./components/layout/GapH";
// import MediumSmall from "./components/text/MediumSmall";
// import Small from "./components/text/Small";
// import BoldLarge from "./components/text/BoldLarge";
// import Button2 from "./components/button/Button2";
// import Review from "./components/Review";
// import Card from "./components/Card";
// import NextPageImg from "./assets/img/Nextpage.png";
import StoreDetailSidebar from "./components/StoreDetailSidebar";
// import Large from "./components/text/Large";
import BoldLarge from "./components/text/BoldLarge";
import ColContainer from "./components/layout/ColContainer";
import Card from "./components/Card";

function StoreDetail() {
  const { storeId } = useParams();
  const [sellerPortfolios, setSellerPortfolios] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/portfolio/seller/${storeId}`)
      .then((res) => {
        setSellerPortfolios(res.data.slice(0, 5));
      });
  }, []);

  return (
    <div>
      <Header />
      <UpDownContainer>
        <RowContainer justify="start">
          <GapW width="131px" />
          <StoreDetailSidebar />
          <GapW width="66px" />
          <ColContainer justify="start" width="1200px" align="start">
            <BoldLarge>많이 찜한 케이크</BoldLarge>
            <hr />
            <BoldLarge>포트폴리오</BoldLarge>
            <RowContainer justify="space-between">
              {sellerPortfolios.map((portfolio) => (
                <Card
                  key={portfolio.imageUrl}
                  imgUrl={portfolio.imageUrl[0]}
                  title={portfolio.detail}
                  shape={portfolio.shape}
                  sheetTaste={portfolio.sheetTaste}
                  creamTaste={portfolio.creamTaste}
                  situation={portfolio.situation}
                  sellerId={portfolio.businessName}
                />
              ))}
            </RowContainer>
          </ColContainer>
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default StoreDetail;
