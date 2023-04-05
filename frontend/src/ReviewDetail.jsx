import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./util/axiosInstance";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import RowContainer from "./components/layout/RowContainer";
import MediumSmall from "./components/text/MediumSmall";
import Small from "./components/text/Small";
import GapH from "./components/layout/GapH";
import GapW from "./components/layout/GapW";
import BoldLarge from "./components/text/BoldLarge";
import SampleImage from "./assets/img/logo2.png";
import StarOn from "./assets/img/StarOn.png";
import StarOff from "./assets/img/StarOff.png";
import BoldMedium from "./components/text/BoldMedium";
import SmallMedium from "./components/text/SmallMedium";

function ReviewDetail() {
  const { orderId } = useParams();
  //   const navigate = useNavigate();
  const [review, setReview] = useState([]);
  const [userNickname, setUserNickname] = useState([]);
  const [rating, setRating] = useState(5);
  const onArr = [...Array(rating).keys()];
  const offArr = [...Array(5 - rating).keys()];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/order-sheet/${orderId}`)
      .then((res) => {
        setReview(res.data);
        setRating(res.data.reviewRating);

        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/buyer/${res.data.buyerId}`)
          .then((res2) => {
            setUserNickname(res2.data.buyerInfo.nickname);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      <span>
        <GapH height="40px" />
        <hr />
        <RowContainer justify="start" height="220px">
          <ColContainer>
            <GapW width="432px" justify="start" />
          </ColContainer>
          <ColContainer align="start" height="100%">
            <GapH height="57px" />
            <MediumSmall>리뷰보기</MediumSmall>
            <BoldLarge color="#9E9E9E">{review.businessName}</BoldLarge>
            <GapH height="66px" />
          </ColContainer>
        </RowContainer>
        <hr />
        <GapH height="40px" />
      </span>
      <RowContainer justify="start" align="start">
        <GapW width="360px" />
        <ColContainer align="start">
          <BoldMedium>{userNickname}</BoldMedium>
          <Small>{review.createdAt.split("T")[0]}</Small>
          <GapH />
          {review.imageFileDtoList ? (
            <img
              width="500px"
              height="400px"
              src={review.imageFileDtoList[0].imageFileUri}
              alt="preview-img"
            />
          ) : (
            <img
              width="500px"
              height="400px"
              src={SampleImage}
              alt="preview-img"
            />
          )}
          <GapH />
          <RowContainer justify="start">
            {review.imageFileDtoList ? (
              review.imageFileDtoList
                .slice(1, review.imageFileDtoList.length)
                .map((image) => (
                  <img
                    width="160px"
                    height="110px"
                    src={image.imageFileUri}
                    alt="preview-img"
                  />
                ))
            ) : (
              <img
                width="160px"
                height="110px"
                src={SampleImage}
                alt="preview-img"
              />
            )}
          </RowContainer>
        </ColContainer>
        <GapW width="50px" />
        <ColContainer align="start" justify="start">
          <RowContainer justify="start" align="start">
            {onArr.map(() => (
              <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
            ))}
            {offArr.map(() => (
              <img src={StarOff} alt="starOff" style={{ marginRight: "5px" }} />
            ))}
          </RowContainer>
          <GapH height="10px" />
          <ColContainer>
            <GapH height="30px" />
            <SmallMedium>{review.reviewContent}</SmallMedium>
          </ColContainer>
        </ColContainer>
      </RowContainer>
      <GapH height="50px" />
    </div>
  );
}

export default ReviewDetail;
