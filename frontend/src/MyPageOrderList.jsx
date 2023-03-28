import React from "react";
import Header from "./components/Header";
import OrderListCard from "./components/OrderListCard";

function MyPageOrderList() {
  return (
    <div>
      <Header />
      <div>픽업 준비가 완료되었습니다.</div>
      <div>주문 목록</div>
      <hr />
      <OrderListCard />
    </div>
  );
}

export default MyPageOrderList;
