import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import OrderListCard from "./components/OrderListCard";
import BoldMedium from "./components/text/BoldMedium";
import Medium from "./components/text/Medium";

function MyPageOrderList() {
  const PickupDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 6.25rem;
    margin-bottom: 3.56rem;
    background-color: #8c8279;
  `;
  const MainContent = styled.div`
    margin-right: 100px;
    margin-left: 180px;
  `;
  const Line = styled.hr`
    margin-bottom: 2.75rem;
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
        <OrderListCard />
        <OrderListCard />
      </MainContent>
    </div>
  );
}

export default MyPageOrderList;
