import React, { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import GapH from "./components/layout/GapH";
import SmallMedium from "./components/text/SmallMedium";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import Card from "./components/Card";
import PinkSearch from "./assets/img/pink_search.png";
import axios from "./util/axiosInstance";

function AllSeller() {
  //   const [hasMoreItems, setHasMoreItems] = useState(true);
  //   const [pageNum, setPageNum] = useState(10);
  const [sellers, setSellers] = useState([]);

  //   const fetchMoreData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/seller/search/all/paging?page=${pageNum}`
  //       );
  //       const updatedData = response.data;

  //       console.log("updatedData = ", response.data);

  //       if (updatedData.length === 0) {
  //         setHasMoreItems(false);
  //       } else {
  //         console.log("pageNum = ", pageNum);
  //         setSellers((prevData) => [...prevData, ...updatedData]);
  //         setPageNum((prevPageNum) => prevPageNum + 1);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch more data:", error);
  //     }
  //   };
  useEffect(() => {
    // axios
    //   .get(`/seller/form/${SELLER_ID}`)
    //   .then((response) => {
    //     console.log("ok!!!!");
    //     console.log("response.data = ", response.data);
    //     const tmp1 = Object.entries(response.data.sheetShape);
    //     const filtered1 = tmp1.filter(([, ok]) => ok === true);
    //     const tmp2 = Object.entries(response.data.sheetSize);
    //     const filtered2 = tmp2.filter(([, ok]) => ok === true);
    //     const tmp3 = Object.entries(response.data.sheetTaste);
    //     const filtered3 = tmp3.filter(([, ok]) => ok === true);
    //     const tmp4 = Object.entries(response.data.creamTaste);
    //     const filtered4 = tmp4.filter(([, ok]) => ok === true);

    //     setSellerSheetShape(Object.entries(filtered1));
    //     setSellerSheetSize(Object.entries(filtered2));
    //     setSellerSheetTaste(Object.entries(filtered3));
    //     setSellerCreamTaste(Object.entries(filtered4));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .get(`/seller/search/all`)
      .then((response) => {
        console.log("response = ", response);
        setSellers(response.data);
      })
      .catch((error) => {
        console.log("error = ", error);
      });
  }, []);

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
        <RowContainer width="1194px" gap="21px">
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
        </RowContainer>
      </UpDownContainer>
    </div>
  );
}

export default AllSeller;
