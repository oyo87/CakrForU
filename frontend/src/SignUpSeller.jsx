import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "./util/axiosInstance";
import { openAddress, closeAddress } from "./store/modalSlice";
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

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const Text = styled.textarea`
  width: 539px;
  height: 230px;
  border: 1px solid;
  border-radius: 10px;
  padding-left: 20px;
  padding-top: 20px;
`;

function SignUpSeller() {
  const navigate = useNavigate();
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [selectedUserGender, setSelectedUserGender] = useState("F");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "F",
    year: "",
    month: "",
    day: "",
    roadAddress: "",
    detailedAddress: "",
    dongCode: "",
    buildingName: "",
    phonePrefix: "",
    phoneNumberPart1: "",
    phoneNumberPart2: "",
    name: "",
    businessNumber: "",
    businessLocation: "",
    businessName: "",
    contact: "",
    bankName: "",
    bankAccount: "",
    businessDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelect = (e) => {
    setFormData((prevData) => ({ ...prevData, phonePrefix: e.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = `${formData.phonePrefix}${formData.phoneNumberPart1}${formData.phoneNumberPart2}`;
    const birthDate = `${formData.year}-${formData.month}-${formData.day}`;
    const businessLocation = `${formData.roadAddress} ${formData.detailedAddress}`;
    const sellerSaveRequestDto = {
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      birthDate,
      roadAddress: formData.roadAddress,
      detailedAddress: formData.detailedAddress,
      dongCode: formData.dongCode,
      buildingName: formData.buildingName,
      phoneNumber,
      name: formData.name,
      businessNumber: formData.businessNumber,
      businessLocation,
      businessName: formData.businessName,
      contact: formData.contact,
      account: `${formData.bankName} ${formData.bankAccount}`,
      businessDescription: formData.businessDescription,
    };
    const strDto = JSON.stringify(sellerSaveRequestDto);
    axios
      .post("https://j8a604.p.ssafy.io/api/seller/signup", null, {
        params: {
          sellerSaveRequestDtoString: strDto,
        },
      })
      .then(() => {
        axios
          .post("https://j8a604.p.ssafy.io/api/seller/login", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            localStorage.setItem("access-token", res.data);
            console.log("success");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            console.log("catch");
          });
      });
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {modal.addressOpen && (
        <div>
          <DaumPostcode
            key="daum-postcode"
            style={{
              position: "fixed",
              width: "50%",
              height: "46%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid #000000",
              zIndex: "2",
            }}
            onComplete={(data) => {
              console.log(data);
              setFormData((prevData) => ({
                ...prevData,
                roadAddress: data.roadAddress,
                dongCode: data.bcode,
                buildingName: data.buildingName,
              }));
              setAddress(data.roadAddress);
              dispatch(closeAddress());
            }}
          />
          <ModalBackdrop
            key="modal-backdrop"
            onClick={() => dispatch(closeAddress())}
            style={{
              zIndex: "1",
            }}
          />
        </div>
      )}

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
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            name="email"
            onChange={handleChange}
          />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>비밀번호</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>성별</SmallMedium>
          </HorizonBox>
          <GapH height="17px" />
          <HorizonBox gap="10px">
            <RadioButton
              name="userGender"
              onChange={() => {
                setSelectedUserGender("F");
                setFormData((prevData) => ({ ...prevData, gender: "F" }));
              }}
              checked={selectedUserGender === "F"}
            />
            <MediumSmall>여성</MediumSmall>
            <GapW width="28.7%" />
            <RadioButton
              name="userGender"
              onChange={() => {
                setSelectedUserGender("M");
                setFormData((prevData) => ({ ...prevData, gender: "M" }));
              }}
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
              name="year"
              onChange={handleChange}
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              placeholder="월(00)"
              centerPlaceholder
              name="month"
              onChange={handleChange}
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              placeholder="일(00)"
              centerPlaceholder
              name="day"
              onChange={handleChange}
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
              name="phonePrefix"
              onChange={handleSelect}
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              centerPlaceholder
              name="phoneNumberPart1"
              onChange={handleChange}
            />
            <GapW width="11px" />
            <Input
              width="161px"
              height="55px"
              borderRadius="10px"
              centerPlaceholder
              name="phoneNumberPart2"
              onChange={handleChange}
            />
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업자 이름</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            name="name"
            onChange={handleChange}
          />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업자 번호</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Input
              width="440px"
              height="55px"
              borderRadius="10px"
              name="businessNumber"
              onChange={handleChange}
            />
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
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            name="businessName"
            onChange={handleChange}
          />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>사업장 주소</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <HorizonBox>
            <Input
              width="440px"
              height="55px"
              borderRadius="10px"
              name="businessLocation"
              value={address}
              readOnly
            />
            <GapW width="11px" />
            <Button2
              onClick={() => {
                dispatch(openAddress());
              }}
            >
              <SmallMedium color="white">조회</SmallMedium>
            </Button2>
          </HorizonBox>
          <GapH height="13px" />
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            placeholder="상세주소 입력(동/호)"
            name="DetailedAddress"
            onChange={handleChange}
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
              name="bankName"
              onChange={handleChange}
            />
            <GapW width="11px" />
            <Input
              width="367px"
              height="55px"
              borderRadius="10px"
              name="bankAccount"
              onChange={handleChange}
            />
          </HorizonBox>
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>문의계정</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Input
            width="539px"
            height="55px"
            borderRadius="10px"
            name="contact"
            onChange={handleChange}
          />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>가게설명</SmallMedium>
          </HorizonBox>
          <GapH height="10px" />
          <Text name="businessDescription" onChange={handleChange} />
          <GapH height="25px" />
          <HorizonBox>
            <SmallMedium>가게 대표 이미지</SmallMedium>
            <GapW width="42px" />
            <MediumSmall color="#616161">추가하기</MediumSmall>
          </HorizonBox>
          <GapH height="35px" />
          <Button3 width="539px" onClick={handleSubmit}>
            <MediumSmall color="white">가입하기</MediumSmall>
          </Button3>
          <GapH height="50px" />
        </ColContainer>
      </LeftRightContainer>
    </div>
  );
}

export default SignUpSeller;
