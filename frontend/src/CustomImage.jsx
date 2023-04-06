import React, { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";

const trashZone = {
  x: 10,
  y: window.innerHeight - 210,
  width: 200,
  height: 200,
};

function CustomImage({ shapeProps, isSelected, onSelect, onChange, onDelete }) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={!shapeProps.lockMovement}
        onDragEnd={(e) => {
          const newX = e.target.x();
          const newY = e.target.y() + shapeProps.height; // Add the object's height to the y coordinate

          if (
            newX <= trashZone.x + trashZone.width &&
            newY >= trashZone.y
            // newY <= trashZone.y + trashZone.height
          ) {
            onDelete();
          } else {
            onChange({
              ...shapeProps,
              x: newX,
              y: newY - shapeProps.height, // Subtract the object's height to store the original y coordinate
            });
          }
        }}
        onTransformEnd={() => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && !shapeProps.lockResize && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default CustomImage;
