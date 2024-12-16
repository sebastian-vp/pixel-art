import './ColorPicker.css';
import PanelColorElegido from '/src/components/PanelColorElegido/PanelColorElegido';
import SelectorLineaColor from '/src/components/SelectorLineaColor/SelectorLineaColor.jsx';
import SelectorLineaTransparencia from '/src/components/SelectorLineaTransparencia/SelectorLineaTransparencia.jsx';
import SelectorColor from '/src/components/SelectorColor/SelectorColor';

export default function ColorPicker({ colorSeleccionado, variacionColor, onChangeColor, onChangeVariationColor }) {
  return (
    <>
      <PanelColorElegido colorSeleccionado={variacionColor} />
      <div className="contenedor-color-picker">
        <SelectorColor color={colorSeleccionado} onChangeVariationColor={onChangeVariationColor}/>
        <SelectorLineaTransparencia colorSeleccionado={variacionColor} />
        <SelectorLineaColor onColorChange={onChangeColor}/>
      </div>
    </>
  );
}
