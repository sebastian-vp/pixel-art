import './SelectorLineaColor.css';
import { useState } from "react";

export default function SelectorLinea({ onColorChange }) {
  const [porcentajeAltura, setPorcentajeAltura] = useState(0);

  const rgbToHex = (rgb) => {
    return "#" + rgb.map((color) => {
      const hex = color.toString(16);
      return hex.length === 1 ? "0" + hex : hex
    }).join("");
  };
  
  const interpolarColor = (altura) => {
    const colors = [
      [255, 0, 0],    
      [255, 255, 0],  
      [0, 255, 0],    
      [0, 255, 255],  
      [0, 0, 255],    
      [255, 0, 255],  
      [255, 0, 0],    
    ];
  
    const segmento = 100 / (colors.length - 1);
    const index = Math.floor(altura / segmento);
    const progress = (altura % segmento) / segmento;
  
    const interpolate = (start, end, factor) =>
      Math.round(start + (end - start) * factor);
  
    const rgb = colors[index].map((start, i) =>
      interpolate(start, colors[index + 1][i], progress)
    );
  
    return rgbToHex(rgb);
  };
  
  
  const handleClick = (event) => {
    const height = event.target.offsetHeight;
    const offsetY = event.nativeEvent.offsetY;
    const porcentaje = Math.min(Math.max((offsetY * 100) / height, 0), 100);
    const newColor = interpolarColor(porcentaje);

    setPorcentajeAltura(porcentaje);
    onColorChange(newColor);
  };

  return (
    <div className="colores" onClick={handleClick}>
      <div className="contenedor-selector-linea-color" style={{top: `${porcentajeAltura}%`}}>
        <div className="selector-linea-color"></div>
      </div>
    </div>
  );
}