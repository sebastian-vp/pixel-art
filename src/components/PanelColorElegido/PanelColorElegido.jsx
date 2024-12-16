import "./PanelColorElegido.css";

export default function PanelColorElegido({ colorSeleccionado, transparencia }) {
  return (
    <div className="contenedor-color-elegido">
      <div className="color-elegido" style={{ backgroundColor: colorSeleccionado }}></div>
      <p className="codigo-color-elegido">{colorSeleccionado.slice(0, 7)}</p>
      <p className="porcentaje-transparencia">{transparencia}%</p>
    </div>
  );
}