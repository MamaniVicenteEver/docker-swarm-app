// Importar el componente de esferas
import Spheres2Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.8/build/backgrounds/spheres2.cdn.min.js';

// Inicializar el fondo animado
const bg = Spheres2Background(document.getElementById('webgl-canvas'), {
  count: 200,
  colors: [0x00bcd4, 0xffffff, 0x4caf50], // Colores de las esferas
  minSize: 0.5,
  maxSize: 1.5,
  backgroundColor: 0x000000 // ⬅️ Fondo negro (nuevo parámetro)
});

// Botón de Simular Actualización
const button1 = document.getElementById('colors-btn');
button1.addEventListener('click', () => {
  bg.spheres.setColors([0x00bcd4 * Math.random(), 0xffffff * Math.random(), 0x4caf50 * Math.random()]);
  bg.spheres.light1.color.set(0xff9800); // Color naranja para indicar actualización
  alert("Simulando Rolling Update: Nodos actualizados gradualmente.");
});

// Botón de Cambiar Versión (Blue-Green Deployment)
const button2 = document.getElementById('blue-green-btn');
let isBlue = true;

button2.addEventListener('click', () => {
  if (isBlue) {
    bg.spheres.setColors([0x2196f3, 0xffffff, 0x4caf50]); // Azul (versión Blue)
    alert("Cambiando a la versión Blue.");
  } else {
    bg.spheres.setColors([0xf44336, 0xffffff, 0x4caf50]); // Rojo (versión Green)
    alert("Cambiando a la versión Green.");
  }
  isBlue = !isBlue;
});