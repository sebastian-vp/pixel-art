import './SelectorColor.css';
import { useState } from "react";

export default function SelectorColor({ color }) {
  const [coordenadaX, setCoordenadaX] = useState(0);
  const [coordenadaY, setCoordenadaY] = useState(0);

  const handleClick = (event) => {
    const width = event.target.offsetWidth;
    const offsetX = event.nativeEvent.offsetX;
    const percentageX = (offsetX * 100) / width;

    const height = event.target.offsetHeight;
    const offsetY = event.nativeEvent.offsetY;
    const percentageY = (offsetY * 100) / height;

    setCoordenadaX(percentageX);
    setCoordenadaY(percentageY);
  };

  return (
    <div className="color-picker" 
      onClick={handleClick}
      style={{
        background: `linear-gradient(-90deg, ${color}, #fff), linear-gradient(0deg, #000, #fff)`
      }}>
      <div className="contenedor-selector-circular" style={{top: `${coordenadaY}%`, left: `${coordenadaX}%`}}>
        <div className="selector-circular"></div>
      </div>
    </div>
  );
}