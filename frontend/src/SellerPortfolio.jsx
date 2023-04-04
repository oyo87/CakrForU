import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import Card from "./components/Card";
import Button1 from "./components/button/Button1";
import Small from "./components/text/Small";

function SellerPortfolio() {
  const seller = useSelector((state) => state.login.user);
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate();

  const navigateToRegist = () => {
    navigate("/seller/portfolio/regist");
  };

  useEffect(() => {
    axios.get(`/portfolio/seller/${seller.id}`).then((res) => {
      setPortfolio(res.data);
      console.log(res.data);
    });
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
            <BoldLarge fontsize="40px">{seller.businessName}</BoldLarge>
          </RowContainer>
          <GapH height="50px" />
          <RowContainer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <GapW width="30px" />
            <BoldMedium style={{ marginRight: "auto" }}>포트폴리오</BoldMedium>
            <Button1 onClick={navigateToRegist}>
              <Small color="white">등록</Small>
            </Button1>
            <GapW width="30px" />
          </RowContainer>
          <GapH height="58px" />
          <GapH height="24px" />
          <RowContainer
            width="1194px"
            gap="21px"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridGap: "21px",
            }}
          >
            {portfolio.map((item) => {
              return (
                <Card
                  title={item.detail}
                  shape={item.shape}
                  sheetTaste={item.sheetTaste}
                  creamTaste={item.creamTaste}
                  situation={item.situation}
                  sellerId={item.businessName}
                  size={item.size}
                  detail={item.detail}
                  imgUrl={item.imageUrl}
                />
              );
            })}
          </RowContainer>
        </ColContainer>
      </LeftRightContainer>
    </div>
  );
}

export default SellerPortfolio;
