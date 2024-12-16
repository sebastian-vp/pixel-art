import './Pixel.css';
import { useState } from "react";

export default function Pixel({ color }) {
  const [colorPixel, setColorPixel] = useState("#ffffff");

  const handlePixelClick = () => {
    if(colorPixel === color) {
      setColorPixel("#ffffff");
    } else {
      setColorPixel(color);
    }
  }

  return (
    <span className="pixel" 
                style={{backgroundColor: `${colorPixel}`}}
                onClick={handlePixelClick}>

    </span>
  );
} 