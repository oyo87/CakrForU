import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import OrderListCard from "./components/OrderListCard";
import BoldMedium from "./components/text/BoldMedium";
import Medium from "./components/text/Medium";
import MoreInfo from "./components/MoreInfo";
import axios from "./util/axiosInstance";

function MyPageOrderList() {
  // const URL = ${process.env.REACT_APP_BACKEND_URL};
  const URL = "http://localhost:8080"; // 로컬작업끝나면 위의것으로 변경
  const loginUser = useSelector((state) => state.login.user);
  const [orderList, setOrderList] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState(2);
  const navigate = useNavigate();
  const loadMoreOrders = () => {
    setVisibleOrders(visibleOrders + 2);
  };
  function getOrderList() {
    // .get(`${URL}/order-sheet-buyer/${loginUser.id}`)
    console.log(process.env.REACT_APP_BACKEND_URL);
    console.log(`${URL}/order-sheet/buyer/0`);
    axios
      .get(`${URL}/order-sheet/buyer/0`)
      .then((response) => {
        setOrderList(response.data);
        console.log("getOrderList : ", response.data);
      })
      .catch((error) => {
        console.error(`MyPageOrderList's getOrderList + ${error}`);
      });
  }

  useEffect(() => {
    getOrderList();
  }, []);

  if (!loginUser) {
    navigate(`/login`);
  }

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
    margin-right: 100px;
    margin-left: 180px;
  `;
  const Line = styled.hr`
    margin-bottom: 2.75rem;
  `;

  const MoreButton = styled.button`
    border: none;
    background-color: white;
    display: flex;
    margin: 0 auto;
  `;

  return (
    <div>
      <Header />
      <PickupDiv>
        <BoldMedium color="white">픽업 준비가 완료되었습니다.</BoldMedium>
      </PickupDiv>
      <MainContent>
        <Medium>주문 목록</Medium>
        <Line />
        {orderList.length > 0 ? (
          orderList
            .slice(0, visibleOrders)
            .map((order) => <OrderListCard key={order.id} {...order} />)
        ) : (
          <p>주문 내역이 존재하지 않습니다.</p>
        )}
        {/* axios가져온다음에 5개정도씩만 보여줌. 더보기 하면 5개씩 추가 */}
        {/* 만약 데이터를 모두 보여줬으면 더보기 제거 데이터가 남아있으면 더보기 남겨두기 */}
        {visibleOrders <= orderList.length ? (
          <MoreButton onClick={loadMoreOrders}>
            <MoreInfo />
          </MoreButton>
        ) : (
          ""
        )}
      </MainContent>
    </div>
  );
}

export default MyPageOrderList;
