import React from "react";
// import Konva from "konva";
import { Stage, Layer, Image } from "react-konva";
import { useImage } from "react-konva-utils";
import Blue from "./assets/img/blue.png";
import Pink from "./assets/img/pink.png";
import Candle from "./assets/img/candle.png";

function generateItems() {
  const [image] = useImage(Blue);
  const [pinkImage] = useImage(Pink);
  const [candleImage] = useImage(Candle);
  const imgList = [image, pinkImage, candleImage];

  const newItems = [];
  for (let i = 0; i < 3; i += 1) {
    newItems.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: `node-${i}`,
      image: imgList[i],
    });
  }
  console.log(newItems);
  return newItems;
}

function Drag() {
  const [items, setItems] = React.useState(generateItems());
  console.log(items);

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

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {items.map((item) => (
          <Image
            key={item.id}
            name={item.id}
            image={item.image}
            draggable
            x={item.x}
            y={item.y}
            width={500}
            height={500}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Drag;
