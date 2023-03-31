import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "./util/axiosInstance";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import GoBack from "./assets/img/go_back.png";
import GapH from "./components/layout/GapH";
import GapW from "./components/layout/GapW";
import RowContainer from "./components/layout/RowContainer";
import BoldLarge from "./components/text/BoldLarge";
import BoldMediumSmall from "./components/text/BoldMediumSmall";
import Button1 from "./components/button/Button1";
import Button4 from "./components/button/Button4";
import Small from "./components/text/Small";
import Large from "./components/text/Large";
import AddFile from "./assets/img/add_file.png";

const Text = styled.textarea`
  width: 542px;
  height: 230px;
  border: 1px solid #d8d8d8;
  padding-left: 20px;
  padding-top: 20px;
`;
const FileButton = styled.img`
  cursor: pointer;
`;

function MakeOrder() {
  const SELLER_ID = 100; //  임시 가게 id ,가게 id를 리덕스로 관리할 수 있어야 할터

  const [sellerSheetShape, setSellerSheetShape] = useState([]); //  가게에서 다루는 케이크 재료 정보들
  const [sellerSheetSize, setSellerSheetSize] = useState([]);
  const [sellerSheetTaste, setSellerSheetTaste] = useState([]);
  const [sellerCreamTaste, setSellerCreamTaste] = useState([]);

  const [imageSrcs, setImageSrcs] = useState([]);
  const [sheetShape, setSheetShape] = useState(null); //  선택된 것들 저장
  const [sheetSize, setSheetSize] = useState(null);
  const [sheetTaste, setSheetTaste] = useState(null);
  const [creamTaste, setCreamTaste] = useState(null);

  useEffect(() => {
    // console.log("렌더링됨!!");
    // console.log("가게 이름", SELLER_ID);

    axios
      .get(`/seller/form/${SELLER_ID}`)
      .then((response) => {
        console.log("ok!!!!");
        console.log("response.data = ", response.data);
        const tmp1 = Object.entries(response.data.sheetShape);
        const filtered1 = tmp1.filter(([, ok]) => ok === true);
        const tmp2 = Object.entries(response.data.sheetSize);
        const filtered2 = tmp2.filter(([, ok]) => ok === true);
        const tmp3 = Object.entries(response.data.sheetTaste);
        const filtered3 = tmp3.filter(([, ok]) => ok === true);
        const tmp4 = Object.entries(response.data.creamTaste);
        const filtered4 = tmp4.filter(([, ok]) => ok === true);

        setSellerSheetShape(Object.entries(filtered1));
        setSellerSheetSize(Object.entries(filtered2));
        setSellerSheetTaste(Object.entries(filtered3));
        setSellerCreamTaste(Object.entries(filtered4));
        console.log(sheetSize);
      })
      .catch((error) => {
        console.log("Error!!!!!!");
        console.log(error);
      });
  }, []);

  //  버튼 클릭으로 선택 저장
  const handleShape = (shape) => {
    setSheetShape(shape);
  };
  const handleSize = (size) => {
    setSheetSize(size);
  };
  const handleTaste = (taste) => {
    setSheetTaste(taste);
  };
  const handleCream = (cream) => {
    setCreamTaste(cream);
  };

  const handleDiffusion = () => {
    const promptParts = ["LETTERING CAKE"];
    if (sheetShape) {
      promptParts.push(sheetShape.toUpperCase());
    }
    if (sheetTaste) {
      promptParts.push(sheetTaste.toUpperCase());
    }
    if (creamTaste) {
      promptParts.push(creamTaste.toUpperCase());
    }
    const finalPrompt = promptParts.join(", ");

    // prompt: "LETTERING CAKE, RED, CREAM_CHEESE, CIRCLE, VANILLA",
    axios
      .post("/sdapi/v1/txt2img", {
        prompt: finalPrompt,
        steps: 20,
        sampler_index: "Euler a",
      })
      .then((res) => {
        const imageData = res.data.images[0];
        const imageUrl = `data:image/png;base64,${imageData}`;
        setImageSrcs((prevImageSrcs) => [...prevImageSrcs, imageUrl]);
      });
  };

  return (
    <div>
      <Header />
      <LeftRightContainer background="#F5F2EF">
        <ColContainer width="468px">
          <GapH height="140px" />
          <RowContainer justify="end">
            <img
              src={GoBack}
              alt="img"
              style={{
                width: "50px",
              }}
            />
            <GapW width="41px" />
          </RowContainer>
        </ColContainer>
        <ColContainer width="581px" align="start">
          <GapH height="137px" />
          <BoldLarge>주문서 작성</BoldLarge>
          <GapH height="37px" />
          <RowContainer justify="start">
            <Button1 width="226px">
              <Small color="white">픽업일 선택</Small>
            </Button1>
            <GapW width="38px" />
            <Small>2023.04.01</Small>
          </RowContainer>
          <GapH height="33px" />
          <ColContainer height="119px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>시트 모양 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerSheetShape.map((element) => (
                <Button1
                  background={
                    sheetShape === element[1][0].toUpperCase()
                      ? "#FFACAC"
                      : "grey"
                  }
                  onClick={() => {
                    handleShape("RECTANGLE");
                    console.log("클릭");
                  }}
                >
                  {element[1][0]}
                </Button1>
              ))}
            </RowContainer>
          </ColContainer>
          <GapH height="18px" />
          <ColContainer height="119px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>호수 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerSheetSize.map((element) => (
                <Button1
                  onClick={() => {
                    handleSize("RECTANGLE");
                    console.log("클릭");
                  }}
                >
                  {element[1][0]}
                </Button1>
              ))}
            </RowContainer>
          </ColContainer>
          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>시트 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerSheetTaste.map((element) => (
                <Button1
                  onClick={() => {
                    handleTaste("RECTANGLE");
                    console.log("클릭");
                  }}
                >
                  {element[1][0]}
                </Button1>
              ))}
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerCreamTaste.map((element) => (
                <Button1>{element[1][0]}</Button1>
              ))}
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {/* <Button1
                width="124px"
                background={
                  creamTaste === "BLACK_SESAME_CREAM" ? "#FFACAC" : "grey"
                }
                onClick={() => {
                  handleCream("BLACK_SESAME_CREAM");
                }}
              >
                <Small color="white">흑임자크림</Small>
              </Button1>
              <Button1
                width="124px"
                background={
                  creamTaste === "SWEET_POPATO_CREAM" ? "#FFACAC" : "grey"
                }
                onClick={() => {
                  handleCream("SWEET_POPATO_CREAM");
                }}
              >
                <Small color="white">고구마무스</Small>
              </Button1>
              <Button1
                width="124px"
                background={
                  creamTaste === "EARL_GRAY_CREAM" ? "#FFACAC" : "grey"
                }
                onClick={() => {
                  handleCream("EARL_GRAY_CREAM");
                }}
              >
                <Small color="white">얼그레이</Small>
              </Button1>
              <Button1
                width="124px"
                background={
                  creamTaste === "STRAWBERRY_CREAM" ? "#FFACAC" : "grey"
                }
                onClick={() => {
                  handleCream("STRAWBERRY_CREAM");
                }}
              >
                <Small color="white">딸기크림</Small>
              </Button1> */}
            </RowContainer>
          </ColContainer>
          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>시트 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerSheetTaste.map((element) => (
                <Button1
                  onClick={() => {
                    handleTaste("RECTANGLE");
                    console.log("클릭");
                  }}
                >
                  {element[1][0]}
                </Button1>
              ))}
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerCreamTaste.map((element) => (
                <Button1>{element[1][0]}</Button1>
              ))}
            </RowContainer>
          </ColContainer>
          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>크림 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerCreamTaste.map((element) => (
                <Button1
                  onClick={() => {
                    handleCream("RECTANGLE");
                    console.log("클릭");
                  }}
                >
                  {element[1][0]}
                </Button1>
              ))}
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              {sellerCreamTaste.map((element) => (
                <Button1>{element[1][0]}</Button1>
              ))}
            </RowContainer>
          </ColContainer>

          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <GapH height="38px" />
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>추가 전달 사항</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <Text />
            <GapH height="32px" />
          </ColContainer>
        </ColContainer>
        <ColContainer
          width="871px"
          height="1432px"
          justify="start"
          align="start"
          paddingLeft="132px"
        >
          <GapH height="160px" />
          <ColContainer height="1170px" width="378px">
            <ColContainer
              height="1100px"
              width="378px"
              background="white"
              justify="start"
              borderRadius="20px 0px 20px 0px"
            >
              <GapH height="59px" />
              <Large fontsize="40px" color="#9E9E9E">
                Fleuve cake
              </Large>
              <GapH height="47px" />
              <ColContainer height="700px" overflowY="auto" justify="start">
                {imageSrcs.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Generated ${index + 1}`}
                    style={{
                      width: "242px",
                      height: "242px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </ColContainer>

              <div
                style={{
                  flexGrow: 1,
                }}
              />
              <FileButton src={AddFile} alt="img" onClick={handleDiffusion} />
              <GapH height="63px" />
            </ColContainer>
            <GapH height="57px" />
            <Button4 width="378px" height="115px">
              <BoldLarge fontsize="40px" color="white">
                주문하기
              </BoldLarge>
            </Button4>
          </ColContainer>
        </ColContainer>
      </LeftRightContainer>
      ;
    </div>
  );
}

export default MakeOrder;
