import React, { useEffect, useState } from "react";
import UpDownContainer from "./components/layout/UpDownContainer";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import RowContainer from "./components/layout/RowContainer";
import GapH from "./components/layout/GapH";
import GapW from "./components/layout/GapW";
import Review from "./components/Review";
import SmallMedium from "./components/text/SmallMedium";
import Large from "./components/text/Large";
import axios from "./util/axiosInstance";

function AllReview() {
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    axios.get(`/order-sheet/buyer/review/`).then((res) => {
      setReviewList(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <UpDownContainer>
        <GapH height="48px" />
        <div
          style={{
            height: "1px",
            backgroundColor: "#aaaaaa",
            width: "100%",
          }}
        />
        <RowContainer justify="start" height="220px">
          <ColContainer>
            <GapW width="432px" justify="start" />
          </ColContainer>
          <ColContainer align="start" height="100%">
            <GapH height="57px" />
            <SmallMedium>Cake For U</SmallMedium>
            <Large>모든 리뷰</Large>
            <GapH height="66px" />
            <SmallMedium>이용자들의 생생한 후기를 확인해보세요.</SmallMedium>
            <GapH height="66px" />
          </ColContainer>
        </RowContainer>
        <div
          style={{
            height: "1px",
            backgroundColor: "#aaaaaa",
            width: "100%",
          }}
        />
        <GapH height="48px" />
        <ColContainer background="#F0F0E8">
          <GapH height="80px" />
          {reviewList.map((review) => (
            <div>
              <Review
                reviewId={review.id}
                businessName={review.businessName}
                reviewContent={review.reviewContent}
                reviewCreatedAt={review.reviewCreatedAt}
                reviewRating={review.reviewRating}
                sheetSize={review.sheetSize}
                sheetShape={review.sheetShape}
                sheetTaste={review.sheetTaste}
                creamTaste={review.creamTaste}
                imageUrl={review?.imageFileDtoList[0]?.imageFileUri}
                imageAlt={review?.imageFileDtoList[0]?.origImageFileName}
              />
              <GapH height="50px" />
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#aaaaaa",
                  width: "100%",
                }}
              />
              <GapH height="50px" />
            </div>
          ))}
        </ColContainer>
      </UpDownContainer>
    </div>
  );
}

export default AllReview;
