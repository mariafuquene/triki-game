# Requisitos del juego Triki

## Tecnología
- HTML, CSS y JavaScript puro (sin React ni librerías).
- Tres archivos separados: `index.html`, `styles.css`, `script.js`.

## Diseño
- Limpio y minimalista, con colores alegres.
- Estilo "gamer": fondo con degradado animado rosado → morado → azul (los colores
  del título), panel de vidrio oscuro y brillos de neón.
- Animaciones sutiles al poner una ficha y al pasar el mouse por las casillas.
- Fichas como **imágenes 3D** (Fluent Emoji 3D de Microsoft, licencia MIT) guardadas
  en la carpeta `img/`, en lugar de emojis de texto. Se implementa en el Paso 6.

## Jugadores y temáticas
- Dos jugadores: **Usuario 1** y **Usuario 2**.
- Se elige una temática y cada usuario recibe su ficha automáticamente:

| Temática     | Usuario 1 | Usuario 2 |
|--------------|-----------|-----------|
| Clásico      | ❌        | ⭕        |
| Mascotas     | 🐱        | 🐶        |
| Vehículos    | 🚗        | 🏍️        |
| Día y noche  | ☀️        | 🌙        |
| Deportes     | ⚽        | 🏀        |

- Cambiar de temática **no** borra los contadores.

## Marcadores
- Debajo de Usuario 1: contador de rondas ganadas.
- Debajo de Usuario 2: contador de rondas ganadas.
- Debajo del tablero: contador de empates y contador de total de juegos.

## Tablero
- Resaltar las 3 casillas ganadoras.

## Botones
- **Nueva ronda**: limpia el tablero y conserva los contadores.
- **Reiniciar marcador**: pone todo en cero.
