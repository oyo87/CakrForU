import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "./util/axiosInstance";
import Select from "./components/Select";
import Header from "./components/Header";
import Input from "./components/Input";
import ColContainer from "./components/layout/ColContainer";
import RowContainer from "./components/layout/RowContainer";
import MediumSmall from "./components/text/MediumSmall";
import GapH from "./components/layout/GapH";
import GapW from "./components/layout/GapW";
import BoldLarge from "./components/text/BoldLarge";
import SampleImage from "./assets/img/logo2.png";
import StarOn from "./assets/img/StarOn.png";
import StarOff from "./assets/img/StarOff.png";
import Button1 from "./components/button/Button1";

function ReviewRegist() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [cakeStore, setCakeStore] = useState([]);
  const [imageSrc, setImageSrc] = useState([null, null, null, null]);
  const [rating, setRating] = useState(5);
  const [imageFiles, setImageFiles] = useState([SampleImage]);
  const onArr = [...Array(rating).keys()];
  const offArr = [...Array(5 - rating).keys()];

  const encodeFileToBase64 = (fileBlob) => {
    setImageFiles(fileBlob.files);
    const uploadFile = Array.from(fileBlob);
    const answer = [];
    uploadFile.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          answer.push(reader.result);
          resolve();
        };
      });
    });
    setImageSrc(answer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewVO = {
      reviewContent: e.target[2].value,
      reviewRating: rating,
    };
    const strDto = JSON.stringify(reviewVO);

    const formSendData = new FormData();
    for (let i = 0; i < imageFiles.length; i += 1)
      formSendData.append("files", imageFiles[i]);
    formSendData.append("orderSheetReviewVOString", strDto);
    formSendData.append("orderSheetId", orderId);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/order-sheet/${orderId}`,
        formSendData,
        config
      )
      .then((res) => {
        setCakeStore(res.data);
      });

    navigate("/store/".concat(String(cakeStore.id)));
  };

  const handleReviewRate = (e) => {
    setRating(e.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/info/${orderId}`)
      .then((res) => {
        setCakeStore(res.data);
      });
  }, [imageSrc]);

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
          {imageSrc[0] ? (
            <img
              width="500px"
              height="400px"
              src={imageSrc[0]}
              alt="preview-img"
            />
          ) : (
            <img
              width="500px"
              height="400px"
              src={SampleImage}
              alt="preview-img"
            />
          )}
          <GapH />
          <RowContainer justify="start">
            {imageSrc
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
        <form onSubmit={handleSubmit}>
          <RowContainer justify="space-between">
            <RowContainer justify="start">
              <Select
                width="120px"
                height="40px"
                options={[1, 2, 3, 4, 5]}
                value={rating}
                onChange={handleReviewRate}
                placeholder="점수"
              />
              <GapW width="30px" />
              {onArr.map(() => (
                <img src={StarOn} alt="starOn" style={{ marginRight: "5px" }} />
              ))}
              {offArr.map(() => (
                <img
                  src={StarOff}
                  alt="starOff"
                  style={{ marginRight: "5px" }}
                />
              ))}
            </RowContainer>
            <input
              type="file"
              onChange={(e) => {
                encodeFileToBase64(e.target.files);
              }}
              accept="image/*"
              multiple
            />
          </RowContainer>
          <GapH height="10px" />
          <ColContainer gap="30px">
            <Input
              width="684px"
              height="396px"
              borderRadius="10px"
              borderColor="#B8B8B8"
            />
            <RowContainer justify="end" gap="30px">
              <Button1 width="150px" background="#E0E0E0">
                취소
              </Button1>
              <Button1 width="150px">등록</Button1>
            </RowContainer>
          </ColContainer>
        </form>
      </RowContainer>
      <GapH height="50px" />
    </div>
  );
}

export default ReviewRegist;
