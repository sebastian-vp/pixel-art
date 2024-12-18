import './SelectorColor.css';
import { multiplicarColores, interpolarColorHex } from "/src/utils/colores.js";
import { useState, useEffect } from "react";

export default function SelectorColor({ color, onChangeVariationColor }) {
  const [coordenadaX, setCoordenadaX] = useState(100);
  const [coordenadaY, setCoordenadaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false); 

  const estilo = {
    background: `linear-gradient(-90deg, ${color}, #fff), linear-gradient(0deg, #000, #fff)`
  };
  
  const calcularColor = (coordenadaX, coordenadaY) => {
    const colorVertical = interpolarColorHex("#ffffff", color, coordenadaX / 100);
    const colorHorizontal = interpolarColorHex("#ffffff", "#000000", coordenadaY / 100);

    return multiplicarColores(colorHorizontal, colorVertical);
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
    const element = document.querySelector('.SelectorColor'); 
    
    const porcentaje = calcularCoordenadas(event, element);
    setCoordenadaX(porcentaje[0]);
    setCoordenadaY(porcentaje[1]);

    const color = calcularColor(porcentaje[0], porcentaje[1]);
    onChangeVariationColor(color);
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const element = document.querySelector('.SelectorColor'); 

    const porcentaje = calcularCoordenadas(event, element);
    setCoordenadaX(porcentaje[0]);
    setCoordenadaY(porcentaje[1]);

    const color = calcularColor(porcentaje[0], porcentaje[1]);
    onChangeVariationColor(color);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    onChangeVariationColor(color);
  }, [color]);

  return (
    <div 
      className="SelectorColor"
      style={estilo}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div 
        className="SelectorColor-div" 
        style={{
          top: `${coordenadaY}%`, 
          left: `${coordenadaX}%`,
          cursor: isDragging ? 'grab' : 'pointer'
        }}
      >
        <div className="SelectorColor-div-div"></div>
      </div>
    </div>
  );
}