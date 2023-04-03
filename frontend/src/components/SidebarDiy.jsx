import React, { useState } from "react";
import styled from "styled-components";
import Button1 from "./button/Button1";
import RowContainer from "./layout/RowContainer";
import GapH from "./layout/GapH";
import Char1 from "../assets/img/char1.png";
import Char2 from "../assets/img/char2.png";
import Char3 from "../assets/img/char3.png";
import Char4 from "../assets/img/char4.png";

const SidebarContainer = styled.div`
  width: 300px;
  height: 100%;
  background-color: #f0f0f0;
  position: fixed;
  right: 0;
  top: 0;
  // padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  z-index: 10;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  cursor: pointer;
`;

function SidebarDiy({ onImageClick }) {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <SidebarContainer>
      <RowContainer>
        <Button1
          background="rgb(181 199 211)"
          borderRadius="0"
          width="75px"
          type="button"
          onClick={() => setActiveTab(1)}
        >
          크림
        </Button1>
        <Button1
          background="rgb(255 247 224)"
          borderRadius="0"
          width="75px"
          color="black"
          type="button"
          onClick={() => setActiveTab(2)}
        >
          크림2
        </Button1>
        <Button1
          borderRadius="0"
          width="75px"
          type="button"
          onClick={() => setActiveTab(3)}
        >
          동물
        </Button1>
        <Button1
          background="rgb(255 111 97)"
          borderRadius="0"
          width="75px"
          type="button"
          onClick={() => setActiveTab(4)}
        >
          과일
        </Button1>
      </RowContainer>
      <GapH height="50px" />
      {activeTab === 1 && (
        <>
          <StyledImage src={Char1} onClick={() => onImageClick(Char1)} />
          <StyledImage src={Char1} onClick={() => onImageClick(Char1)} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <StyledImage src={Char2} onClick={() => onImageClick(Char2)} />
          <StyledImage src={Char2} onClick={() => onImageClick(Char2)} />
        </>
      )}
      {activeTab === 3 && (
        <>
          <StyledImage src={Char3} onClick={() => onImageClick(Char3)} />
          <StyledImage src={Char3} onClick={() => onImageClick(Char3)} />
        </>
      )}
      {activeTab === 4 && (
        <>
          <StyledImage src={Char4} onClick={() => onImageClick(Char4)} />
          <StyledImage src={Char4} onClick={() => onImageClick(Char4)} />
        </>
      )}
    </SidebarContainer>
  );
}

export default SidebarDiy;
