import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import GapH from "./components/layout/GapH";
// import SmallMedium from "./components/text/SmallMedium";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import Card from "./components/Card";
// import PinkSearch from "./assets/img/pink_search.png";
import { closePortfolio } from "./store/modalSlice";
import PortfolioModal from "./components/PortfolioModal";
import axios from "./util/axiosInstance";

function AllCake() {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [pageNum, setPageNum] = useState(10);
  const user = useSelector((state) => state.login.user);
  const modal = useSelector((state) => state.modal);
  const [popularCake, setPopularCake] = useState([]);
  const dispatch = useDispatch();
  const handleClickOutModal = () => {
    if (modal.portfolioOpen) {
      dispatch(closePortfolio());
    }
  };

  const fetchWishList = async (buyerId) => {
    try {
      const response = await axios.get(`/wish/b/${buyerId}`);
      console.log("user wishlist", response.data);
      if (response.data.result) {
        return response.data.wishlist;
      }
      console.error("Failed to fetch wishlist:", response.data.msg);
      return [];
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      return [];
    }
  };

  const fetchMoreData = async () => {
    try {
      const wishlistItemIds = user
        ? await fetchWishList(user.id).then((wishlist) =>
            wishlist.map((item) => item.id)
          )
        : [];

      const response = await axios.get(`/portfolio/list?page=${pageNum}`);
      const newData = response.data;

      console.log("ids: ", wishlistItemIds);

      const updatedData = newData.map((item) => {
        return {
          ...item,
          filled: wishlistItemIds.includes(item.id),
        };
      });

      console.log("updatedData = ", updatedData);

      if (newData.length === 0) {
        setHasMoreItems(false);
      } else {
        setPopularCake((prevData) => [...prevData, ...updatedData]);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div>
      <Header handleClickOutModal={handleClickOutModal} />
      {modal.portfolioOpen ? (
        <PortfolioModal
          shape={modal.portfolio.shape}
          sheetTaste={modal.portfolio.sheetTaste}
          color={modal.portfolio.color}
          creamTaste={modal.portfolio.creamTaste}
          size={modal.portfolio.size}
          title={modal.portfolio.title}
          detail={modal.portfolio.detail}
          imgUrl={modal.portfolio.imgUrl}
        />
      ) : null}
      <UpDownContainer align="center" onClick={handleClickOutModal}>
        <GapH height="34px" />
        {/* <RowContainer
          height="61px"
          width="451px"
          border="1px solid"
          borderRadius="30px"
          borderColor="#E3E3E3"
          position="relative"
        >
          <SmallMedium>내 지역 선택</SmallMedium>
          <img
            src={PinkSearch}
            alt="img"
            style={{
              width: "50px",
              position: "absolute",
              right: "26px",
            }}
          />
        </RowContainer> */}
        <GapH height="24px" />
        <RowContainer width="1194px" justify="start">
          <BoldSmallMedium>모든 케이크</BoldSmallMedium>
        </RowContainer>
        <GapH height="24px" />
        <InfiniteScroll
          dataLength={popularCake.length}
          next={fetchMoreData}
          hasMore={hasMoreItems}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>목록의 마지막입니다.</b>
            </p>
          }
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridGap: "21px",
            }}
          >
            {popularCake.map((item) => {
              return (
                <Card
                  key={item.imageUrl[0]}
                  buyerId={user ? user.id : null}
                  portfolioId={item.id}
                  sellerId={item.sellerId}
                  title={item.detail}
                  shape={item.shape}
                  sheetTaste={item.sheetTaste}
                  creamTaste={item.creamTaste}
                  situation={item.situation}
                  businessName={item.businessName}
                  size={item.size}
                  detail={item.detail}
                  imgUrl={item.imageUrl}
                  color={item.color}
                  filled={item.filled}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </UpDownContainer>
    </div>
  );
}

export default AllCake;
