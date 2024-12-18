import "./PanelColorElegido.css";

export default function PanelColorElegido({ colorSeleccionado, transparencia }) {
  return (
    <div className="PanelColorElegido">
      <div className="PanelColorElegido-div" 
        style={{ 
          backgroundColor: colorSeleccionado 
        }}
      >
      </div>
      <p className="PanelColorElegido-codigoColorElegido">
        {colorSeleccionado.slice(0, 7)}
      </p>
      <p className="PanelColorElegido-porcentajeTransparencia">
        {transparencia}%
      </p>
    </div>
  );
}