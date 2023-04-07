import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { closePortfolio } from "./store/modalSlice";
import PortfolioModal from "./components/PortfolioModal";

function StoreDetail() {
  const modal = useSelector((state) => state.modal);
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const [sellerPortfolios, setSellerPortfolios] = useState([]);
  const [sellerPopularPortfolios, setSellerPopularPortfolios] = useState([]);
  const [sellerReviewList, setSellerReviewList] = useState([]);

  const handleClickOutModal = () => {
    if (modal.portfolioOpen) {
      dispatch(closePortfolio());
    }
  };

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
      <Header handleClickOutModal={handleClickOutModal} />
      {modal.portfolioOpen ? <PortfolioModal /> : null}
      <UpDownContainer onClick={handleClickOutModal}>
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
                {sellerPopularPortfolios.map((item) => (
                  <Card
                    buyerId={loginUser ? loginUser.id : null}
                    portfolioId={item.id}
                    title={item.detail}
                    shape={item.shape}
                    sheetTaste={item.sheetTaste}
                    creamTaste={item.creamTaste}
                    situation={item.situation}
                    businessName={item.businessName}
                    size={item.size}
                    detail={item.detail}
                    imgUrl={item.imageUrl}
                    color={item.color}
                    createdAt={item.createdAt}
                    hit={item.hit}
                  />
                ))}
              </RowContainer>
            </ColContainer>
            <ColContainer align="start" gap="30px">
              <BoldLarge>포트폴리오</BoldLarge>
              <hr style={{ color: "black", width: "100%" }} />
              <RowContainer justify="space-between" gap="10px">
                {sellerPortfolios.map((item) => (
                  <Card
                    buyerId={loginUser ? loginUser.id : null}
                    portfolioId={item.id}
                    title={item.detail}
                    shape={item.shape}
                    sheetTaste={item.sheetTaste}
                    creamTaste={item.creamTaste}
                    situation={item.situation}
                    businessName={item.businessName}
                    size={item.size}
                    detail={item.detail}
                    imgUrl={item.imageUrl}
                    color={item.color}
                    createdAt={item.createdAt}
                    hit={item.hit}
                  />
                ))}
              </RowContainer>
            </ColContainer>
            <ColContainer align="start" gap="30px">
              <BoldLarge>리뷰</BoldLarge>
              <hr style={{ color: "black", width: "100%" }} />
              <ColContainer justify="space-between">
                {sellerReviewList[0] ? (
                  sellerReviewList.map((review) => (
                    <>
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
                      <GapH height="20px" />
                    </>
                  ))
                ) : (
                  <p>등록된 리뷰가 없습니다.</p>
                )}
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
