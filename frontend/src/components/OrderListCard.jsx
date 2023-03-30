import React from "react";
import moment from "moment";
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
  overflow: overlay; //범위초과시 스크롤
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
  min-width: 80px;
  margin-right: 1rem;
  flex-shrink: 0;
  word-wrap: break-word;
`;
const Button = styled.button`
  display: inline;
  background-color: #ffacac;
  border-radius: 5px;
  border: none;
  margin-right: 1rem;
  width: 11.875rem;
  min-width: 10rem;
  height: 2.8rem;
`;

const CreatedAt = styled.div``;
const PickUpDate = styled.div``;
// const SheetSize = styled.div``;
// const SheetTaste = styled.div``;
// const SheetShape = styled.div``;
// const CreamTaste = styled.div``;

// props;
//
// props.order.id;
function OrderListCard({
  createdAt,
  pickUpDate,
  sheetSize,
  sheetTaste,
  sheetShape,
  creamTaste,
  sellerId,
}) {
  const businessName
  // businessName, // sellerId이용해서 가져옴
  // const navigate = useNavigate();

  // createdAt, pickUpDate format 변경
  const formattedCreatedAt = moment(createdAt).format("YYYY-MM-DD HH:mm:ss");
  const formattedPickUpDate = moment(pickUpDate).format("YYYY-MM-DD HH:mm:ss");
  return (
    <div>
      <Box>
        <CardImage src={임시케이크사진} alt="orderThumbnail" />
        <CardDetail>
          <BoldMedium style={{ marginTop: "1.7rem", marginBottom: "0.5rem" }}>
            신라케이크
          </BoldMedium>
          <CardDate>
            <CreatedAt style={{ marginRight: "9.688rem" }}>
              <BoldSmall style={{ display: "inline", marginRight: "0.5rem" }}>
                주문일자
              </BoldSmall>
              <MediumSmall style={{ display: "inline" }}>
                {formattedCreatedAt}
              </MediumSmall>
            </CreatedAt>
            <PickUpDate>
              <BoldSmall style={{ display: "inline", marginRight: "0.5rem" }}>
                픽업일자
              </BoldSmall>
              <MediumSmall style={{ display: "inline" }}>
                {formattedPickUpDate}
              </MediumSmall>
            </PickUpDate>
          </CardDate>
          <CakeInfo>
            <div style={{ display: "flex", width: "60%" }}>
              <CakeInfoCircle>
                <MediumSmall>{sheetSize}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>{sheetTaste}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>{sheetShape}</MediumSmall>
              </CakeInfoCircle>
              <CakeInfoCircle>
                <MediumSmall>{creamTaste}</MediumSmall>
              </CakeInfoCircle>
              <div style={{ marginRight: "2.375rem" }} />
              {/* 클릭시 모달띄우고 주문상세 보여주기 or 주문 상세 페이지 이동 */}
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
