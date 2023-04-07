import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ColContainer from "./layout/ColContainer";
import RowContainer from "./layout/RowContainer";
import StarOn from "../assets/img/StarOn.png";
import StarOff from "../assets/img/StarOff.png";
import Small from "./text/Small";
import BoldSmallMedium from "./text/BoldSmallMedium";
import MediumSmall from "./text/MediumSmall";
import GapH from "./layout/GapH";
import GapW from "./layout/GapW";

function Review({
  reviewId,
  businessName,
  reviewContent,
  reviewCreatedAt,
  reviewRating,
  sheetSize,
  sheetShape,
  sheetTaste,
  creamTaste,
  imageUrl,
  imageAlt,
}) {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.login.user);
  const onArr = [...Array(reviewRating).keys()];
  const offArr = [...Array(5 - reviewRating).keys()];
  const desc = [sheetSize, sheetShape, sheetTaste, creamTaste].join(", ");

  const handleClick = () => {
    navigate("/review/detail/".concat(reviewId));
  };
  return (
    <ColContainer width="1194px" align="start" onClick={handleClick}>
      <RowContainer>
        <ColContainer width="400px" align="start">
          <BoldSmallMedium>{loginUser.nickname}</BoldSmallMedium>
          <GapH />
          <Small color="#999999">
            {reviewCreatedAt ? reviewCreatedAt.split("T")[0] : null}
          </Small>
        </ColContainer>
        <RowContainer justify="end">
          {onArr.map(() => (
            <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
          ))}
          {offArr.map(() => (
            <img src={StarOff} alt="starOff" style={{ marginRight: "5px" }} />
          ))}
        </RowContainer>
      </RowContainer>
      <GapH height="10px" />
      <RowContainer justify="start">
        <img src={imageUrl} alt={imageAlt} width="144px" height="144px" />
        <GapW width="100px" />
        <ColContainer
          align="start"
          style={{
            alignContent: "space-between",
            justifyContent: "space-between",
          }}
        >
          <MediumSmall>{reviewContent}</MediumSmall>
          <ColContainer align="start" justify="end">
            <Small color="#999999">구매 가게 : {businessName}</Small>
            <Small color="#999999">케이크 상세 내용 : {desc}</Small>
          </ColContainer>
        </ColContainer>
      </RowContainer>
    </ColContainer>
  );
}

export default Review;
