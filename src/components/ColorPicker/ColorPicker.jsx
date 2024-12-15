import './ColorPicker.css';
import PanelColorElegido from '/src/components/PanelColorElegido/PanelColorElegido';
import SelectorLineaColor from '/src/components/SelectorLineaColor/SelectorLineaColor.jsx';
import SelectorLineaTransparencia from '/src/components/SelectorLineaTransparencia/SelectorLineaTransparencia.jsx';
import SelectorColor from '/src/components/SelectorColor/SelectorColor';
import { useState } from "react";

export default function ColorPicker() {
  const [colorSeleccionado, setcolorSeleccionado] = useState("#ff0000");

  const handleColorChange = (color) => {
    setcolorSeleccionado(color);
  };

  return (
    <>
      <PanelColorElegido colorSeleccionado={colorSeleccionado} />
      <div className="contenedor-color-picker">
        <SelectorColor color={colorSeleccionado} />
        <SelectorLineaTransparencia colorSeleccionado={colorSeleccionado} />
        <SelectorLineaColor onColorChange={handleColorChange}/>
      </div>
    </>
  );
}
