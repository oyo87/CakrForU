/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import axios from "./util/axiosInstance";
import BoldMedium from "./components/text/BoldMedium";
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

  function OrderImage({ orderId }) {
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/image-file/order-sheet/${orderId}`
        )
        .then((response) => {
          if (response.data.length > 0) {
            setImageURL(response.data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [orderId]);

    return (
      <>
        {imageURL && (
          <img
            src={imageURL}
            alt={`Order ${orderId}`}
            style={{
              width: "455px",
              height: "355px",
              objectFit: "cover",
            }}
          />
        )}
      </>
    );
  }

  function formatDate(data) {
    return data.map((obj) => {
      const dateObj = new Date(obj.createdAt);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      if (obj.pickUpDate) {
        const pickUpDateObj = new Date(obj.pickUpDate);
        const pickUpYear = pickUpDateObj.getFullYear();
        const pickUpMonth = String(pickUpDateObj.getMonth() + 1).padStart(
          2,
          "0"
        );
        const pickUpDay = String(pickUpDateObj.getDate()).padStart(2, "0");
        const formattedPickUpDate = `${pickUpYear}-${pickUpMonth}-${pickUpDay}`;
        obj.pickUpDate = formattedPickUpDate;
      }

      obj.createdAt = formattedDate;
      return obj;
    });
  }

  function fetchSellerOrder() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/seller/${seller.id}`
      )
      .then((res) => {
        const formattedData = formatDate(res.data);
        setOrders(formattedData);
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
                <OrderImage orderId={order.id} />
                <GapW width="50px" />
                <ColContainer gap="28px" align="start">
                  <Medium>{order.createdAt} 주문</Medium>
                  <Medium>{order.buyerNickName}</Medium>
                  {order.pickUpDate ? (
                    <Medium>{order.pickUpDate} 픽업예정</Medium>
                  ) : null}
                  <BoldMedium color="#F081A4">주문상세 </BoldMedium>
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
    </div>
  );
}

export default SellerOrder;
