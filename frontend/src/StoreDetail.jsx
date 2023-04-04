import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./util/axiosInstance";
import Header from "./components/Header";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import StoreDetailSidebar from "./components/StoreDetailSidebar";
import BoldLarge from "./components/text/BoldLarge";
import ColContainer from "./components/layout/ColContainer";
import Card from "./components/Card";
import Review from "./components/Review";
import SampleImg from "./assets/img/logo2.png";

function StoreDetail() {
  const { storeId } = useParams();
  const [sellerPortfolios, setSellerPortfolios] = useState([]);
  const [sellerPopularPortfolios, setSellerPopularPortfolios] = useState([]);
  const [sellerReviewList, setSellerReviewList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/portfolio/seller/${storeId}`)
      .then((res) => {
        setSellerPortfolios(res.data.slice(0, 5));
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/popular/${storeId}`)
      .then((res) => {
        setSellerPopularPortfolios(res.data.slice(0, 5));
      });

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/seller/review/${storeId}`
      )
      .then((res) => {
        setSellerReviewList(res.data.slice(0, 2));
      });
  }, []);

  return (
    <div>
      <Header />
      <UpDownContainer>
        <GapH height="150px" />
        <RowContainer justify="start" align="start">
          <GapW width="80px" />
          <StoreDetailSidebar />
          <GapW width="80px" />
          <ColContainer justify="start" width="1200px" align="start" gap="60px">
            <ColContainer gap="30px" align="start">
              <BoldLarge>많이 찜한 케이크</BoldLarge>
              <hr style={{ color: "black", width: "100%" }} />
              <RowContainer justify="space-between" gap="10px">
                {sellerPopularPortfolios.map((portfolio) => (
                  <Card
                    key={portfolio.imageUrl}
                    imgUrl={portfolio.imageUrl}
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
            <ColContainer align="start" gap="30px">
              <BoldLarge>포트폴리오</BoldLarge>
              <hr style={{ color: "black", width: "100%" }} />
              <RowContainer justify="space-between" gap="10px">
                {sellerPortfolios.map((portfolio) => (
                  <Card
                    key={portfolio.imageUrl}
                    imgUrl={portfolio.imageUrl}
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
            <ColContainer align="start" gap="30px">
              <BoldLarge>리뷰</BoldLarge>
              <hr style={{ color: "black", width: "100%" }} />
              <ColContainer justify="space-between">
                {sellerReviewList.map((review) => (
                  <Review
                    businessName={review.businessName}
                    reviewContent={review.reviewContent}
                    reviewCreatedAt={review.reviewCreatedAt}
                    reviewRating={review.reviewRating}
                    sheetSize={review.sheetSize}
                    sheetShape={review.sheetShape}
                    sheetTaste={review.sheetTaste}
                    creamTaste={review.creamTaste}
                    imageUrl={
                      review.imageFileDtoList[0]
                        ? review.imageFileDtoList[0].imageFileUri
                        : SampleImg
                    }
                    imageAlt={
                      review.imageFileDtoList[0]
                        ? review.imageFileDtoList[0].origImageFileName
                        : "sample"
                    }
                  />
                ))}
              </ColContainer>
            </ColContainer>
          </ColContainer>
        </RowContainer>
        <GapH height="100px" />
      </UpDownContainer>
    </div>
  );
}

export default StoreDetail;
