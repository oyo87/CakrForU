/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import UpDownContainer from "./components/layout/UpDownContainer";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import axios from "./util/axiosInstance";
import BoldMedium from "./components/text/BoldMedium";
import Tmp from "./assets/img/login_image.png";
import Medium from "./components/text/Medium";

function SellerOrder() {
  const seller = useSelector((state) => state.login.user);
  const [orders, setOrders] = useState([]);
  const dict = {
    REGISTRATION: "주문서 등록",
    SEND: "견적서 발송",
    DEPOSIT_COMPLETE: "입금 완료",
    FINISH_PICK_UP: "픽업 완료",
  };

  function fetchSellerOrder() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/seller/${seller.id}`
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      });
  }

  useEffect(() => {
    fetchSellerOrder();
  }, []);

  return (
    <div>
      <Header />
      <LeftRightContainer>
        <ColContainer width="276px">
          <SellerSide />
          <GapH height="89px" />
        </ColContainer>
        <ColContainer align="start">
          <GapH height="89px" />
          <RowContainer
            justify="start"
            width="1200px"
            height="121px"
            background="#F0F5FA"
          >
            <GapW width="30px" />
            <BoldLarge fontsize="40px">주문 관리</BoldLarge>
          </RowContainer>
          <GapH height="50px" />
          <RowContainer justify="start">
            <GapW width="30px" />

            <BoldMedium>주문내역</BoldMedium>
          </RowContainer>
          <GapH height="58px" />
          {orders.map((order) => (
            <div>
              <RowContainer justify="start">
                <GapW width="30px" />
                <Medium>{order.id}</Medium>
              </RowContainer>

              <GapH height="28px" />
              <RowContainer justify="start" width="1200px">
                <GapW width="30px" />
                <ColContainer align="start">
                  <img
                    src={Tmp}
                    alt="tmp"
                    style={{
                      width: "251px",
                      height: "204px",
                      objectFit: "cover",
                    }}
                  />
                </ColContainer>
                <GapW width="50px" />
                <ColContainer gap="28px" align="start">
                  <Medium>{order.createdAt} 주문</Medium>
                  <Medium>{order.nickname}</Medium>
                  <Medium>{order.dueDate}</Medium>
                  <Medium color="#F081A4">주문상세</Medium>
                </ColContainer>
                <div
                  style={{
                    flexGrow: 1,
                  }}
                />
                <ColContainer justify="justify" height="147px">
                  <BoldMedium color="#F081A4">{dict[order.status]}</BoldMedium>
                </ColContainer>
              </RowContainer>
              <GapH height="56px" />
            </div>
          ))}
        </ColContainer>
      </LeftRightContainer>

      <UpDownContainer>aa</UpDownContainer>
    </div>
  );
}

export default SellerOrder;
