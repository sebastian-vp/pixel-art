import './SelectorLineaTransparencia.css';
import { useState } from "react";

export default function SelectorLinea({ colorSeleccionado }) {
  const [porcentajeAltura, setPorcentajeAltura] = useState(0);
  const [isDragging, setIsDragging] = useState(false); 

  const estilo = {
    backgroundImage: `url('/src/assets/images/fondo-transparente.webp'), linear-gradient(180deg, ${colorSeleccionado}, transparent)`
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
    setPorcentajeAltura(porcentaje);
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const element = document.querySelector('.transparencia'); 

    const porcentaje = calcularPorcentaje(event, element);
    setPorcentajeAltura(porcentaje);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="transparencia" 
      style={estilo} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div 
        className="contenedor-selector-linea-transparencia" 
        style={{ 
          top: `${porcentajeAltura}%`,
          cursor: isDragging ? 'grab' : 'pointer'
        }}
      >
        <div className="selector-linea-transparencia"></div>
      </div>
    </div>
  );
}
