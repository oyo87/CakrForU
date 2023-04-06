import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import gsap from "gsap";
import axios from "./util/axiosInstance";
import Header from "./components/Header";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import ColContainer from "./components/layout/ColContainer";
import MyPageCard from "./components/MyPageCard";
import MyPageTitle from "./components/MyPageTitle";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import MediumSmall from "./components/text/MediumSmall";
import Small from "./components/text/Small";
import BoldLarge from "./components/text/BoldLarge";
import Button2 from "./components/button/Button2";
import Review from "./components/Review";
import Card from "./components/Card";
import NextPageImg from "./assets/img/Nextpage.png";
import { closePortfolio } from "./store/modalSlice";
import PortfolioModal from "./components/PortfolioModal";

function MyPage() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const loginUser = useSelector((state) => state.login.user);
  const [myOrderList, setMyOrderList] = useState([]);
  const [myWishList, setMyWishList] = useState([]);
  const [myReviewList, setMyReviewList] = useState([]);
  const [wishlistButtonColor, setWishlistButtonColor] = useState([]);
  const [wishlistTextColor, setWishlistTextColor] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/buyer/${loginUser.id}`
      )
      .then((res) => {
        setMyOrderList(res.data.slice(0, 2));
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/wish/b/${loginUser.id}`)
      .then((res) => {
        setMyWishList(res.data.wishlist.slice(0, 5));
      });

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/buyer/review/${loginUser.id}`
      )
      .then((res) => {
        setMyReviewList(res.data);
      });

    gsap.fromTo(
      ".Card",
      { x: "-10%", opacity: 0 },
      { x: "0%", duration: 1, opacity: 1 }
    );
  }, []);

  const handleClickOutModal = () => {
    if (modal.portfolioOpen) {
      dispatch(closePortfolio());
    }
  };

  const hoverOnColor = () => {
    setWishlistButtonColor("#FF9494");
    setWishlistTextColor("white");
  };

  const hoverOutColor = () => {
    setWishlistButtonColor("#F6F1EE");
    setWishlistTextColor("black");
  };

  return (
    <div>
      <Header handleClickOutModal={handleClickOutModal} />
      {modal.portfolioOpen ? <PortfolioModal /> : null}
      <UpDownContainer onClick={handleClickOutModal}>
        <MyPageTitle />
        <ColContainer
          height="1000px"
          align="start"
          width="1170px"
          style={{ alignSelf: "center", justifyContent: "space-evenly" }}
        >
          <RowContainer justify="start" align="end">
            <BoldLarge>나의 케이크</BoldLarge>&nbsp;&nbsp;&nbsp;&nbsp;
            <Small color="gray">최근 주문한 내역이 보여집니다</Small>
          </RowContainer>
          <RowContainer
            width="100%"
            style={{ justifyContent: "space-between" }}
          >
            {myOrderList.map((myOrder) => (
              <MyPageCard
                id={myOrder.id}
                sellerId={myOrder.sellerId}
                businessName={myOrder.businessName}
                status={myOrder.status}
                createdAt={myOrder.createdAt.split("T")[0]}
                price={myOrder.price}
                pickUpDate={myOrder.pickUpDate}
                sheetShape={myOrder.sheetShape}
                creamTaste={myOrder.creamTaste}
                sheetTaste={myOrder.sheetTaste}
                sheetSize={myOrder.sheetSize}
                buyerMessage={myOrder.buyerMessage}
                imageFileDtoList={myOrder.imageFileDtoList}
                imageUrl={myOrder.imageFileDtoList[0].imageFileUri}
                imageAlt={myOrder.imageFileDtoList[0].origImageFileName}
              />
            ))}
            <Link
              to="/mypage/orderlist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={NextPageImg} alt="nextbtn" />
            </Link>
          </RowContainer>
        </ColContainer>
        <ColContainer background="#F0F0E8" height="400px">
          <BoldLarge>WISH LIST</BoldLarge>
          <GapH />
          <MediumSmall>내 마음을 설레게 한 케이크들은?</MediumSmall>
        </ColContainer>
        <ColContainer height="500px">
          <RowContainer
            width="1192px"
            style={{ justifyContent: "space-between", marginTop: "-200px" }}
          >
            {myWishList.map((myWish) => (
              <Card
                buyerId={loginUser ? loginUser.id : null}
                portfolioId={myWish.id}
                title={myWish.detail}
                shape={myWish.shape}
                sheetTaste={myWish.sheetTaste}
                creamTaste={myWish.creamTaste}
                situation={myWish.situation}
                businessName={myWish.businessName}
                size={myWish.size}
                detail={myWish.detail}
                imgUrl={myWish.imageUrl}
                color={myWish.color}
                createdAt={myWish.createdAt}
                hit={myWish.hit}
              />
            ))}
          </RowContainer>
          <GapH height="76px" />
          <Button2
            background={wishlistButtonColor}
            color={wishlistTextColor}
            onMouseEnter={hoverOnColor}
            onMouseLeave={hoverOutColor}
          >
            <Link
              to="/mypage/wishlist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              전체 위시 리스트
            </Link>
          </Button2>
        </ColContainer>
        <RowContainer background="#8C8279" height="300px" justify="end">
          <ColContainer align="end">
            <BoldLarge color="white">Review</BoldLarge>
            <GapH />
            <MediumSmall color="white">
              최근 주문한 내역 순서대로 보여집니다.
            </MediumSmall>
          </ColContainer>
          <GapW width="360px" />
        </RowContainer>
        <ColContainer background="#F0F0E8" height="600px">
          <GapH height="80px" />
          {myReviewList.map((review) => (
            <Review
              reviewId={review.id}
              businessName={review.businessName}
              reviewContent={review.reviewContent}
              reviewCreatedAt={review.reviewCreatedAt}
              reviewRating={review.reviewRating}
              sheetSize={review.sheetSize}
              sheetShape={review.sheetShape}
              sheetTaste={review.sheetTaste}
              creamTaste={review.creamTaste}
              imageUrl={review.imageFileDtoList[0].imageFileUri}
              imageAlt={review.imageFileDtoList[0].origImageFileName}
            />
          ))}
          <GapH height="100px" />
        </ColContainer>
      </UpDownContainer>
    </div>
  );
}

export default MyPage;
