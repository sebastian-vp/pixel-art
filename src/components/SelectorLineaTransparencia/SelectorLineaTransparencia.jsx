import './SelectorLineaTransparencia.css';
import { useState } from "react";

export default function SelectorLinea({ colorSeleccionado, onChangeTransparencia }) {
  const [porcentajeAltura, setPorcentajeAltura] = useState(0);
  const [isDragging, setIsDragging] = useState(false); 

  const estilo = {
    backgroundImage: `linear-gradient(180deg, ${colorSeleccionado}, transparent), url('/src/assets/images/fondo-transparente.webp')`
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
    const element = document.querySelector('.SelectorLineaTransparencia'); 

    const porcentaje = calcularPorcentaje(event, element);
    setPorcentajeAltura(porcentaje);
    onChangeTransparencia(100 - porcentaje);
  };
  
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const element = document.querySelector('.SelectorLineaTransparencia'); 

    const porcentaje = calcularPorcentaje(event, element);
    setPorcentajeAltura(porcentaje);
    onChangeTransparencia(100 - porcentaje);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="SelectorLineaTransparencia" 
      style={estilo} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div 
        className="SelectorLineaTransparencia-div" 
        style={{ 
          top: `${porcentajeAltura}%`,
          cursor: isDragging ? 'grab' : 'pointer'
        }}
      >
        <div className="SelectorLineaTransparencia-div-div"></div>
      </div>
    </div>
  );
}
