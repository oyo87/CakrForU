import React, { useEffect } from "react";
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
import Tmp from "../assets/img/login_image.png";
import BoldMediumSmall from "./text/BoldMediumSmall";
import MediumSmall from "./text/MediumSmall";
import LeftButton from "../assets/img/left_button.png";
import RightButton from "../assets/img/right_button.png";
import BoldSmall from "./text/BoldSmall";
import SmallMedium from "./text/SmallMedium";

function BuyerOrderModal() {
  const orderSheet = useSelector((state) => state.modal.buyerOrderSheet);

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

  useEffect(() => {
    console.log(`BuyerOrderModal's orderSheet : ${orderSheet}`);
  }, [orderSheet]);
  const dispatch = useDispatch();
  return (
    <UpDownContainer
      width="75.063rem"
      height="43.688rem"
      align="center"
      position="absolute"
      zIndex="2"
      background="white"
      minHeight="auto"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      boxShadow="0px 0px 100px 20px rgba(0, 0, 0, 0.15)"
    >
      <dateordername
        style={{
          width: "100%",
          display: "flex",
          marginTop: "3.438rem",
          justifyContent: "end",
          marginRight: "5.5rem",
        }}
      >
        <div style={{ marginRight: "4rem" }}>
          <BoldSmall color="#616161">주문 일자</BoldSmall>
          <SmallMedium color="#616161">2023/04/04</SmallMedium>
        </div>
        <div>
          <BoldSmall color="#616161">주문 번호</BoldSmall>
          <SmallMedium color="#616161">AP27849478</SmallMedium>
        </div>
      </dateordername>
      <GapH height="48px" />
      <RowContainer
        height="49px"
        width="1020px"
        style={{ justifyContent: "start" }}
      >
        <RowContainer width="34rem">
          <BoldLarge color="#616161">Fleuve cake</BoldLarge>
          <GapW width="30px" />
          <Button type="button">
            <MediumSmall color="white">리뷰 작성</MediumSmall>
          </Button>
        </RowContainer>
      </RowContainer>
      <GapH height="3.5rem" />
      <maincontainer
        style={{ display: "flex", marginLeft: "7.5rem", marginRight: "7.5rem" }}
      >
        <leftside style={{ width: "50%", lineHeight: "2.5rem" }}>
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
            <MediumSmall color="#616161">56000원</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              픽업일
            </BoldMediumSmall>
            <MediumSmall color="#616161">2023/05/27</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              계좌번호
            </BoldMediumSmall>
            <MediumSmall color="#616161">신한 110-434-264356</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              시트모양
            </BoldMediumSmall>
            <MediumSmall color="#616161">원형</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              호수
            </BoldMediumSmall>
            <MediumSmall color="#616161">1호</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              시트맛
            </BoldMediumSmall>
            <MediumSmall color="#616161">생크림</MediumSmall>
          </RowContainer>
          <RowContainer style={{ justifyContent: "left" }}>
            <BoldMediumSmall color="#616161" style={{ width: "40%" }}>
              크림맛
            </BoldMediumSmall>
            <MediumSmall color="#616161">바닐라</MediumSmall>
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
              레터링 문구 : 싸피 6반 여러분 모두 취뽀하세요!
            </MediumSmall>
          </RowContainer>
        </leftside>

        <rightside style={{ width: "50%" }}>
          <div style={{ display: "flex", marginTop: "1.313rem" }}>
            <button
              type="button"
              style={{
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={LeftButton} alt="leftButton" />
            </button>
            <img
              src={Tmp}
              alt="cakeimage"
              style={{ width: "23.75rem", height: "18.75rem" }}
            />
            <button
              type="button"
              style={{
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={RightButton} alt="rightButton" />
            </button>
          </div>
        </rightside>
      </maincontainer>
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
      <GapH height="30px" />
      <RowContainer width="1020px" justify="end">
        <Button1
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
