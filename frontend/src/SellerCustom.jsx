import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "./util/axiosInstance";
import ColContainer from "./components/layout/ColContainer";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import Header from "./components/Header";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldSmallMedium from "./components/text/BoldSmallMedium";
import BoldMediumSmall from "./components/text/BoldMediumSmall";
import Small from "./components/text/Small";
import UpDownContainer from "./components/layout/UpDownContainer";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import SellerSide from "./components/SellerSide";
import Button1 from "./components/button/Button1";

function SellerCustom() {
  const seller = useSelector((state) => state.login.user);
  const navigate = useNavigate();

  const [sheetShape, setSheetShape] = useState(false);
  const [sheetSize, setSheetSize] = useState(false);
  const [sheetTaste, setSheetTaste] = useState(false);
  const [creamTaste, setCreamTaste] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/form/${seller.id}`)
      .then((res) => {
        console.log(res.data);
        setSheetShape(res.data.sheetShape);
        setSheetTaste(res.data.sheetTaste);
        setSheetSize(res.data.sheetSize);
        setCreamTaste(res.data.creamTaste);
      });

    console.log("sheetShape = ", sheetShape);
  }, []);

  const handleSubmit = () => {
    const data = { sheetShape, sheetSize, sheetTaste, creamTaste };
    console.log();

    axios.put("/seller/custom/update", data).then((res) => {
      console.log(res);
    });
  };

  function handleShape(shape) {
    setSheetShape((prev) => ({
      ...prev,
      [shape]: !prev[shape],
    }));
  }
  function handleSize(size) {
    setSheetSize((prev) => ({
      ...prev,
      [size]: !prev[size],
    }));
  }
  function handleTaste(taste) {
    setSheetTaste((prev) => ({
      ...prev,
      [taste]: !prev[taste],
    }));
  }
  function handleCream(cream) {
    setCreamTaste((prev) => ({
      ...prev,
      [cream]: !prev[cream],
    }));
  }

  const navigateToBack = () => {
    navigate(-1);
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
          <ColContainer>
            <GapH height="89px" />
            <RowContainer justify="start" height="121px">
              <BoldLarge>라니케이크</BoldLarge>
            </RowContainer>
            <GapH height="50px" />
            <ColContainer>
              <GapW width="69px" />
              <UpDownContainer>
                <ColContainer align="start">
                  <BoldSmallMedium>주문서 커스텀</BoldSmallMedium>
                  <GapH height="50px" />
                </ColContainer>
                <ColContainer height="119px" width="581px">
                  <RowContainer justify="start">
                    <GapW width="16px" />
                    <BoldMediumSmall>시트 모양 선택</BoldMediumSmall>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={sheetShape.circle ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleShape("circle");
                      }}
                    >
                      <Small color="white">원형</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetShape.heart ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleShape("heart");
                      }}
                    >
                      <Small color="white">하트</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetShape.rectangle ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleShape("rectangle");
                      }}
                    >
                      <Small color="white">사각</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetShape.others ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleShape("others");
                      }}
                    >
                      <Small color="white">입체</Small>
                    </Button1>
                  </RowContainer>
                </ColContainer>
                <GapH height="18px" />
                <ColContainer height="119px" width="581px">
                  <RowContainer justify="start">
                    <GapW width="16px" />
                    <BoldMediumSmall>호수 선택</BoldMediumSmall>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={sheetSize.mini ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleSize("mini");
                      }}
                    >
                      <Small color="white">미니</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetSize.no1 ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleSize("no1");
                      }}
                    >
                      <Small color="white">1호</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetSize.no2 ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleSize("no2");
                      }}
                    >
                      <Small color="white">2호</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetSize.no3 ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleSize("no3");
                      }}
                    >
                      <Small color="white">3호</Small>
                    </Button1>
                  </RowContainer>
                </ColContainer>
                <GapH height="18px" />
                <ColContainer height="246px" width="581px">
                  <RowContainer justify="start">
                    <GapW width="16px" />
                    <BoldMediumSmall>시트 맛 선택</BoldMediumSmall>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={sheetTaste.vanilla ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("vanilla");
                      }}
                    >
                      <Small color="white">바닐라</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetTaste.chocolate ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("chocolate");
                      }}
                    >
                      <Small color="white">초코</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetTaste.earl_gray ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("earl_gray");
                      }}
                    >
                      <Small color="white">얼그레이</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetTaste.red_velvet ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("red_velvet");
                      }}
                    >
                      <Small color="white">레드벨벳</Small>
                    </Button1>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={sheetTaste.matcha ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("matcha");
                      }}
                    >
                      <Small color="white">말차</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetTaste.mocha ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("mocha");
                      }}
                    >
                      <Small color="white">모카</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetTaste.cheese ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("cheese");
                      }}
                    >
                      <Small color="white">치즈</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={sheetTaste.carrot ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("carrot");
                      }}
                    >
                      <Small color="white">당근</Small>
                    </Button1>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={sheetTaste.sweet_potato ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleTaste("sweet_potato");
                      }}
                    >
                      <Small color="white">고구마</Small>
                    </Button1>
                    <GapW width="124px" />
                    <GapW width="124px" />
                    <GapW width="124px" />
                  </RowContainer>
                </ColContainer>
                <GapH height="18px" />
                <ColContainer height="193px" width="581px">
                  <RowContainer justify="start">
                    <GapW width="16px" />
                    <BoldMediumSmall>크림 맛 선택</BoldMediumSmall>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={creamTaste.cream_cheese ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleCream("cream_cheese");
                      }}
                    >
                      <Small color="white">크림치즈</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={
                        creamTaste.chocolate_cream ? "#FFACAC" : "grey"
                      }
                      onClick={() => {
                        handleCream("chocolate_cream");
                      }}
                    >
                      <Small color="white">초코크림</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={creamTaste.oreo_cream ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleCream("oreo_cream");
                      }}
                    >
                      <Small color="white">오레오크림</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={creamTaste.matcha_cream ? "#FFACAC" : "grey"}
                      onClick={() => {
                        handleCream("matcha_cream");
                      }}
                    >
                      <Small color="white">말차크림</Small>
                    </Button1>
                  </RowContainer>
                  <GapH height="18px" />
                  <RowContainer gap="19px">
                    <Button1
                      width="124px"
                      background={
                        creamTaste.blackSesame_cream ? "#FFACAC" : "grey"
                      }
                      onClick={() => {
                        handleCream("blackSesame_cream");
                      }}
                    >
                      <Small color="white">흑임자크림</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={
                        creamTaste.sweet_potato_cream ? "#FFACAC" : "grey"
                      }
                      onClick={() => {
                        handleCream("sweet_potato_cream");
                      }}
                    >
                      <Small color="white">고구마무스</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={
                        creamTaste.earl_gray_cream ? "#FFACAC" : "grey"
                      }
                      onClick={() => {
                        handleCream("earl_gray_cream");
                      }}
                    >
                      <Small color="white">얼그레이</Small>
                    </Button1>
                    <Button1
                      width="124px"
                      background={
                        creamTaste.strawberry_cream ? "#FFACAC" : "grey"
                      }
                      onClick={() => {
                        handleCream("strawberry_cream");
                      }}
                    >
                      <Small color="white">딸기크림</Small>
                    </Button1>
                  </RowContainer>
                </ColContainer>
                <ColContainer>
                  <RowContainer justify="end">
                    <Button1 onClick={navigateToBack}>
                      <Small color="white">뒤로</Small>
                    </Button1>
                    <GapW width="20px" />
                    <Button1 onClick={handleSubmit}>
                      <Small color="white">등록</Small>
                    </Button1>
                    <GapW width="13px" />
                  </RowContainer>
                </ColContainer>
                <ColContainer>
                  <GapW width="200px" />
                </ColContainer>
              </UpDownContainer>
            </ColContainer>
          </ColContainer>
        </LeftRightContainer>
      </UpDownContainer>
    </div>
  );
}

export default SellerCustom;
