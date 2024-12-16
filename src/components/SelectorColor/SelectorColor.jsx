import './SelectorColor.css';
import { useState } from "react";

export default function SelectorColor({ color, onChangeVariationColor }) {
  const [coordenadaX, setCoordenadaX] = useState(0);
  const [coordenadaY, setCoordenadaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false); 

  const estilo = {
    background: `linear-gradient(-90deg, ${color}, #fff), linear-gradient(0deg, #000, #fff)`
  };

  const rgbToHex = (rgb) => {
      return "#" + rgb.map((color) => {
        const hex = color.toString(16);
        return hex.length === 1 ? "0" + hex : hex
      }).join("");
    };
  
    const hexToRgb = (hex) => {
      return [
        parseInt(hex.substring(1, 3), 16),
        parseInt(hex.substring(3, 5), 16),
        parseInt(hex.substring(5, 7), 16)
      ];
    };
  
    const interpolarColor = (colorInicial, colorFinal, porcentaje) => {
      const rgbInicial = hexToRgb(colorInicial);
      const rgbFinal = hexToRgb(colorFinal);
  
      const interpolate = (start, end, factor) =>
        Math.round(start + (end - start) * (factor / 100));
  
      const rgb = rgbInicial.map((start, i) =>
        interpolate(start, rgbFinal[i], porcentaje)
      );
  
      return rgbToHex(rgb);
    };
  
    const multiplicarColores = (color1, color2) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
  
      const rgb = rgb1.map((color, i) => Math.round((color * rgb2[i]) / 255));
  
      return rgbToHex(rgb);
    };
  
    const calcularColor = (coordenadaX, coordenadaY) => {
      const colorVertical = interpolarColor("#ffffff", color, coordenadaX);
      const colorHorizontal = interpolarColor("#ffffff", "#000000", coordenadaY);
  
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
    const element = document.querySelector('.color-picker'); 
    
    const porcentaje = calcularCoordenadas(event, element);
    setCoordenadaX(porcentaje[0]);
    setCoordenadaY(porcentaje[1]);

    const color = calcularColor(porcentaje[0], porcentaje[1]);
    onChangeVariationColor(color);
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const element = document.querySelector('.color-picker'); 

    const porcentaje = calcularCoordenadas(event, element);
    setCoordenadaX(porcentaje[0]);
    setCoordenadaY(porcentaje[1]);

    const color = calcularColor(porcentaje[0], porcentaje[1]);
    onChangeVariationColor(color);
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