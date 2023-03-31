import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./util/axiosInstance";
import Header from "./components/Header";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import ColContainer from "./components/layout/ColContainer";
import MyPageCard from "./components/MyPageCard";
import MyPageTitle from "./components/MyPageTitle";
import Card from "./components/Card";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import MediumSmall from "./components/text/MediumSmall";

import BoldMedium from "./components/text/BoldMedium";
import BoldLarge from "./components/text/BoldLarge";
import Button1 from "./components/button/Button1";
import Button2 from "./components/button/Button2";
import Review from "./components/Review";

function MyPage() {
  const loginUser = useSelector((state) => state.login.user);
  const [myOrderList, setMyOrderList] = useState([]);
  const [myWishList, setMyWishList] = useState([]);
  const [wishlistButtonColor, setWishlistButtonColor] = useState([]);
  const [wishlistTextColor, setWishlistTextColor] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/buyer/${loginUser.id}`
      )
      .then((res) => {
        setMyOrderList(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/b/${loginUser.id}`)
      .then((res) => {
        setMyWishList(res.data.wishlist.slice(0, 5));
      });
  }, []);

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
      <Header />
      <UpDownContainer>
        <MyPageTitle />
        <ColContainer
          height="614px"
          align="start"
          width="1170px"
          style={{ alignSelf: "center" }}
        >
          <BoldMedium>MY CAKE</BoldMedium>
          <GapH />
          <RowContainer
            width="100%"
            style={{ justifyContent: "space-between" }}
          >
            {myOrderList.map((myOrder) => (
              <MyPageCard
                sellerId={myOrder.businessName}
                createdAt={myOrder.createdAt.split("T")[0]}
                pickUpDate={myOrder.pickUpDate}
                sheetShape={myOrder.sheetShape}
                creamTaste={myOrder.creamTaste}
                sheetTaste={myOrder.sheetTaste}
                sheetSize={myOrder.sheetSize}
              />
            ))}
            <Button1>~~</Button1>
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
                title={myWish.detail}
                shape={myWish.shape}
                sheetTaste={myWish.sheetTaste}
                creamTaste={myWish.creamTaste}
                situation={myWish.situation}
                sellerId={myWish.sellerId}
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
            전체위시리스트
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
        <RowContainer background="#F0F0E8" height="600px">
          {/* <!-- asdf --> */}
          <Review />
          {/* <!-- asdf --> */}
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default MyPage;
