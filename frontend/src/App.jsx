import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Welcome from "./Welcome";
import Login from "./Login";
import Main from "./Main";
import DragSize from "./DragSize";
import AuthPage from "./AuthPage";
import SignUpBuyer from "./SignUpBuyer";
import SignUpSeller from "./SignUpSeller";
import RecommendPersonal from "./RecommendPersonal";
import InfoDetail from "./InfoDetail";
import RecommendTheme from "./RecommendTheme";
import Testpage from "./test/Testpage";
import Popular from "./Popular";
import MyPage from "./MyPage";
import PortfolioModal from "./components/PortfolioModal";
import Diff from "./Diff";
import MakeOrder from "./MakeOrder";
import RecommendWishList from "./RecommendWishlist";
import MyWishList from "./MyWishList";
import MyPageOrderList from "./MyPageOrderList";
import SellerInfo from "./SellerInfo";
import SellerCustom from "./SellerCustom";
import SellerOrder from "./SellerOrder";
import OrderModal from "./components/OrderModal";
import SellerPortfolioRegist from "./SellerPortfolioRegist";
import AllCake from "./AllCake";
import AllSeller from "./AllSeller";
import StoreDetail from "./StoreDetail";
import CakeDiy from "./CakeDiy";
import SellerPortfolio from "./SellerPortfolio";
import ReviewRegist from "./ReviewRegist";
import ReviewDetail from "./ReviewDetail";
import AllReview from "./AllReview";

const AppContainer = styled.div`
  &,
  & * {
    box-sizing: border-box;
  }
`;
// const AuthRecommendPersonal = Auth(RecommendPersonal);
const AuthRecommendWishList = Auth(RecommendWishList);
const AuthMyPageOrderList = Auth(MyPageOrderList);

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/buyer" element={<SignUpBuyer />} />
        <Route path="/signup/seller" element={<SignUpSeller />} />
        <Route path="/main" element={<Main />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/modal" element={<PortfolioModal />} />
        <Route path="/diff" element={<Diff />} />
        <Route path="/makeOrder/:storeId" element={<MakeOrder />} />
        <Route path="/test" element={<Testpage />} />
        <Route path="/dragsize" element={<DragSize />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
        <Route path="/recommend/personal" element={<RecommendPersonal />} />
        <Route path="/infodetail" element={<InfoDetail />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/mypage/orderlist" element={<AuthMyPageOrderList />} />
        <Route path="/mypage/infodetail" element={<InfoDetail />} />
        <Route path="/recommend/personal" element={<RecommendPersonal />} />
        <Route path="/recommend/theme" element={<RecommendTheme />} />
        <Route path="/recommend/wishlist" element={<AuthRecommendWishList />} />
        <Route path="/seller/info" element={<SellerInfo />} />
        <Route path="/seller/custom" element={<SellerCustom />} />
        <Route path="/seller/order" element={<SellerOrder />} />
        <Route path="/seller/portfolio" element={<SellerPortfolio />} />
        <Route path="/allcake" element={<AllCake />} />
        <Route path="/allseller" element={<AllSeller />} />
        <Route path="/review/list" element={<AllReview />} />
        <Route path="/cakeDiy" element={<CakeDiy />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />
        <Route
          path="/seller/portfolio/regist"
          element={<SellerPortfolioRegist />}
        />
        <Route path="/review/regist/:orderId" element={<ReviewRegist />} />
        <Route path="/review/detail/:orderId" element={<ReviewDetail />} />
        <Route path="/orderModal" element={<OrderModal />} />
        <Route path="/mypage/wishlist" element={<MyWishList />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
