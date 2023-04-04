/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GapW from "./layout/GapW";
import BoldMedium from "./text/BoldMedium";
import Medium from "./text/Medium";
import Close from "../assets/img/close.png";
import Tmp from "../assets/img/login_image.png";
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

function OrderModal(id) {
  const [currentState, setCurrentState] = useState(null);
  const modalContainerRef = useRef();
  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const { orderSheetId } = id;
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
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
        <img
          style={{
            position: "absolute",
            top: "166px",
            left: "30px",
            width: "251px",
            height: "204px",
            objectFit: "cover",
          }}
          src={Tmp}
          alt="tmp"
        />
        <div style={{ position: "absolute", top: "201px", left: "326px" }}>
          <BoldMedium>seongmin42</BoldMedium>
        </div>
        <div style={{ position: "absolute", top: "289px", left: "326px" }}>
          <Medium>23-03-12 픽업예정</Medium>
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
          <Medium>1473025</Medium>
          <GapW width="21px" />
          <Medium>23-03-03 주문</Medium>
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
            <Medium>1호&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>시트 모양:&nbsp;</Medium>
            <Medium>하트&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>크림:&nbsp;</Medium>
            <Medium>초코&nbsp;</Medium>
            <Medium>|&nbsp;</Medium>
            <Medium>전달사항:&nbsp;</Medium>
            <Medium>Happy Day라고 써주세요</Medium>
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
  );
}

export default OrderModal;
