import React, { useEffect } from "react";
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

function SellerOrder() {
  // const [sellerId, setSellerId] = useState([]);
  // const sellerId = useState(1);
  function fetchSellerOrder() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/order-sheet/1`)
      .then((res) => {
        console.log(res.data);
      });
  }

  useEffect(() => {
    fetchSellerOrder();
  }, []);

  return (
    <div>
      <Header />
      <UpDownContainer>
        <LeftRightContainer>
          <GapW width="160px" />
          <SellerSide />
          <GapW width="99px" />
          <ColContainer>
            <GapH height="89px" />
            <RowContainer justify="start" height="121px" background="#F0F5FA">
              <GapW width="30px" />
              <BoldLarge>주문 관리</BoldLarge>
            </RowContainer>
            <GapH height="139px" />
            <ColContainer>
              <GapW width="69px" />
              <LeftRightContainer>ㄴㅇ</LeftRightContainer>
            </ColContainer>
          </ColContainer>
        </LeftRightContainer>
      </UpDownContainer>
    </div>
  );
}

export default SellerOrder;
