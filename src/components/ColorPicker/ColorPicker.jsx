import './ColorPicker.css';
import PanelColorElegido from '/src/components/PanelColorElegido/PanelColorElegido';
import SelectorLineaColor from '/src/components/SelectorLineaColor/SelectorLineaColor.jsx';
import SelectorLineaTransparencia from '/src/components/SelectorLineaTransparencia/SelectorLineaTransparencia.jsx';
import SelectorColor from '/src/components/SelectorColor/SelectorColor';
import { useState } from "react";

export default function ColorPicker({ colorSeleccionado, variacionColor, transparencia, onChangeColor, onChangeVariationColor, onChangeTransparencia }) {
  return (
    <>
      <PanelColorElegido colorSeleccionado={variacionColor} transparencia={transparencia} />
      <div className="contenedor-color-picker">
        <SelectorColor color={colorSeleccionado} onChangeVariationColor={onChangeVariationColor} />
        <SelectorLineaTransparencia colorSeleccionado={variacionColor} onChangeVariationColor={onChangeVariationColor} onChangeTransparencia={onChangeTransparencia} />
        <SelectorLineaColor onColorChange={onChangeColor} />
      </div>
    </>
  );
}
