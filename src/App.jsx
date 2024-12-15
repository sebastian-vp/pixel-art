import './App.css'
import Pixel from './components/Pixel/Pixel.jsx'
import ColorPicker from './components/ColorPicker/ColorPicker.jsx'
import { useState } from "react";


export default function App() {
  const [color, setColor] = useState("#ff0000");

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <>
      {/* <Pixel color={color} /> */}
      <ColorPicker color={color} changeColor={handleColorChange}/>
    </>
  )
}

