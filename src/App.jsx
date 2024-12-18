import './App.css'
import Pixel from './components/Pixel/Pixel.jsx'
import ColorPicker from './components/ColorPicker/ColorPicker.jsx'
import { useState } from "react";

const size = [15, 5];


export default function App() {
  const [colorSeleccionado, setcolorSeleccionado] = useState("#ff0000");
  const [variacionColor, setVariacionColor] = useState("#ff0000");
  const [transparencia, setTransparencia] = useState(100);
  const [ancho, setAncho] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDownForPaint, setIsMouseDownForPaint] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(null);

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

  const handleMouseDownForPaint = (buttonPressed) => {
    setIsMouseDownForPaint(true);
    setButtonPressed(buttonPressed);
  };

  const handleMouseUpForPaint = () => {
    setIsMouseDownForPaint(false);
  };

  return (
    <>
      <main className="App-main" style={{width: `${ancho}%`}}>
        <header className="App-main-header">
          <h1 className="App-main-header-h1">Pixel Art</h1>
        </header>
        <div className="App-main-div">
          {Array(size[0] * size[1]).fill().map((_, index) => (
            <Pixel 
              key={index} 
              color={variacionColor + Math.round(transparencia * 255 / 100).toString(16).padStart(2, '0')} 
              indiceColorFondo={
                size[0] % 2 === 0
                ? index + Math.floor(index / size[0])
                : index
              }
              onMouseDownForPaint={handleMouseDownForPaint}
              onMouseUpForPaint={handleMouseUpForPaint}
              isMouseDownForPaint={isMouseDownForPaint}
              buttonPressed={buttonPressed}
            />
          ))}
        </div>
      </main>
      <div 
        className="separador"
        onMouseDown={handleMouseDown}
        style={{
          cursor: "col-resize"
        }}
      >
      </div>
      <aside className="App-aside">
        <h2 className="App-aside-h2">Colores</h2>
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

