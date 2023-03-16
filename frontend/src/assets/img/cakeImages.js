import React, { useRef } from "react";
import Blue from "./assets/img/blue.png";
import Pink from "./assets/img/pink.png";
import Candle from "./assets/img/candle.png";

function generateItems() {
    const newItems = [];
    for (let i = 0; i < 10; i += 1) {
        newItems.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            z: 0,
            id: `node-${i}`,
            color: Konva.Util.getRandomColor(),
        });
    }
    return newItems;
}

function cakeImages() {
    const [image] = useImage(Blue);
    const [pinkImage] = useImage(Pink);
    const [candleImage] = useImage(Candle);
    const [items, setItems] = React.useState(generateItems());

    return items;
}
