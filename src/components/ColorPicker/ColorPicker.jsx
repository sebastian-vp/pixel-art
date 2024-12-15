import './ColorPicker.css';
import SelectorLinea from '/src/components/SelectorLinea/SelectorLinea.jsx';
import SelectorColor from '/src/components/SelectorColor/SelectorColor';
import { useState } from "react";

export default function ColorPicker({ color, changeColor }) {
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="contenedor-color-picker">
      <SelectorColor color={selectedColor}/>
      <SelectorLinea clase="transparencia" colorSeleccionado={selectedColor} />
      <SelectorLinea clase="colores"  onColorChange={handleColorChange}/>
    </div>
  );
}
