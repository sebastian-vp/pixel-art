import './Pixel.css';
import { useState } from "react";

export default function Pixel({ color, indiceColorFondo }) {
  const [colorPixel, setColorPixel] = useState(indiceColorFondo % 2 === 0 ? "#ffffff" : "#d9d9d9");

  const handlePixelClick = () => {
    if(colorPixel === color) {
      setColorPixel(indiceColorFondo % 2 === 0 ? "#ffffff" : "#d9d9d9");
    } else {
      setColorPixel(color);
    }
  }

  return (
    <span className="pixel" 
                style={{
                  backgroundColor: `${colorPixel}`
                }}
                onClick={handlePixelClick}>

    </span>
  );
} 