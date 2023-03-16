import React, { useState } from "react";
import { Stage, Layer, Image, Rect, Text } from "react-konva";
import Blue from "./assets/img/blue.png";
import Pink from "./assets/img/pink.png";
import CreamBlue from "./assets/img/cream_blue.png";
import CreamRed from "./assets/img/cream_red.png";
import CreamWhite from "./assets/img/cream_white.png";
import RoundCake from "./assets/img/round_cake.png";
import HeartCake from "./assets/img/heart_cake.png";

function Drag() {
  const [items, setItems] = useState([]);
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
    const id = e.target.name();
    const dItems = items.slice();
    const dItem = items.find((i) => i.id === id);
    const index = items.indexOf(dItem);
    dItems.splice(index, 1);
    dItems.push(dItem);
    setItems(dItems);
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

  return (
    <div>
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
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {items.map((item) => (
            <Image
              key={item.id}
              name={item.id}
              image={item.image}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              color="red"
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
        </Layer>
      </Stage>
    </div>
  );
}

export default Drag;
