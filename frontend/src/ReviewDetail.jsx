import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./util/axiosInstance";

function ReviewDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(5);
  const onArr = [...Array(rating).keys()];
  const offArr = [...Array(5 - rating).keys()];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/order-sheet/${orderId}`)
      .then((res) => {
        setReview(res.data);
        setRating(resdata.reviewRating);
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
            <MediumSmall>리뷰작성</MediumSmall>
            <BoldLarge color="#9E9E9E">{cakeStore.businessName}</BoldLarge>
            <GapH height="66px" />
          </ColContainer>
        </RowContainer>
        <hr />
        <GapH height="40px" />
      </span>
      <RowContainer>
        <ColContainer>
          {review.imageFileDtoList[0] ? (
            <img
              width="160px"
              height="110px"
              src={imageFileDtoList[0]}
              alt="preview-img"
            />
          ) : (
            <img
              width="160px"
              height="110px"
              src={SampleImage}
              alt="preview-img"
            />
          )}
          <GapH />
          <RowContainer justify="start">
            {review.imageFileDtoList
              .slice(1, imageSrc.length)
              .map((image) =>
                image ? (
                  <img
                    width="160px"
                    height="110px"
                    src={image}
                    alt="preview-img"
                  />
                ) : (
                  <img
                    width="160px"
                    height="110px"
                    src={SampleImage}
                    alt="preview-img"
                  />
                )
              )}
          </RowContainer>
        </ColContainer>
        <GapW width="30px" />
        <RowContainer justify="space-between">
          <RowContainer justify="start">
            <GapW width="30px" />
            {onArr.map(() => (
              <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
            ))}
            {offArr.map(() => (
              <img src={StarOff} alt="starOff" style={{ marginRight: "5px" }} />
            ))}
          </RowContainer>
        </RowContainer>
        <GapH height="10px" />
        <ColContainer gap="30px">
          <Small>{review.content}</Small>
          <RowContainer justify="end" gap="30px">
            <Button1 width="150px" background="#E0E0E0">
              취소
            </Button1>
          </RowContainer>
        </ColContainer>
      </RowContainer>
      <GapH height="50px" />
    </div>
  );
}

export default ReviewDetail;
