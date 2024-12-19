import './Input.css';
import { useState, useRef } from "react";

export default function Input({ text }) {
  const [value, setValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleOnDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus(); 
      inputRef.current?.select();
    }, 0);
  }

  const handleInput = (event) => {
    setValue(event.target.value);
  }

  const handleBlur = () => {
    setIsEditing(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur(); 
    }
  };

  return (
    <div className="Input">
      <span 
        className="Input-span" 
        onDoubleClick={handleOnDoubleClick} 
        style={
          isEditing ? { display: 'none' } : { display: 'block' }
        }
      >
        {value}
      </span>
      <input 
        type="text" 
        value={value}
        ref={inputRef}
        className="Input-input" 
        onInput={handleInput} 
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={
          isEditing ? { display: 'block' } : { display: 'none' }
        }
      />
    </div>
  );
}