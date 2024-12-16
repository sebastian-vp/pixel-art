// rgbToHex: list(int) -> string
// Recibe una lista que representa un color en RGB y retorna el código hexadecimal equivalente.
export function rgbToHex(rgb) {
  return "#" + rgb.map((color) => {
    const hex = color.toString(16);
    return hex.length === 1 ? "0" + hex : hex
  }).join("");
};


// hexToRgb: string -> list(int)
// Recibe un código hexadecimal y retorna una lista con los valores RGB equivalentes.
export function hexToRgb(hex) {
  return [
    parseInt(hex.substring(1, 3), 16),
    parseInt(hex.substring(3, 5), 16),
    parseInt(hex.substring(5, 7), 16)
  ];
}


// multiplicarColores: string, string -> string
// Recibe dos códigos hexadecimales y retorna un nuevo color que resulta de multiplicar los colores.
export function multiplicarColores(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const rgb = rgb1.map((color, i) => Math.round((color * rgb2[i]) / 255));

  return rgbToHex(rgb);
}


// interpolarCanal: int, int, float -> int
// Recibe dos valores enteros y un factor de interpolación y retorna el valor resultante de interpolar los dos valores.
export function interpolarCanal(start, end, factor) {
  return Math.round(start + (end - start) * factor);
}


// interpolarColorRgb: list(int), list(int), float -> list(int)
// Recibe dos listas de valores RGB y un factor de interpolación y retorna una lista con los valores RGB resultantes de interpolar los dos colores.
export function interpolarColorRgb(rgbInicial, rgbFinal, factor) {
  return rgbInicial.map((start, i) => interpolarCanal(start, rgbFinal[i], factor));
}


// interpolarColor: string, string, float -> string
// Recibe dos códigos hexadecimales y un factor de interpolación y retorna un nuevo color que resulta de interpolar los dos colores.
export function interpolarColorHex(hexInicial, hexFinal, factor) {
  const rgbInicial = hexToRgb(hexInicial);
  const rgbFinal = hexToRgb(hexFinal);

  const rgb = interpolarColorRgb(rgbInicial, rgbFinal, factor);
  return rgbToHex(rgb);
}

