import './SelectorLineaColor.css';
import { rgbToHex, interpolarCanal } from '/src/utils/colores.js';
import { useState } from "react";

export default function SelectorLinea({ onColorChange }) {
  const [porcentajeAltura, setPorcentajeAltura] = useState(0);
  const [isDragging, setIsDragging] = useState(false); 

  const calcularColor = (altura) => {
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
  
    const rgb = colors[index].map((start, i) =>
      interpolarCanal(start, colors[index < colors.length - 1 ? index + 1: index][i], progress)
    );
  
    return rgbToHex(rgb);
  };
  
  const calcularPorcentaje = (event, element) => {
    const propiedadesPadre = element.getBoundingClientRect();
    const height = propiedadesPadre.height;
    const offsetY = event.clientY - propiedadesPadre.top;
    const porcentaje = Math.min(Math.max((offsetY * 100) / height, 0), 100);

    return porcentaje;
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    const element = document.querySelector('.transparencia'); 
    const porcentaje = calcularPorcentaje(event, element);
    const newColor = calcularColor(porcentaje);

    setPorcentajeAltura(porcentaje);
    onColorChange(newColor);
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const element = document.querySelector('.transparencia'); 

    const porcentaje = calcularPorcentaje(event, element);
    const newColor = calcularColor(porcentaje);

    setPorcentajeAltura(porcentaje);
    onColorChange(newColor);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="colores" 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div className="contenedor-selector-linea-color" style={{top: `${porcentajeAltura}%`}}>
        <div className="selector-linea-color"></div>
      </div>
    </div>
  );
}