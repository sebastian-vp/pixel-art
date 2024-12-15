import './SelectorLinea.css';
import { useState } from "react";

export default function SelectorLinea({ clase, colorSeleccionado, onColorChange }) {
  const [porcentajeAltura, setPorcentajeAltura] = useState(0);
  const [color, setColor] = useState("#ff0000");

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
    setColor(newColor);
    
    if(onColorChange) {
      onColorChange(newColor);
    }
  };

  return (
    <div className={clase} 
      onClick={handleClick}
      style={{
        backgroundImage: `url('/src/assets/images/fondo-transparente.webp'), linear-gradient(180deg, ${colorSeleccionado}, #ff000000)`
      }}>
      <div className="contenedor-selector-linea" style={{top: `${porcentajeAltura}%`}}>
        <div className="selector-linea"></div>
      </div>
    </div>
  );
}