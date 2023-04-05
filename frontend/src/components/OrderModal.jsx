/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GapW from "./layout/GapW";
import BoldMedium from "./text/BoldMedium";
import Medium from "./text/Medium";
import Close from "../assets/img/close.png";
import Input from "./Input";
import Select from "./Select";
import RowContainer from "./layout/RowContainer";
import Button2 from "./button/Button2";
import MediumSmall from "./text/MediumSmall";
import { closeOrder } from "../store/modalSlice";
import axios from "../util/axiosInstance";

const dict = {
  "주문서 등록": "REGISTRATION",
  "견적서 발송": "SEND",
  "입금 완료": "DEPOSIT_COMPLETE",
  "픽업 완료": "FINISH_PICK_UP",
};

function OrderImage({ orderId }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/image-file/order-sheet/${orderId}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setImageURL(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderId]);

  return (
    <div>
      {imageURL && (
        <img
          src={imageURL}
          alt={`Order ${orderId}`}
          style={{
            position: "absolute",
            top: "166px",
            left: "30px",
            width: "251px",
            height: "204px",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}

function formatDate(data) {
  const dateObj = new Date(data.createdAt);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  if (data.pickUpDate) {
    const pickUpDateObj = new Date(data.pickUpDate);
    const pickUpYear = pickUpDateObj.getFullYear();
    const pickUpMonth = String(pickUpDateObj.getMonth() + 1).padStart(2, "0");
    const pickUpDay = String(pickUpDateObj.getDate()).padStart(2, "0");
    const formattedPickUpDate = `${pickUpYear}-${pickUpMonth}-${pickUpDay}`;
    data.pickUpDate = formattedPickUpDate;
  }

  data.createdAt = formattedDate;
  return data;
}

function OrderModal(id) {
  const [currentState, setCurrentState] = useState(null);
  const [order, setOrder] = useState([]);
  const modalContainerRef = useRef();
  const dispatch = useDispatch();
  const { orderSheetId } = id;

  function fetchOrderSheet() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/order-sheet/${orderSheetId}`)
      .then((res) => {
        const formattedData = formatDate(res.data);
        setOrder(formattedData);
        console.log("ds", order);
        console.log("qq", order.status);
      });
  }

  const handleSelectChange = (event) => {
    setCurrentState(dict[event.value]);
  };

  const handleClickOutside = (event) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(event.target)
    ) {
      dispatch(closeOrder());
    }
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    axios
      .put(`/order-sheet/${orderSheetId}/update_status/${currentState}`)
      .then((response) => {
        console.log(response);
      });
    dispatch(closeOrder());
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      price: event.target[1].value,
      dueDate: event.target[2].value,
      pickUpDate: event.target[3].value,
    };
    console.log(data);
    axios
      .put(`/order-sheet/${orderSheetId}/send_estimation`, data)
      .then((response) => {
        console.log(response);
      });
    axios
      .put(`/order-sheet/${orderSheetId}/update_status/${currentState}`)
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    fetchOrderSheet();
    console.log(order);
    console.log("dsadas", order.status);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return order.status === "REGISTRATION" ? (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          position: "relative",
          border: "2px solid #cccccc",
          width: "1282px",
          height: "844px",
          backgroundColor: "white",
        }}
        ref={modalContainerRef}
      >
        <img
          style={{
            position: "absolute",
            top: "33px",
            right: "37px",
            cursor: "pointer",
          }}
          src={Close}
          alt="close"
          onClick={() => {
            dispatch(closeOrder());
          }}
        />
        <OrderImage orderId={order.id} />
        <div style={{ position: "absolute", top: "201px", left: "326px" }}>
          <BoldMedium>{order.buyerNickName}</BoldMedium>
        </div>
        <div style={{ position: "absolute", top: "289px", left: "326px" }}>
          {order.pickUpDate ? (
            <Medium>{order.pickUpDate} 픽업예정</Medium>
          ) : null}
        </div>
        <div style={{ position: "absolute", top: "102px", left: "881px" }}>
          <Select
            options={["주문서 등록", "견적서 발송", "입금 완료", "픽업 완료"]}
            width="251px"
            onChange={handleSelectChange}
          />
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "51px",
            left: "20px",
          }}
        >
          <Medium>{order.id}</Medium>
          <GapW width="21px" />
          <Medium>{order.createdAt} 주문</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "51px",
            left: "881px",
          }}
        >
          <BoldMedium>주문상태</BoldMedium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "434px",
            left: "36px",
          }}
        >
          <RowContainer justify="start">
            <Medium>호수:&nbsp;</Medium>
            <Medium>{order.sheetSize}&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>시트 모양:&nbsp;</Medium>
            <Medium>{order.sheetShape}&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>크림:&nbsp;</Medium>
            <Medium>{order.creamTaste}&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>전달사항:&nbsp;</Medium>
            <Medium>{order.buyerMessage}</Medium>
          </RowContainer>
        </div>
        <div
          style={{
            position: "absolute",
            top: "550px",
            left: "80px",
          }}
        >
          <Medium>가격</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "650px",
            left: "80px",
          }}
        >
          <Medium>입금 마감 날짜</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "537px",
            left: "352px",
          }}
        >
          <Input />
        </div>
        <div
          style={{
            position: "absolute",
            top: "551px",
            left: "852px",
          }}
        >
          <Medium>원</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "640px",
            left: "352px",
          }}
        >
          <Input />
        </div>
        <div
          style={{
            position: "absolute",
            top: "750px",
            left: "80px",
          }}
        >
          <Medium>픽업일</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "743px",
            left: "352px",
          }}
        >
          <Input />
        </div>
        <div
          style={{
            position: "absolute",
            top: "760px",
            left: "1058px",
          }}
        >
          <Button2 type="submit">
            <MediumSmall color="white">전송</MediumSmall>
          </Button2>
        </div>
      </div>
    </form>
  ) : (
    <form onSubmit={handleSubmit2}>
      <div
        style={{
          position: "relative",
          border: "2px solid #cccccc",
          width: "1282px",
          height: "844px",
          backgroundColor: "white",
        }}
        ref={modalContainerRef}
      >
        <img
          style={{
            position: "absolute",
            top: "33px",
            right: "37px",
            cursor: "pointer",
          }}
          src={Close}
          alt="close"
          onClick={() => {
            dispatch(closeOrder());
          }}
        />
        <OrderImage orderId={order.id} />
        <div style={{ position: "absolute", top: "201px", left: "326px" }}>
          <BoldMedium>{order.buyerNickName}</BoldMedium>
        </div>
        <div style={{ position: "absolute", top: "289px", left: "326px" }}>
          {order.pickUpDate ? (
            <Medium>{order.pickUpDate} 픽업예정</Medium>
          ) : null}
        </div>
        <div style={{ position: "absolute", top: "102px", left: "881px" }}>
          <Select
            options={["주문서 등록", "견적서 발송", "입금 완료", "픽업 완료"]}
            width="251px"
            onChange={handleSelectChange}
          />
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "51px",
            left: "20px",
          }}
        >
          <Medium>{order.id}</Medium>
          <GapW width="21px" />
          <Medium>{order.createdAt} 주문</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "51px",
            left: "881px",
          }}
        >
          <BoldMedium>주문상태</BoldMedium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "434px",
            left: "36px",
          }}
        >
          <RowContainer justify="start">
            <Medium>호수:&nbsp;</Medium>
            <Medium>{order.sheetSize}&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>시트 모양:&nbsp;</Medium>
            <Medium>{order.sheetShape}&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>크림:&nbsp;</Medium>
            <Medium>{order.creamTaste}&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>전달사항:&nbsp;</Medium>
            <Medium>{order.buyerMessage}</Medium>
          </RowContainer>
        </div>
        <div
          style={{
            position: "absolute",
            top: "550px",
            left: "80px",
          }}
        >
          <Medium>가격</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "650px",
            left: "80px",
          }}
        >
          <Medium>입금 마감 날짜</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "537px",
            left: "352px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "551px",
            left: "352px",
          }}
        >
          <Medium>{order.price} 원</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "650px",
            left: "352px",
          }}
        >
          <Medium>{order.dueDate}</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "750px",
            left: "80px",
          }}
        >
          <Medium>픽업일</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "750px",
            left: "352px",
          }}
        >
          <Medium>{order.pickUpDate}</Medium>
        </div>
        <div
          style={{
            position: "absolute",
            top: "760px",
            left: "1058px",
          }}
        >
          <Button2 type="submit">
            <MediumSmall color="white">전송</MediumSmall>
          </Button2>
        </div>
      </div>
    </form>
  );
}

export default OrderModal;
