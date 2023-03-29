import React, { useState } from "react";
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

function MakeOrder() {
  const Text = styled.textarea`
    width: 542px;
    height: 230px;
    border: 1px solid #d8d8d8;
    text-indent: 20px;
    padding-top: 20px;
  `;
  const FileButton = styled.img`
    cursor: pointer;
  `;

  const [imageSrc, setImageSrc] = useState(null);

  const handleDiffusion = () => {
    axios
      .post("/sdapi/v1/txt2img", {
        prompt: "LETTERING CAKE, RED, CREAM_CHEESE, CIRCLE, VANILLA",
        steps: 20,
        sampler_index: "Euler a",
      })
      .then((res) => {
        const imageData = res.data.images[0];
        const imageUrl = `data:image/png;base64,${imageData}`;
        setImageSrc(imageUrl);
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
              <Button1 width="124px">
                <Small color="white">원형</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">하트</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">사각</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">입체</Small>
              </Button1>
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
              <Button1 width="124px">
                <Small color="white">미니</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">1호</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">2호</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">3호</Small>
              </Button1>
            </RowContainer>
          </ColContainer>
          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>시트 맛 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <Button1 width="124px">
                <Small color="white">바닐라</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">초코</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">얼그레이</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">레드벨벳</Small>
              </Button1>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <Button1 width="124px">
                <Small color="white">말차</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">모카</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">치즈</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">당근</Small>
              </Button1>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <Button1 width="124px">
                <Small color="white">고구마</Small>
              </Button1>
              <GapW width="124px" />
              <GapW width="124px" />
              <GapW width="124px" />
            </RowContainer>
          </ColContainer>
          <GapH height="18px" />
          <ColContainer height="246px" width="581px" background="white">
            <RowContainer justify="start">
              <GapW width="16px" />
              <BoldMediumSmall>크림 맛 선택</BoldMediumSmall>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <Button1 width="124px">
                <Small color="white">크림치즈</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">초코크림</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">오레오크림</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">말차크림</Small>
              </Button1>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <Button1 width="124px">
                <Small color="white">흑임자크림</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">고구마무스</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">얼그레이</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">생크림</Small>
              </Button1>
            </RowContainer>
            <GapH height="18px" />
            <RowContainer gap="19px">
              <Button1 width="124px">
                <Small color="white">누텔라</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">로투스크림</Small>
              </Button1>
              <Button1 width="124px">
                <Small color="white">블루베리크림</Small>
              </Button1>
              <GapW width="124px" />
            </RowContainer>
          </ColContainer>
          <ColContainer height="246px" width="581px" background="white">
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
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Generated"
                  style={{
                    width: "242px",
                    height: "185px",
                    objectFit: "cover",
                  }}
                />
              )}
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
