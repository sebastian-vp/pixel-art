import './SelectorColor.css';
import { useState } from "react";

export default function SelectorColor({ color }) {
  const [coordenadaX, setCoordenadaX] = useState(0);
  const [coordenadaY, setCoordenadaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false); 

  const estilo = {
    background: `linear-gradient(-90deg, ${color}, #fff), linear-gradient(0deg, #000, #fff)`
  };

  const calcularCoordenadas = (event, element) => {
    const propiedadesPadre = element.getBoundingClientRect();

    const width = propiedadesPadre.width;
    const offsetX = event.clientX - propiedadesPadre.left;
    const coordenadaX = Math.min(Math.max((offsetX * 100) / width, 0), 100);

    const height = propiedadesPadre.height;
    const offsetY = event.clientY - propiedadesPadre.top;
    const coordenadaY = Math.min(Math.max((offsetY * 100) / height, 0), 100);

    return [coordenadaX, coordenadaY];
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    const element = document.querySelector('.color-picker'); 
    const porcentaje = calcularCoordenadas(event, element);
    setCoordenadaX(porcentaje[0]);
    setCoordenadaY(porcentaje[1]);
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const element = document.querySelector('.color-picker'); 

    const porcentaje = calcularCoordenadas(event, element);
    setCoordenadaX(porcentaje[0]);
    setCoordenadaY(porcentaje[1]);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="color-picker"
      style={estilo}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div className="contenedor-selector-circular" style={{top: `${coordenadaY}%`, left: `${coordenadaX}%`}}>
        <div className="selector-circular"></div>
      </div>
    </div>
  );
}