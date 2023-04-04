import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import GapH from "./components/layout/GapH";
import SmallMedium from "./components/text/SmallMedium";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import Card from "./components/Card";
import PinkSearch from "./assets/img/pink_search.png";
import axios from "./util/axiosInstance";

function AllSeller() {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [sellers, setSellers] = useState([]);

  const fetchMoreData = async () => {
    try {
      const response = await axios.get(
        `/seller/search/all/paging?page=${pageNum}`
      );
      const updatedData = response.data;

      console.log("updatedData = ", response.data);

      if (updatedData.length === 0) {
        setHasMoreItems(false);
      } else {
        console.log("pageNum = ", pageNum);
        setSellers((prevData) => [...prevData, ...updatedData]);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    }
  };

  return (
    <div>
      <UpDownContainer align="center">
        <GapH height="34px" />
        <RowContainer
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
        </RowContainer>
        <GapH height="24px" />
        <RowContainer width="1194px" justify="start">
          <BoldSmallMedium>모든 가게</BoldSmallMedium>
        </RowContainer>
        <GapH height="24px" />
        <InfiniteScroll
          dataLength={sellers.length}
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
            {sellers.map((item) => {
              return (
                <Card
                  title={item.businessDescription}
                  situation={item.situation}
                  sellerId={item.sellerId}
                  imgUrl={item.imageUrls}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </UpDownContainer>
    </div>
  );
}

export default AllSeller;
