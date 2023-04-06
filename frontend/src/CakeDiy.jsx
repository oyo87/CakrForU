import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { Stage, Layer, Rect, Text } from "react-konva";
// import DiyModal from "./components/DiyModal";
import CustomImage from "./CustomImage";
import SidebarDiy from "./components/SidebarDiy";
import Button1 from "./components/button/Button1";
import GapW from "./components/layout/GapW";
import RoundCake from "./assets/img/round_cake.png";
import HeartCake from "./assets/img/heart_cake.png";
import { setDiyImage } from "./store/imageSlice";
import { openDiy, closeDiy } from "./store/modalSlice";
import BoldMedium from "./components/text/BoldMedium";
import ColContainer from "./components/layout/ColContainer";
import RowContainer from "./components/layout/RowContainer";

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
  const modal = useSelector((state) => state.modal);
  const diyImage = useSelector((state) => state.image.diyImage);
  const sellerId = useSelector((state) => state.image.sellerId);
  const modalContainerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([
    {
      RoundCake,
      x: (window.innerWidth - 300) / 2 - 300,
      y: window.innerHeight / 2 - 250,
      width: 600,
      height: 500,
      lockMovement: true,
      lockResize: true,
    },
  ]);
  const [selectedId, selectShape] = useState(null);

  const handleClickOutside = (e) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(e.target)
    ) {
      dispatch(closeDiy());
    }
  };

  const storeImage = () => {
    localStorage.setItem("diyImage", diyImage);
    dispatch(closeDiy());
    navigate("/main");
  };

  const toStore = () => {
    localStorage.setItem("diyImage", diyImage);
    if (sellerId) {
      dispatch(closeDiy());
      navigate(`/makeOrder/${sellerId}`);
    } else {
      alert("가게 정보가 없습니다.");
    }
    // navigate(`/makeOrder/${sellerId}`);
  };

  const captureScreenArea = async () => {
    // Define the area to capture (x, y, width, height)
    const captureArea = {
      x: (window.innerWidth - 300) / 2 - 350, // Example values, adjust to your desired area
      y: window.innerHeight / 2 - 370,
      width: 700,
      height: 600,
    };

    // Capture the entire document body
    const canvas = await html2canvas(document.body);

    // Create a new canvas element to hold the cropped area
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = captureArea.width;
    croppedCanvas.height = captureArea.height;
    const ctx = croppedCanvas.getContext("2d");

    // Draw the captured area on the new canvas
    ctx.drawImage(
      canvas,
      captureArea.x,
      captureArea.y,
      captureArea.width,
      captureArea.height,
      0,
      0,
      captureArea.width,
      captureArea.height
    );

    // Convert the cropped canvas to a base64 image URL
    const dataURL = croppedCanvas.toDataURL("image/png");
    console.log("url: ", dataURL);
    // localStorage.setItem("diyImage", dataURL);
    dispatch(setDiyImage(dataURL));
    dispatch(openDiy());
    console.log("openDiy");
    console.log(modal.diyOpen);
    // navigate("/makeOrder/3");

    // // Create an anchor element with the download attribute
    // const link = document.createElement("a");
    // link.href = dataURL;
    // link.download = `aaa.png`; // Set the desired file name

    // // Append the link to the DOM and trigger a click event to download the image
    // document.body.appendChild(link);
    // link.click();

    // // Remove the link from the DOM after the download is initiated
    // document.body.removeChild(link);
  };

  const removeExistingCakes = (callback) => {
    setImages((prevImages) => {
      const filteredImages = prevImages.filter((img) => !img.lockMovement);
      callback(filteredImages);
      return filteredImages;
    });
  };

  useEffect(() => {
    const image = new window.Image();
    image.src = RoundCake;
    image.onload = () => {
      setImages([
        {
          id: `d${Date.now()}`,
          x: (window.innerWidth - 300) / 2 - 300,
          y: window.innerHeight / 2 - 250,
          image,
          width: 600,
          height: 500,
          lockMovement: true,
          lockResize: true,
        },
      ]);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addItem = (src, x, y, width, height, lockMovement, lockResize) => {
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      if (lockMovement) {
        removeExistingCakes((filteredImages) => {
          setImages([
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
            ...filteredImages,
          ]);
        });
      } else {
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
      }
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

  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, rgb(247 202 202), rgb(147 169 209))",
        position: "relative",
      }}
    >
      {modal.diyOpen ? (
        <div
          style={{
            position: "fixed",
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={modalContainerRef}
        >
          <ColContainer>
            <BoldMedium>완성!</BoldMedium>
            <img
              src={diyImage}
              alt="diy"
              style={{
                width: "80%",
                height: "80%",
                objectFit: "contain",
              }}
            />
            <RowContainer>
              <Button1 onClick={storeImage}>저장 후 메인으로</Button1>
              <GapW width="20px" />
              <Button1 onClick={toStore}>주문서로</Button1>
            </RowContainer>
          </ColContainer>
        </div>
      ) : null}
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
        <Button1 type="button" onClick={captureScreenArea} background="#332E33">
          Export
        </Button1>
        <GapW width="1%" />
        <Button1 type="button" background="rgb(215 210 203)" onClick={goToMain}>
          Go to Main
        </Button1>
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
