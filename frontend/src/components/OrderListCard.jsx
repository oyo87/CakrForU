import React from "react";
import styled from "styled-components";
import 임시케이크사진 from "../assets/img/login_image.png";
import BoldSmall from "./text/BoldSmall";
import MediumSmall from "./text/MediumSmall";
import BoldMedium from "./text/BoldMedium";

const Box = styled.div`
  width: 100%;
  height: 13.188rem;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  margin-bottom: 0.688rem;
`;

const CardImage = styled.img`
  width: 9.25rem;
  height: 9.125rem;
  margin: 30px;
  border-radius: 5px;
`;

const CardDetail = styled.div`
  width: 100%;
`;

const CardDate = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;

const CakeInfo = styled.div`
  display: flex;
`;

const CakeInfoCircle = styled.span`
  background-color: #fff5e4;
  border-radius: 90px;
  height: 2.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  margin-right: 1rem;
`;
const Button = styled.button`
  display: inline;
  background-color: #ffacac;
  border-radius: 5px;
  border: none;
  margin-right: 1rem;
  width: 11.875rem;
  height: 2.8rem;
`;

const CreatedAt = styled.div``;
const PickUpDate = styled.div``;
// const SheetSize = styled.div``;
// const SheetTaste = styled.div``;
// const SheetShape = styled.div``;
// const Situation = styled.div``;
// const CreamTaste = styled.div``;

function OrderListCard(
  props,
  {
    // thumbnail,
    businessName, // sellerId이용해서 가져옴
    createdAt,
    pickUpDate,
    sheetSize,
    sheetTaste,
    sheetShape,
    situation,
    creamTaste,
  }
) {
  // const navigate = useNavigate();

  return (
    <div>
      <Box>
        <CardImage src={임시케이크사진} alt="orderThumbnail" />
        <CardDetail>
          <BoldMedium style={{ marginTop: "1.7rem", marginBottom: "0.5rem" }}>
            신라케이크{businessName}
          </BoldMedium>
          <CardDate>
            <CreatedAt style={{ marginRight: "9.688rem" }}>
              <BoldSmall style={{ display: "inline", marginRight: "0.5rem" }}>
                주문일자
              </BoldSmall>
              <MediumSmall style={{ display: "inline" }}>
                2023-03-27 09:10{createdAt}
              </MediumSmall>
            </CreatedAt>
            <PickUpDate>
              <BoldSmall style={{ display: "inline", marginRight: "0.5rem" }}>
                픽업일자
              </BoldSmall>
              <MediumSmall style={{ display: "inline" }}>
                2023-03-29 15:00{pickUpDate}
              </MediumSmall>
            </PickUpDate>
          </CardDate>
          <CakeInfo>
            <div style={{ display: "flex", width: "60%" }}>
              <CakeInfoCircle>
                <MediumSmall>2호{sheetSize}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>생크림{sheetTaste}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>원형{sheetShape}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>기념일{situation}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>오레오크림{creamTaste}</MediumSmall>
              </CakeInfoCircle>
            </div>
            <div>
              {/* 클릭시 모달띄우기 */}
              <Button type="button">
                <MediumSmall color="white">주문 상세</MediumSmall>
              </Button>
              {/* 픽업 완료되었을때만 보여주기 */}
              <Button type="button">
                <MediumSmall color="white">리뷰 작성</MediumSmall>
              </Button>
            </div>
          </CakeInfo>
        </CardDetail>
      </Box>
    </div>
  );
}

export default OrderListCard;
