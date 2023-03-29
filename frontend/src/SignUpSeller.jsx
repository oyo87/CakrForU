import React, { useState } from "react";
import styled from "styled-components";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import BoldLarge from "./components/text/BoldLarge";
import Input from "./components/Input";
import GapH from "./components/layout/GapH";
import Button2 from "./components/button/Button2";
import Button3 from "./components/button/Button3";
import GapW from "./components/layout/GapW";
import Select from "./components/Select";
import SmallMedium from "./components/text/SmallMedium";
import MediumSmall from "./components/text/MediumSmall";
import { RadioButton } from "./components/Radio";
import Plant from "./assets/img/plant.png";

function SignUpSeller() {
  const [selectedUserGender, setSelectedUserGender] = useState("F");
  const HorizonBox = styled.div`
    display: flex;
    justify-content: ${(props) => props.justify || "start"};
    align-items: center;
    width: 539px;
    gap: ${(props) => props.gap || "0px"};
  `;
  const LogoImage = styled.img`
    position: absolute;
    width: 37.41px;
    top: -27px;
    left: 185px;
  `;

  const TextWithLogo = styled.div`
    position: relative;
    display: inline-block;
  `;
  return (
    <div>
      <Header />
      <LeftRightContainer justify="center">
        <ColContainer width="50%">
          <GapH height="50px" />
          <TextWithLogo>
            <BoldLarge color="#BE1E1E">CAKE FOR U</BoldLarge>
            <LogoImage src={Plant} alt="plant" />
          </TextWithLogo>
          <GapH height="35px" />
          <HorizonBox>
            <SmallMedium>이메일</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input width="539px" height="55px" borderRadius="10px" />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>비밀번호</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input width="539px" height="55px" borderRadius="10px" />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>성별</SmallMedium>
          </HorizonBox>
          <GapH height="17px" />
          <HorizonBox gap="10px">
            <RadioButton
              name="userGender"
              onChange={() => setSelectedUserGender("F")}
              checked={selectedUserGender === "F"}
            />
            <MediumSmall>여성</MediumSmall>
            <GapW width="28.7%" />
            <RadioButton
              name="userGender"
              onChange={() => setSelectedUserGender("M")}
              checked={selectedUserGender === "M"}
            />
            <MediumSmall>남성</MediumSmall>
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>생년월일</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Input
              width="201px"
              height="55px"
              borderRadius="10px"
              placeholder="년(4자)"
              centerPlaceholder
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              placeholder="월(00)"
              centerPlaceholder
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              placeholder="일(00)"
              centerPlaceholder
            />
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>전화번호</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Select
              width="201px"
              height="55px"
              options={["010", "016", "017", "019"]}
              centerPlaceholder
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              centerPlaceholder
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              centerPlaceholder
            />
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업자 이름</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input width="539px" height="55px" borderRadius="10px" />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업자 번호</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Input width="440px" height="55px" borderRadius="10px" />
            <GapW width="11px" />
            <Button2>
              <SmallMedium color="white">인증</SmallMedium>
            </Button2>
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업장 이름</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input width="539px" height="55px" borderRadius="10px" />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업장 주소</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Input width="440px" height="55px" borderRadius="10px" />
            <GapW width="11px" />
            <Button2>
              <SmallMedium color="white">조회</SmallMedium>
            </Button2>
          </HorizonBox>
          <GapH height="13px" />
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            placeholder="상세주소 입력(동/호)"
          />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>주거래 계좌</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              placeholder="은행"
              centerPlaceholder
            />
            <GapW width="11px" />
            <Input width="367px" height="55px" borderRadius="10px" />
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>문의계정</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input width="539px" height="55px" borderRadius="10px" />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>가게 대표 이미지</SmallMedium>
            <GapW width="42px" />
            <MediumSmall color="#616161">추가하기</MediumSmall>
          </HorizonBox>
          <GapH height="35px" />
          <Button3 width="539px">
            <MediumSmall color="white">가입하기</MediumSmall>
          </Button3>
          <GapH height="50px" />
        </ColContainer>
      </LeftRightContainer>
    </div>
  );
}

export default SignUpSeller;
