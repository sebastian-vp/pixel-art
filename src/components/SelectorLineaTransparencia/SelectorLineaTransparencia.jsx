import './SelectorLineaTransparencia.css';
import { useState } from "react";


export default function SelectorLinea({ colorSeleccionado }) {
  const [porcentajeAltura, setPorcentajeAltura] = useState(0);

  const estilo = {
    backgroundImage: `url('/src/assets/images/fondo-transparente.webp'), linear-gradient(180deg, ${colorSeleccionado}, transparent)`
  }
  
  const handleClick = (event) => {
    const height = event.target.offsetHeight;
    const offsetY = event.nativeEvent.offsetY;
    const porcentaje = Math.min(Math.max((offsetY * 100) / height, 0), 100);

    setPorcentajeAltura(porcentaje);
  };

  return (
    <div className="transparencia" onClick={handleClick} style={estilo}>
      <div className="contenedor-selector-linea-transparencia" style={{top: `${porcentajeAltura}%`}}>
        <div className="selector-linea-transparencia"></div>
      </div>
    </div>
  );
}