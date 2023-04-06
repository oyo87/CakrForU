import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import UpDownContainer from "./layout/UpDownContainer";
import RowContainer from "./layout/RowContainer";
import GapH from "./layout/GapH";
import GapW from "./layout/GapW";
import BoldLarge from "./text/BoldLarge";
import Button1 from "./button/Button1";
import { closeBuyerOrder } from "../store/modalSlice";
import Barcode from "../assets/img/barcode.png";
import BoldMediumSmall from "./text/BoldMediumSmall";
import MediumSmall from "./text/MediumSmall";
import BoldSmall from "./text/BoldSmall";
import SmallMedium from "./text/SmallMedium";
import Temp from "../assets/img/logo2.png";

function BuyerOrderModal() {
  const navigate = useNavigate();
  const orderSheet = useSelector((state) => state.modal.buyerOrder);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const filteredImages = orderSheet.imageFileDtoList.filter(
    (image) =>
      image.imageFileType === "ORDERS_PICTURE" ||
      image.imageFileType === "SELLER_THUMBNAIL"
  );

  const handleNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const Button = styled.button`
    display: inline;
    background-color: #ffacac;
    border-radius: 5px;
    border: none;
    margin-right: 1rem;
    width: 11.875rem;
    min-width: 10rem;
    height: 2.8rem;
    cursor: pointer;
  `;

  const DateOrderName = styled.div``;
  const LeftSide = styled.div``;
  const RightSide = styled.div``;
  const MainContainer = styled.div``;
  const Div = styled.div``;

  useEffect(() => {}, [orderSheet]);
  const dispatch = useDispatch();
  return (
    <UpDownContainer
      width="75.063rem"
      height="43.688rem"
      align="center"
      position="fixed"
      zIndex="2"
      background="white"
      minHeight="auto"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      boxShadow="0px 0px 100px 20px rgba(0, 0, 0, 0.15)"
    >
      <DateOrderName
        style={{
          width: "100%",
          display: "flex",
          marginTop: "3.438rem",
          justifyContent: "end",
          marginRight: "5.5rem",
        }}
      >
        <Div style={{ marginRight: "4rem" }}>
          <BoldSmall color="#616161">주문 일자</BoldSmall>
          <SmallMedium color="#616161">
            {new Date(orderSheet.createdAt).toISOString().split("T")[0]}
          </SmallMedium>
        </Div>
        <Div>
          <BoldSmall color="#616161">주문 번호</BoldSmall>
          <SmallMedium color="#616161">
            AP{orderSheet.id.toString().padStart(8, "0")}
          </SmallMedium>
        </Div>
      </DateOrderName>
      <GapH height="48px" />
      <RowContainer
        height="49px"
        width="1020px"
        style={{ justifyContent: "start" }}
      >
        <RowContainer
          width="100%"
          style={{ justifyContent: "left", marginLeft: "1.5rem" }}
        >
          <BoldLarge color="#616161">{orderSheet.businessName}</BoldLarge>
          <GapW width="30px" />
          {orderSheet.status === "픽업 완료" ? (
            <Button
              onClick={() => {
                navigate(`/review/regist/${orderSheet.id}`);
              }}
            >
              <MediumSmall color="white">리뷰 작성</MediumSmall>
            </Button>
          ) : (
            ""
          )}
        </RowContainer>
      </RowContainer>
      <GapH height="3.5rem" />
      <MainContainer
        style={{
          display: "flex",
          marginLeft: "7.5rem",
          marginRight: "7.5rem",
          width: "80%",
        }}
      >
        <LeftSide style={{ width: "50%", lineHeight: "2.5rem" }}>
          <hr
            style={{
              width: "100%",
              height: "1px",
              borderTop: "3px solid #E5E5E5",
            }}
          />
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              금액
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.price}원</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              픽업일
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.pickUpDate}</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              계좌번호
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.account}</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              시트모양
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.sheetShape}</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              호수
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.sheetSize}</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              시트맛
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.sheetTaste}</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              크림맛
            </BoldMediumSmall>
            <MediumSmall color="#616161">{orderSheet.creamTaste}</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              추가 전달사항
            </BoldMediumSmall>
            <MediumSmall
              color="#616161"
              style={{
                width: "60%",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {orderSheet.buyerMessage}
            </MediumSmall>
          </RowContainer>
        </LeftSide>

        <RightSide style={{ width: "50%" }}>
          <Div style={{ display: "flex", marginTop: "1.313rem" }}>
            <button
              type="button"
              style={{
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handlePrev}
            >
              {/* <img src={LeftButton} alt="leftButton" /> */}
            </button>
            <img
              src={
                filteredImages.length > 0
                  ? filteredImages[currentImageIndex].imageFileUri
                  : Temp
              }
              alt="cakeimage"
              style={{ width: "100%", height: "19.75rem" }}
            />
            <button
              type="button"
              style={{
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleNext}
            >
              {/* <img src={RightButton} alt="rightButton" /> */}
            </button>
          </Div>
        </RightSide>
      </MainContainer>
      <RowContainer height="400px" width="1020px" justify="start">
        <GapW width="57px" />
      </RowContainer>
      <GapH height="35px" />
      <hr
        style={{
          width: "1020px",
          borderTop: "3px solid #E5E5E5",
        }}
      />
      <GapH height="32px" />
      <img src={Barcode} alt="barcode" style={{ width: "63.75rem" }} />
      <GapH height="3rem" />
      <RowContainer width="1020px" justify="end">
        <GapH height="4rem" />
        <Button1
          width="8rem"
          onClick={() => {
            dispatch(closeBuyerOrder());
          }}
        >
          닫기
        </Button1>
      </RowContainer>
      <GapH height="40px" />
    </UpDownContainer>
  );
}

export default BuyerOrderModal;
