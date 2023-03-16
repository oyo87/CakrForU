/* eslint-disable react/prop-types */
// src/components/Sidebar.js
import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 300px;
  height: 100%;
  background-color: #f0f0f0;
  position: fixed;
  right: 0;
  top: 0;
  padding: 20px;
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
  border: 1px solid black;
`;

// eslint-disable-next-line react/prop-types
function Sidebar({
  onImageClick,
  // Blue,
  // Pink,
  // CreamBlue,
  // CreamRed,
  CreamWhite,
  RoundCake,
  // HeartCake,
  Char1,
  Char2,
  Char3,
  Char4,
  Char5,
  Char6,
  HappyBirthday,
}) {
  return (
    <SidebarContainer>
      {/* <StyledImage
        src={Blue.src}
        onClick={() => {
          onImageClick(Blue.src, Blue.width, Blue.height);
        }}
      />
      <StyledImage
        src={Pink.src}
        onClick={() => onImageClick(Pink.src, Pink.width, Pink.height)}
      />
      <StyledImage
        src={CreamBlue.src}
        onClick={() =>
          onImageClick(CreamBlue.src, CreamBlue.width, CreamBlue.height)
        }
      />
      <StyledImage
        src={CreamRed.src}
        onClick={() =>
          onImageClick(CreamRed.src, CreamRed.width, CreamRed.height)
        }
      /> */}
      <StyledImage
        src={CreamWhite.src}
        onClick={() =>
          onImageClick(CreamWhite.src, CreamWhite.width, CreamWhite.height)
        }
      />

      <StyledImage
        src={RoundCake.src}
        onClick={() =>
          onImageClick(RoundCake.src, RoundCake.width, RoundCake.height)
        }
      />
      {/* <StyledImage
        src={HeartCake.src}
        onClick={() =>
          onImageClick(HeartCake.src, HeartCake.width, HeartCake.height)
        }
      /> */}
      <StyledImage
        src={Char1.src}
        onClick={() => onImageClick(Char1.src, Char1.width, Char1.height)}
      />
      <StyledImage
        src={Char2.src}
        onClick={() => onImageClick(Char2.src, Char2.width, Char2.height)}
      />
      <StyledImage
        src={Char3.src}
        onClick={() => onImageClick(Char3.src, Char3.width, Char3.height)}
      />
      <StyledImage
        src={Char4.src}
        onClick={() => onImageClick(Char4.src, Char4.width, Char4.height)}
      />
      <StyledImage
        src={Char5.src}
        onClick={() => onImageClick(Char5.src, Char5.width, Char5.height)}
      />
      <StyledImage
        src={Char6.src}
        onClick={() => onImageClick(Char6.src, Char6.width, Char6.height)}
      />
      <StyledImage
        src={HappyBirthday.src}
        onClick={() =>
          onImageClick(
            HappyBirthday.src,
            HappyBirthday.width,
            HappyBirthday.height
          )
        }
      />

      {/* ...more images */}
    </SidebarContainer>
  );
}

export default Sidebar;
