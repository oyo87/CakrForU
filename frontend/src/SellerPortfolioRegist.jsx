import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "./util/axiosInstance";
import ColContainer from "./components/layout/ColContainer";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import Medium from "./components/text/Medium";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import UpDownContainer from "./components/layout/UpDownContainer";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import Select from "./components/Select";
import Button4 from "./components/button/Button4";

const Text = styled.textarea`
  width: 542px;
  height: 230px;
  border: 1px solid #d8d8d8;
  padding-left: 20px;
  padding-top: 20px;
`;

function SellerPortfolioRegist() {
  const SELLER_ID = 100; //  임시 가게 id ,가게 id를 리덕스로 관리할 수 있어야 할터
  const [dict, setDict] = useState({});
  const [gender, setGender] = useState("");
  const [situation, setSituation] = useState("");
  const [ageGroup, setAgeGroup] = useState("20");
  const [size, setSize] = useState("");
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("");
  const [sheetTaste, setSheetTaste] = useState("");
  const [creamTaste, setCreamTaste] = useState("");
  const [detail, setDetail] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    setDict({
      여성: "F",
      남성: "M",
      아이돌: "IDOL",
      "입/퇴사": "COMPANY",
      환갑: "SIXTIETH",
      생일: "BIRTHDAY",
      기념일: "ANNIVERSARY",
      결혼: "MARRIAGE",
      전역: "DISCHARGE",
      크리스마스: "CHRISTMAS",
      기타: "ETC",
      "1호": "NO1",
      "2호": "NO2",
      "3호": "NO3",
      미니: "MINI",
      원형: "CIRCLE",
      하트: "HEART",
      사각형: "RECTANGLE",
      입체: "OTHERS",
      빨강: "RED",
      분홍: "PINK",
      주황: "ORANGE",
      노랑: "YELLOW",
      초록: "GREEN",
      파랑: "BLUE",
      보라: "PURPLE",
      검정: "BLACK",
      하양: "WHITE",
      파스텔: "PASTEL",
      프린팅: "PRINTING",
      바닐라: "VANILLA",
      초콜릿: "CHOCOLATE",
      얼그레이: "EARL_GRAY",
      레드벨벳: "RED_VELVET",
      말차: "MATCHA",
      모카: "MOCHA",
      치즈: "CHEESE",
      당근: "CARROT",
      고구마: "SWEET_POTATO",
      크림치즈: "CREAM_CHEESE",
      휘핑크림: "WHIPPING_CREAM",
      초콜릿크림: "CHOCOLATE_CREAM",
      오레오크림: "OREO_CREAM",
      말차크림: "MATCHA_CREAM",
      흑임자크림: "BLACK_SESAME_CREAM",
      고구마무스: "SWEET_POTATO_CREAM",
      얼그레이크림: "EARL_GRAY_CREAM",
      딸기크림: "STRAWBERRY_CREAM",
    });
  }, []);

  const handleGender = (event) => {
    setGender(dict[event.value]);
  };

  const handleSituation = (event) => {
    setSituation(dict[event.value]);
  };

  const handleAgeGroup = (event) => {
    setAgeGroup(event.value);
  };

  const handleSize = (event) => {
    setSize(dict[event.value]);
  };

  const handleShape = (event) => {
    setShape(dict[event.value]);
  };

  const handleColor = (event) => {
    setColor(dict[event.value]);
  };

  const handleSheetTaste = (event) => {
    setSheetTaste(dict[event.value]);
  };

  const handleCreamTaste = (event) => {
    setCreamTaste(dict[event.value]);
  };

  const handleDetail = (event) => {
    setDetail(event.target.value);
  };

  const handleImageFiles = (event) => {
    setImageFiles(event.target.files);
  };

  const handleSubmit = async () => {
    const VO = {
      sellerId: SELLER_ID,
      gender,
      situation,
      ageGroup,
      size,
      shape,
      color,
      sheetTaste,
      creamTaste,
      detail,
    };

    // console.log("VO = ", VO);

    const formSendData = new FormData();
    for (let i = 0; i < imageFiles.length; i += 1)
      formSendData.append("files", imageFiles[i]);
    formSendData.append("portfolioSaveDtoString", JSON.stringify(VO));

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post(`/portfolio`, formSendData, config)
      .then((response) => {
        console.log("response : ", response);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  return (
    <div>
      <Header />
      <UpDownContainer>
        <LeftRightContainer>
          <ColContainer width="276px">
            <SellerSide />
            <GapH height="89px" />
          </ColContainer>
          <ColContainer gap="34px">
            <GapH height="35px" />
            <RowContainer justify="start" height="121px">
              <BoldLarge>라니케이크</BoldLarge>
            </RowContainer>
            <RowContainer justify="start">
              <BoldSmallMedium>포트폴리오 등록</BoldSmallMedium>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>구매자 성별</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={["여성", "남성"]}
                  onChange={handleGender}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>

            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>구매자 상황</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={[
                    "아이돌",
                    "입/퇴사",
                    "환갑",
                    "생일",
                    "기념일",
                    "결혼 케이크",
                    "전역",
                    "크리스마스",
                    "기타",
                  ]}
                  onChange={handleSituation}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>구매자 연령대</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={[
                    "10",
                    "20",
                    "30",
                    "40",
                    "50",
                    "60",
                    "70",
                    "80",
                    "90",
                    "100",
                  ]}
                  onChange={handleAgeGroup}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>호수</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={["1호", "2호", "3호", "미니"]}
                  onChange={handleSize}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>시트 모양</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={["원형", "하트", "사각형", "입체"]}
                  onChange={handleShape}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>메인 컬러</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={[
                    "빨강",
                    "분홍",
                    "주황",
                    "노랑",
                    "초록",
                    "파랑",
                    "보라",
                    "검정",
                    "하양",
                    "파스텔",
                    "프린팅",
                  ]}
                  onChange={handleColor}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>시트맛</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={[
                    "바닐라",
                    "초콜릿",
                    "얼그레이",
                    "레드벨벳",
                    "말차",
                    "모카",
                    "치즈",
                    "당근",
                    "고구마",
                  ]}
                  height="48px"
                  onChange={handleSheetTaste}
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>크림맛</Medium>
              </ColContainer>
              <RowContainer align="start" width="280px" height="100%">
                <Select
                  options={[
                    "크림치즈",
                    "휘핑크림",
                    "초콜릿크림",
                    "오레오크림",
                    "말차크림",
                    "흑임자크림",
                    "고구마무스",
                    "얼그레이크림",
                    "딸기크림",
                  ]}
                  onChange={handleCreamTaste}
                  height="48px"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>이미지 첨부</Medium>
              </ColContainer>
              <GapH height="18px" />

              <RowContainer justify="start">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleImageFiles(event)}
                  className="hidden"
                  id="file"
                />
              </RowContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer align="start" width="200px">
                <Medium>케이크 설명</Medium>
                <GapH height="18px" />
                <Text onChange={handleDetail} />
                <GapH height="32px" />
              </ColContainer>
              {/* <RowContainer align="start" width="280px" height="100%">
                <Select options={["선택", "선택", "선택"]} height="48px" />
              </RowContainer> */}
            </RowContainer>

            <Button4
              width="378px"
              height="115px"
              onClick={() => {
                handleSubmit();
              }}
            >
              <BoldLarge fontsize="40px" color="white">
                주문하기
              </BoldLarge>
            </Button4>
          </ColContainer>
        </LeftRightContainer>
      </UpDownContainer>
    </div>
  );
}

export default SellerPortfolioRegist;
