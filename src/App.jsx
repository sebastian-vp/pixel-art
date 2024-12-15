import './App.css'
import Pixel from './components/Pixel/Pixel.jsx'
import ColorPicker from './components/ColorPicker/ColorPicker.jsx'
import { useState } from "react";


export default function App() {
  const [colorSeleccionado, setcolorSeleccionado] = useState("#ff0000");
  const [ancho, setAncho] = useState(70);
  const [isDragging, setIsDragging] = useState(false);

  const handleColorChange = (color) => {
    setcolorSeleccionado(color);
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
        <Pixel color={colorSeleccionado} />
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
        <ColorPicker colorSeleccionado={colorSeleccionado} onChangeColor={handleColorChange}/>
      </aside>
    </>
  )
}

