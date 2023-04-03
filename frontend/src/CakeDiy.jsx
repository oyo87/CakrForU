import React, { useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Text } from "react-konva";
import CustomImage from "./CustomImage";
import SidebarDiy from "./components/SidebarDiy";
import Button1 from "./components/button/Button1";
import GapW from "./components/layout/GapW";
import RoundCake from "./assets/img/round_cake.png";
import HeartCake from "./assets/img/heart_cake.png";

const trashZone = {
  x: 10,
  y: window.innerHeight - 210,
  width: 200,
  height: 200,
};

const BtnContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  z-index: 1;
`;

function CakeDiy() {
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const removeExistingCakes = () => {
    setImages((prevImages) => prevImages.filter((img) => img.lockMovement));
  };

  const addItem = (src, x, y, width, height, lockMovement, lockResize) => {
    if (lockMovement) {
      removeExistingCakes();
    }

    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setImages([
        ...images,
        {
          id: `d${Date.now()}`,
          x: x || 100,
          y: y || 100,
          image,
          width: width || 100,
          height: height || 100,
          lockMovement: lockMovement || false,
          lockResize: lockResize || false,
        },
      ]);
    };
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const bringToFront = () => {
    if (selectedId) {
      const selectedIndex = images.findIndex((img) => img.id === selectedId);
      const selectedImage = images[selectedIndex];
      const newImages = [
        ...images.slice(0, selectedIndex),
        ...images.slice(selectedIndex + 1),
        selectedImage,
      ];
      setImages(newImages);
    }
  };

  const sendToBack = () => {
    if (selectedId) {
      const selectedIndex = images.findIndex((img) => img.id === selectedId);
      const selectedImage = images[selectedIndex];
      const newImages = [
        selectedImage,
        ...images.slice(0, selectedIndex),
        ...images.slice(selectedIndex + 1),
      ];
      setImages(newImages);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, rgb(247 202 202), rgb(147 169 209))",
        position: "relative",
      }}
    >
      <SidebarDiy
        onImageClick={(src) => {
          addItem(src);
        }}
      />
      <BtnContainer>
        <Button1
          background="rgb(101 141 198)"
          type="button"
          onClick={() => {
            addItem(
              RoundCake,
              (window.innerWidth - 300) / 2 - 300,
              window.innerHeight / 2 - 250,
              600,
              500,
              true,
              true
            );
          }}
        >
          New Round Cake
        </Button1>
        <GapW width="1%" />
        <Button1
          type="button"
          background="rgb(255 111 97)"
          onClick={() => {
            addItem(
              HeartCake,
              (window.innerWidth - 300) / 2 - 300,
              window.innerHeight / 2 - 250,
              600,
              500,
              true,
              true
            );
          }}
        >
          New Heart Cake
        </Button1>
        <GapW width="1%" />
        <Button1 type="button" onClick={bringToFront}>
          Bring to Front
        </Button1>
        <GapW width="1%" />
        <Button1 type="button" onClick={sendToBack}>
          Send to Back
        </Button1>
        <GapW width="1%" />
      </BtnContainer>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {images.map((image, i) => {
            return (
              <CustomImage
                key={image.id}
                shapeProps={image}
                isSelected={image.id === selectedId}
                onSelect={() => {
                  selectShape(image.id);
                }}
                onChange={(newAttrs) => {
                  const imgs = images.slice();
                  imgs.splice(i, 1);
                  imgs.push(newAttrs);
                  // imgs[i] = newAttrs;
                  setImages(imgs);
                }}
                onDelete={() => {
                  const imgs = images.filter((img) => img.id !== image.id);
                  setImages(imgs);
                }}
              />
            );
          })}
          <Rect
            x={trashZone.x}
            y={trashZone.y}
            width={trashZone.width}
            height={trashZone.height}
            stroke="black"
            strokeWidth={2}
            dash={[4, 4]}
          />
          <Text
            x={trashZone.x}
            y={trashZone.y + trashZone.height / 2 - 10}
            width={trashZone.width}
            height={20}
            text="Trash Zone"
            align="center"
            fontSize={16}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default CakeDiy;
