import React, { useEffect } from "react";
// import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import UpDownContainer from "./layout/UpDownContainer";
import RowContainer from "./layout/RowContainer";
import GapH from "./layout/GapH";
import GapW from "./layout/GapW";
import BoldLarge from "./text/BoldLarge";
import Small from "./text/Small";
import ColContainer from "./layout/ColContainer";
import BoldSmall from "./text/BoldSmall";
import Button1 from "./button/Button1";
import { closePortfolio } from "../store/modalSlice";
import Logo2 from "../assets/img/logo2.png";

function PortfolioModal({
  shape,
  sheetTaste,
  color,
  creamTaste,
  size,
  title,
  detail,
  imgUrl,
}) {
  const portfolio = useSelector((state) => state.modal.portfolio);
  useEffect(() => {
    console.log(portfolio);
  }, [portfolio]);
  const dispatch = useDispatch();
  return (
    <UpDownContainer
      width="1201px"
      height="699px"
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
      <GapH height="48px" />
      <RowContainer height="49px" width="1020px">
        <RowContainer width="384px" height="100%" justify="start">
          <BoldLarge>Fleuve cake</BoldLarge>
        </RowContainer>
        <div
          style={{
            flexGrow: 1,
          }}
        />
        <RowContainer width="384px" height="100%" align="end" justify="end">
          <Small>조회수</Small>
          <GapW width="5px" />
          <Small>32</Small>
          <GapW width="22px" />
          <Small>2323/05/27</Small>
          <GapW width="5px" />
        </RowContainer>
      </RowContainer>
      <GapH height="21px" />
      <hr
        style={{
          width: "1020px",
          borderTop: "3px solid #E5E5E5",
        }}
      />
      <GapH height="35px" />
      <RowContainer height="400px" width="1020px" justify="start">
        <ColContainer width="400px">
          <img
            src={imgUrl[0]}
            alt="img"
            style={{
              width: "400px",
              height: "400px",
              objectFit: "cover",
            }}
          />
        </ColContainer>
        <GapW width="57px" />
        <ColContainer height="400px" width="563px" justify="start" align="end">
          <RowContainer width="541px">
            <ColContainer width="135px" height="94px" align="start" gap="23px">
              <BoldSmall color="#616161">시트모양</BoldSmall>
              <BoldSmall color="#616161">시트맛</BoldSmall>
              <BoldSmall color="#616161">색깔</BoldSmall>
            </ColContainer>
            <ColContainer width="135px" height="94px" align="start" gap="23px">
              <Small color="#616161">{shape}</Small>
              <Small color="#616161">{sheetTaste}</Small>
              <Small color="#616161">{color}</Small>
            </ColContainer>
            <ColContainer width="135px" height="94px" align="start" gap="23px">
              <BoldSmall color="#616161">크림맛</BoldSmall>
              <BoldSmall color="#616161">호수</BoldSmall>
              <BoldSmall color="#616161">금액</BoldSmall>
            </ColContainer>
            <ColContainer width="135px" height="94px" align="start" gap="23px">
              <Small color="#616161">{creamTaste}</Small>
              <Small color="#616161">{size}</Small>
              <Small color="#616161">{title}</Small>
            </ColContainer>
          </RowContainer>
          <GapH height="30px" />
          <RowContainer width="541px" justify="start">
            <ColContainer width="135px" align="start" justify="start">
              <BoldSmall color="#616161">Detail</BoldSmall>
            </ColContainer>
            <ColContainer width="375px" align="start">
              <Small color="#616161">{detail}</Small>
            </ColContainer>
          </RowContainer>
          <div style={{ flexGrow: 1 }} />
          <RowContainer gap="34px">
            <img
              src={imgUrl[1] ? imgUrl[1] : Logo2}
              alt="img"
              style={{
                width: "165px",
                height: "165px",
                objectFit: "cover",
              }}
            />
            <img
              src={imgUrl[2] ? imgUrl[2] : Logo2}
              alt="img"
              style={{
                width: "165px",
                height: "165px",
                objectFit: "cover",
              }}
            />
            <img
              src={imgUrl[3] ? imgUrl[3] : Logo2}
              alt="img"
              style={{
                width: "165px",
                height: "165px",
                objectFit: "cover",
              }}
            />
          </RowContainer>
        </ColContainer>
      </RowContainer>
      <GapH height="35px" />
      <hr
        style={{
          width: "1020px",
          borderTop: "3px solid #E5E5E5",
        }}
      />
      <GapH height="30px" />
      <RowContainer width="1020px" justify="end">
        <Button1
          onClick={() => {
            dispatch(closePortfolio());
          }}
        >
          닫기
        </Button1>
      </RowContainer>
      <GapH height="40px" />
    </UpDownContainer>
  );
}

export default PortfolioModal;
