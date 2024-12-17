import './App.css'
import Pixel from './components/Pixel/Pixel.jsx'
import ColorPicker from './components/ColorPicker/ColorPicker.jsx'
import { useState } from "react";


export default function App() {
  const [colorSeleccionado, setcolorSeleccionado] = useState("#ff0000");
  const [variacionColor, setVariacionColor] = useState("#ff0000");
  const [transparencia, setTransparencia] = useState(100);
  const [ancho, setAncho] = useState(70);
  const [isDragging, setIsDragging] = useState(false);

  const onChangeTransparencia = (porcentaje) => {
    setTransparencia(Math.round(porcentaje));
  }

  const handleColorChange = (color) => {
    setcolorSeleccionado(color);
  };

  const handleColorVariationChange = (color) => {
    setVariacionColor(color);
  };

  const handleMouseMove = (event) => {
    const newAncho = Math.min(Math.max((event.clientX * 100) / window.innerWidth, 0), 100);
    setAncho(newAncho);
  };  

  const handleMouseDown = () => {
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <main style={{width: `${ancho}%`}}>
        <header className="header-lienzo">
          <h1 className="titulo-lienzo">Pixel Art</h1>
        </header>
        <div className="lienzo">
          <Pixel color={variacionColor + Math.round(transparencia * 255 / 100).toString(16).padStart(2, '0')} />
          {Array(255).fill().map((_, index) => (
            <Pixel key={index} color={variacionColor + Math.round(transparencia * 255 / 100).toString(16).padStart(2, '0')} />
          ))}
        </div>
      </main>
      <div 
        className="separador"
        onMouseDown={handleMouseDown}
        style={{
          cursor: "col-resize"
        }}
      ></div>
      <aside>
        <h2>Colores</h2>
        <ColorPicker 
          colorSeleccionado={colorSeleccionado} 
          variacionColor={variacionColor + Math.round(transparencia * 255 / 100).toString(16).padStart(2, '0')} 
          transparencia={transparencia}
          onChangeColor={handleColorChange}
          onChangeVariationColor={handleColorVariationChange}
          onChangeTransparencia={onChangeTransparencia}
        />
      </aside>
    </>
  )
}

