import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 74.75rem;
  height: 13.188rem;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
`;

const CardImage = styled.img`
  width: 9.25rem;
  height: 9.125rem;
`;

const CardDetail = styled.div``;

const CardDate = styled.div`
  display: flex;
`;

const CakeInfo = styled.div`
  display: flex;
`;
function OrderListCard({
  thumbnail,
  businessName,
  createdAt,
  pickUpDate,
  sheetSize,
  sheetTaste,
  sheetShape,
  situation,
  creamTaste,
}) {
  return (
    <div>
      <Box>
        <CardImage src={thumbnail} alt="orderThumbnail" />
        <CardDetail>
          <div>케이크가게이름{businessName}</div>
          <CardDate>
            <div>
              주문일자
              <div>{createdAt}</div>
            </div>
            <div>
              픽업일자
              <div>{pickUpDate}</div>
            </div>
          </CardDate>
          <CakeInfo>
            <div>2호{sheetSize}</div>
            <div>생크림{sheetTaste}</div>
            <div>원형{sheetShape}</div>
            <div>기념일{situation}</div>
            <div>오레오{creamTaste}</div>
            <div>
              <button type="button">주문상세</button>
              <button type="button">리뷰작성</button>
            </div>
          </CakeInfo>
        </CardDetail>
      </Box>
    </div>
  );
}

export default OrderListCard;
