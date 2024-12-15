import './ColorPicker.css';
import PanelColorElegido from '/src/components/PanelColorElegido/PanelColorElegido';
import SelectorLineaColor from '/src/components/SelectorLineaColor/SelectorLineaColor.jsx';
import SelectorLineaTransparencia from '/src/components/SelectorLineaTransparencia/SelectorLineaTransparencia.jsx';
import SelectorColor from '/src/components/SelectorColor/SelectorColor';

export default function ColorPicker({ colorSeleccionado, onChangeColor }) {
  return (
    <>
      <PanelColorElegido colorSeleccionado={colorSeleccionado} />
      <div className="contenedor-color-picker">
        <SelectorColor color={colorSeleccionado} />
        <SelectorLineaTransparencia colorSeleccionado={colorSeleccionado} />
        <SelectorLineaColor onColorChange={onChangeColor}/>
      </div>
    </>
  );
}
