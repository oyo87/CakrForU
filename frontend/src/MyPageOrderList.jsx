import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import OrderListCard from "./components/OrderListCard";
import BoldMedium from "./components/text/BoldMedium";
import Medium from "./components/text/Medium";
import MoreInfo from "./components/MoreInfo";
import axios from "./util/axiosInstance";
import { closeBuyerOrder } from "./store/modalSlice";
import BuyerOrderModal from "./components/BuyerOrderModal";

function MyPageOrderList() {
  const [orderList, setOrderList] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [isPickUpReady, setIsPickUpReady] = useState(false);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.user);
  const navigate = useNavigate();

  if (loginUser.userType !== "buyer") {
    navigate("/");
  }
  const handleClickOutModal = () => {
    if (modal.buyerOrderOpen) {
      dispatch(closeBuyerOrder());
    }
  };
  const loadMoreOrders = () => {
    setVisibleOrders(visibleOrders + 3);
  };

  function getOrderList() {
    const todayDate = new Date();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/buyer/${loginUser.id}`
      )
      .then((response) => {
        setOrderList(response.data);

        const hasPickUpReady = response.data.some(
          (order) => order.pickUpDate === todayDate
        );
        setIsPickUpReady(hasPickUpReady); // 오늘 픽업예정인 케이크가 있으면 위에 픽업하라고 창 표시
        // console.log("getOrderList : ", response.data);
      })
      .catch((error) => {
        console.error(`MyPageOrderList's getOrderList + ${error}`);
      });
  }

  useEffect(() => {
    getOrderList();
  }, [loginUser]);

  const PickupDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 6.25rem;
    background-color: #8c8279;
  `;
  const MainContent = styled.div`
    margin-top: 3.56rem;
    margin-right: 11rem;
    margin-left: 11rem;
    padding-bottom: 3rem;
  `;
  const Line = styled.hr`
    margin-bottom: 2.75rem;
    background: #ececec;
    height: 1px;
    border: 0;
  `;

  const MoreButton = styled.button`
    border: none;
    background-color: white;
    display: flex;
    margin: 0 auto;
  `;

  const AllContainer = styled.div``;

  return (
    <div>
      <AllContainer onClick={handleClickOutModal}>
        <Header />
        {isPickUpReady === true ? (
          <PickupDiv>
            <BoldMedium color="white">픽업 준비가 완료되었습니다.</BoldMedium>
          </PickupDiv>
        ) : (
          ""
        )}
        {modal.buyerOrderOpen ? <BuyerOrderModal /> : null}
        <MainContent>
          <Medium>주문 목록</Medium>
          <Line />
          {orderList.length > 0 ? (
            orderList
              .slice(0, visibleOrders)
              .map((order) => <OrderListCard key={order.id} {...order} />)
          ) : (
            <BoldMedium>주문 내역이 존재하지 않습니다.</BoldMedium>
          )}
          {visibleOrders < orderList.length ? (
            <MoreButton onClick={loadMoreOrders}>
              <MoreInfo />
            </MoreButton>
          ) : (
            ""
          )}
        </MainContent>
      </AllContainer>
    </div>
  );
}

export default MyPageOrderList;
