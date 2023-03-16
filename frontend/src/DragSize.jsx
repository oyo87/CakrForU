import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Text, Transformer } from "react-konva";
import Blue from "./assets/img/blue.png";
import Pink from "./assets/img/pink.png";
import CreamBlue from "./assets/img/cream_blue.png";
import CreamRed from "./assets/img/cream_red.png";
import CreamWhite from "./assets/img/cream_white.png";
import RoundCake from "./assets/img/round_cake.png";
import HeartCake from "./assets/img/heart_cake.png";
import Char1 from "./assets/img/char1.png";
import Char2 from "./assets/img/char2.png";
import Char3 from "./assets/img/char3.png";
import Char4 from "./assets/img/char4.png";
import Char5 from "./assets/img/char5.png";
import Char6 from "./assets/img/char6.png";
import HappyBirthday from "./assets/img/happy_birthday.png";
import Sidebar from "./components/Sidebar";

function DragSize() {
  const [items, setItems] = useState([]);
  const [resizingMode, setResizingMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const transformerRef = useRef();

  // const [blue, setBlue] = useState({ src: Blue, width: 200, height: 200 });
  // const [pink, setPink] = useState({ src: Pink, width: 200, height: 200 });
  // const [creamBlue, setCreamBlue] = useState({
  //   src: CreamBlue,
  //   width: 50,
  //   height: 50,
  // });
  // const [creamRed, setCreamRed] = useState({
  //   src: CreamRed,
  //   width: 50,
  //   height: 50,
  // });
  // const [creamWhite, setCreamWhite] = useState({
  //   src: CreamWhite,
  //   width: 50,
  //   height: 50,
  // });
  // const [roundCake, setRoundCake] = useState({
  //   src: RoundCake,
  //   width: 500,
  //   height: 500,
  // });
  // const [heartCake, setHeartCake] = useState({
  //   src: HeartCake,
  //   width: 500,
  //   height: 500,
  // });
  // const blue = { src: Blue, width: 200, height: 200 };
  // const pink = { src: Pink, width: 200, height: 200 };
  // const creamBlue = { src: CreamBlue, width: 50, height: 50 };
  // const creamRed = { src: CreamRed, width: 50, height: 50 };
  const creamWhite = { src: CreamWhite, width: 50, height: 50 };
  const roundCake = { src: RoundCake, width: 700, height: 500 };
  // const heartCake = { src: HeartCake, width: 500, height: 500 };
  const char1 = { src: Char1, width: 50, height: 50 };
  const char2 = { src: Char2, width: 50, height: 50 };
  const char3 = { src: Char3, width: 50, height: 50 };
  const char4 = { src: Char4, width: 50, height: 50 };
  const char5 = { src: Char5, width: 50, height: 50 };
  const char6 = { src: Char6, width: 50, height: 50 };
  const happyBirthday = { src: HappyBirthday, width: 100, height: 100 };

  const trashZone = {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  };

  const createImageObject = (src, width, height) => {
    const img = new window.Image();
    img.src = src;
    const id = `image-${Date.now()}`;

    img.onload = () => {
      setItems((oldItems) =>
        oldItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              image: img,
            };
          }
          return item;
        })
      );
    };

    return {
      id,
      type: "image",
      image: null,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width,
      height,
    };
  };

  const handleDragStart = (e) => {
    if (resizingMode) {
      const id = e.target.name();
      setSelectedItemId(id);
    } else {
      const id = e.target.name();
      const dItems = items.slice();
      const dItem = items.find((i) => i.id === id);
      const index = items.indexOf(dItem);
      dItems.splice(index, 1);
      dItems.push(dItem);
      setItems(dItems);
    }
  };

  const handleDragEnd = (e) => {
    const id = e.target.name();
    const dItems = items.slice();
    const dItem = items.find((i) => i.id === id);
    const index = items.indexOf(dItem);

    const newX = e.target.x();
    const newY = e.target.y();

    if (
      newX >= trashZone.x &&
      newX <= trashZone.x + trashZone.width &&
      newY >= trashZone.y &&
      newY <= trashZone.y + trashZone.height
    ) {
      dItems.splice(index, 1);
    } else {
      dItems[index] = {
        ...dItem,
        x: e.target.x(),
        y: e.target.y(),
      };
    }
    setItems(dItems);
  };

  const addItem = (src, width, height) => {
    setItems([...items, createImageObject(src, width, height)]);
  };

  useEffect(() => {
    if (resizingMode && selectedItemId && transformerRef.current) {
      const layer = transformerRef.current.getLayer();
      const selectedNode = layer.findOne(`#${selectedItemId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [resizingMode, selectedItemId, items]);

  return (
    <div style={{ backgroundColor: "#474746" }}>
      <Sidebar
        onImageClick={(src, width, height) => {
          addItem(src, width, height);
        }}
        // Blue={blue}
        // Pink={pink}
        // CreamBlue={creamBlue}
        // CreamRed={creamRed}
        CreamWhite={creamWhite}
        RoundCake={roundCake}
        // HeartCake={heartCake}
        Char1={char1}
        Char2={char2}
        Char3={char3}
        Char4={char4}
        Char5={char5}
        Char6={char6}
        HappyBirthday={happyBirthday}
      />
      <button
        type="button"
        onClick={() => {
          addItem(Blue, 500, 500);
        }}
      >
        Add Blue
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(Pink, 500, 500);
        }}
      >
        Add Pink
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(CreamBlue, 50, 50);
        }}
      >
        Add CreamBlue
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(CreamRed, 50, 50);
        }}
      >
        Add CreamRed
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(CreamWhite, 50, 50);
        }}
      >
        Add CreamWhite
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(RoundCake, 500, 500);
        }}
      >
        Add RoundCake
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(HeartCake, 500, 500);
        }}
      >
        Add HeartCake
      </button>
      <button type="button" onClick={() => setResizingMode(!resizingMode)}>
        {resizingMode ? "Disable Resizing" : "Enable Resizing"}
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={(e) => {
          // Deselect the image when clicking outside of it
          if (e.target === e.target.getStage()) {
            setSelectedItemId(null);
          }
        }}
      >
        <Layer>
          {items.map((item) => (
            <Image
              key={item.id}
              id={item.id}
              name={item.id}
              image={item.image}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              draggable={
                !resizingMode || (resizingMode && item.id !== selectedItemId)
              }
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClick={() => setSelectedItemId(item.id)}
              onTap={() => setSelectedItemId(item.id)}
            />
          ))}
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
          {resizingMode && selectedItemId && (
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Limit the minimum width and height of the image
                if (newBox.width < 50 || newBox.height < 50) {
                  return oldBox;
                }
                return newBox;
              }}
              onTransformEnd={(e) => {
                const selectedItem = items.find((i) => i.id === selectedItemId);
                const index = items.indexOf(selectedItem);
                const selectedNode = e.currentTarget.findOne(
                  `#${selectedItemId}`
                );
                const scaleX = selectedNode.scaleX();
                const scaleY = selectedNode.scaleY();

                selectedNode.scaleX(1);
                selectedNode.scaleY(1);

                const updatedItem = {
                  ...selectedItem,
                  x: selectedNode.x(),
                  y: selectedNode.y(),
                  width: selectedNode.width() * scaleX,
                  height: selectedNode.height() * scaleY,
                };
                setItems([
                  ...items.slice(0, index),
                  updatedItem,
                  ...items.slice(index + 1),
                ]);
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default DragSize;
