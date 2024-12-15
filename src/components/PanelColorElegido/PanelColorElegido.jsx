export default function PanelColorElegido({ colorSeleccionado }) {
  return (
    <div className="contenedor-color-elegido">
      <div className="color-elegido" style={{ backgroundColor: colorSeleccionado }}></div>
      <p className="codigo-color-elegido">{colorSeleccionado}</p>
    </div>
  );
}