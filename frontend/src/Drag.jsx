import React, { useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Image } from "react-konva";
import { useImage } from "react-konva-utils";
import Blue from "./assets/img/blue.png";
import Pink from "./assets/img/pink.png";
import Candle from "./assets/img/candle.png";

function generateItems() {
  const newItems = [];
  for (let i = 0; i < 10; i += 1) {
    newItems.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: `node-${i}`,
      color: Konva.Util.getRandomColor(),
    });
  }
  return newItems;
}

function Drag() {
  const imageRef = useRef(null);
  const pinkImageRef = useRef(null);
  const candleImageRef = useRef(null);
  const [items, setItems] = React.useState(generateItems());
  const [image] = useImage(Blue);
  const [pinkImage] = useImage(Pink);
  const [candleImage] = useImage(Candle);

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
    dItems[index] = {
      ...dItem,
      x: e.target.x(),
      y: e.target.y(),
    };
    setItems(dItems);
  };
  const handleLoad = () => {
    // do something when the image loads
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {items.map((item) => (
          <Circle
            key={item.id}
            name={item.id}
            draggable
            x={item.x}
            y={item.y}
            fill={item.color}
            radius={50}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
        <Image
          ref={imageRef}
          image={image}
          x={0}
          y={0}
          width={500}
          height={500}
          onLoad={handleLoad}
          draggable
        />
        <Image
          ref={pinkImageRef}
          image={pinkImage}
          x={0}
          y={0}
          width={400}
          height={200}
          onLoad={handleLoad}
          draggable
        />
        <Image
          ref={candleImageRef}
          image={candleImage}
          x={0}
          y={0}
          width={50}
          height={300}
          onLoad={handleLoad}
          draggable
        />
      </Layer>
    </Stage>
  );
}

export default Drag;
