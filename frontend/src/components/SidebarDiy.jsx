import React, { useState } from "react";
import styled from "styled-components";
import Button1 from "./button/Button1";
import RowContainer from "./layout/RowContainer";
// import ColContainer from "./layout/ColContainer";
// import GapH from "./layout/GapH";
import Cream1 from "../assets/img/cream1.png";
import Cream2 from "../assets/img/cream2.png";
import Cream3 from "../assets/img/cream3.png";
import Cream4 from "../assets/img/cream4.png";
import Cream5 from "../assets/img/cream5.png";
import Cream6 from "../assets/img/cream6.png";
import Cream7 from "../assets/img/cream7.png";
import Cream8 from "../assets/img/cream8.png";
import Deco1 from "../assets/img/deco1.png";
import Char1 from "../assets/img/char1.png";
import Char2 from "../assets/img/char2.png";
import Char3 from "../assets/img/char3.png";
import Char4 from "../assets/img/char4.png";
import Orange1 from "../assets/img/orange1.png";
import Orange2 from "../assets/img/orange2.png";
import Orange3 from "../assets/img/orange3.png";
import Orange4 from "../assets/img/orange4.png";
import Cherry1 from "../assets/img/cherry1.png";
import Cherry2 from "../assets/img/cherry2.png";
import Cherry3 from "../assets/img/cherry3.png";
import Cherry4 from "../assets/img/cherry4.png";
import Cherry5 from "../assets/img/cherry5.png";
import Cherry6 from "../assets/img/cherry6.png";
import Strawberry1 from "../assets/img/strawberry1.png";
import Strawberry2 from "../assets/img/strawberry2.png";
import Strawberry3 from "../assets/img/strawberry3.png";
import Kiwi1 from "../assets/img/kiwi1.png";
import Kiwi2 from "../assets/img/kiwi2.png";
import Kiwi3 from "../assets/img/kiwi3.png";
import Kiwi4 from "../assets/img/kiwi4.png";
import Mango1 from "../assets/img/mango1.png";
import Mango2 from "../assets/img/mango2.png";
import Mango3 from "../assets/img/mango3.png";
import Peach1 from "../assets/img/peach1.png";

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
  gap: 30px;
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
      {/* <GapH height="100px" /> */}
      {/* <ColContainer width="100%" height="100%" overflowY="scroll"> */}
      {activeTab === 1 && (
        <>
          <StyledImage src={Cream1} onClick={() => onImageClick(Cream1)} />
          <StyledImage src={Cream2} onClick={() => onImageClick(Cream2)} />
          <StyledImage src={Cream3} onClick={() => onImageClick(Cream3)} />
          <StyledImage src={Cream4} onClick={() => onImageClick(Cream4)} />
          <StyledImage src={Cream5} onClick={() => onImageClick(Cream5)} />
          <StyledImage src={Cream6} onClick={() => onImageClick(Cream6)} />
          <StyledImage src={Cream7} onClick={() => onImageClick(Cream7)} />
          <StyledImage src={Cream8} onClick={() => onImageClick(Cream8)} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <StyledImage src={Deco1} onClick={() => onImageClick(Deco1)} />
          <StyledImage src={Deco1} onClick={() => onImageClick(Deco1)} />
        </>
      )}
      {activeTab === 3 && (
        <>
          <StyledImage src={Char1} onClick={() => onImageClick(Char1)} />
          <StyledImage src={Char2} onClick={() => onImageClick(Char2)} />
          <StyledImage src={Char3} onClick={() => onImageClick(Char3)} />
          <StyledImage src={Char4} onClick={() => onImageClick(Char4)} />
        </>
      )}
      {activeTab === 4 && (
        <>
          <StyledImage src={Orange1} onClick={() => onImageClick(Orange1)} />
          <StyledImage src={Orange2} onClick={() => onImageClick(Orange2)} />
          <StyledImage src={Orange3} onClick={() => onImageClick(Orange3)} />
          <StyledImage src={Orange4} onClick={() => onImageClick(Orange4)} />
          <StyledImage src={Cherry1} onClick={() => onImageClick(Cherry1)} />
          <StyledImage src={Cherry2} onClick={() => onImageClick(Cherry2)} />
          <StyledImage src={Cherry3} onClick={() => onImageClick(Cherry3)} />
          <StyledImage src={Cherry4} onClick={() => onImageClick(Cherry4)} />
          <StyledImage src={Cherry5} onClick={() => onImageClick(Cherry5)} />
          <StyledImage src={Cherry6} onClick={() => onImageClick(Cherry6)} />
          <StyledImage
            src={Strawberry1}
            onClick={() => onImageClick(Strawberry1)}
          />
          <StyledImage
            src={Strawberry2}
            onClick={() => onImageClick(Strawberry2)}
          />
          <StyledImage
            src={Strawberry3}
            onClick={() => onImageClick(Strawberry3)}
          />
          <StyledImage src={Kiwi1} onClick={() => onImageClick(Kiwi1)} />
          <StyledImage src={Kiwi2} onClick={() => onImageClick(Kiwi2)} />
          <StyledImage src={Kiwi3} onClick={() => onImageClick(Kiwi3)} />
          <StyledImage src={Kiwi4} onClick={() => onImageClick(Kiwi4)} />
          <StyledImage src={Mango1} onClick={() => onImageClick(Mango1)} />
          <StyledImage src={Mango2} onClick={() => onImageClick(Mango2)} />
          <StyledImage src={Mango3} onClick={() => onImageClick(Mango3)} />
          <StyledImage src={Peach1} onClick={() => onImageClick(Peach1)} />
        </>
      )}
      {/* </ColContainer> */}
    </SidebarContainer>
  );
}

export default SidebarDiy;
