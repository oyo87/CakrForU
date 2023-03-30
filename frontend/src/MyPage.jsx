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
import GapH from "./components/layout/GapH";
import MediumSmall from "./components/text/MediumSmall";
import BoldMedium from "./components/text/BoldMedium";
import BoldLarge from "./components/text/BoldLarge";
import Button1 from "./components/button/Button1";
import Button2 from "./components/button/Button2";

function MyPage() {
  const loginUser = useSelector((state) => state.login.user);
  const [myOrderList, setMyOrderList] = useState([]);
  const [myWishList, setMyWishList] = useState([]);

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
          <Button2>전체위시리스트</Button2>
        </ColContainer>
        <ColContainer background="#F0F0E8" height="400px">
          <BoldLarge>WISH LIST</BoldLarge>
          <GapH />
          <MediumSmall>내 마음을 설레게 한 케이크들은?</MediumSmall>
        </ColContainer>
      </UpDownContainer>
    </div>
  );
}

export default MyPage;
