import './Pixel.css';
import { useState } from "react";

export default function Pixel({ color, indiceColorFondo, onMouseDownForPaint , onMouseUpForPaint, isMouseDownForPaint, buttonPressed }) {
  const [colorPixel, setColorPixel] = useState(indiceColorFondo % 2 === 0 ? "#ffffff" : "#d9d9d9");

  const handlePixelClick = (event) => {
    if(event.button === 0) {
      setColorPixel(color);
      onMouseDownForPaint(0);
    } else if(event.button === 2) {
      setColorPixel(indiceColorFondo % 2 === 0 ? "#ffffff" : "#d9d9d9");
      onMouseDownForPaint(2);
    } else {
      return;
    }
  }

  const handleMouseMoveForPaint = () => {
    if(isMouseDownForPaint) {
      if(buttonPressed === 0) {
        setColorPixel(color);
      } else if(buttonPressed === 2) {
        setColorPixel(indiceColorFondo % 2 === 0 ? "#ffffff" : "#d9d9d9");
      } else {
        return;
      }
      console.log(buttonPressed);
    }
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
  }

  return (
    <span className="pixel" 
      style={{
        backgroundColor: `${colorPixel}`
      }}
      onMouseDown={handlePixelClick}
      onMouseMove={handleMouseMoveForPaint}
      onMouseUp={onMouseUpForPaint}
      onContextMenu={handleContextMenu}
    >
    </span>
  );
} 