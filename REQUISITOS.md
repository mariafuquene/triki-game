# Requisitos del juego Triki

## Tecnología
- HTML, CSS y JavaScript puro (sin React ni librerías).
- Tres archivos separados: `index.html`, `styles.css`, `script.js`.

## Diseño (rediseño estilo joyería)
- Estilo elegante **tipo joyería** que combine con las fichas: fondo oscuro
  profundo, acentos **plateados**, **dorados** y **azul zafiro**. Nada plano
  (usar degradados, brillos, sombras y relieve).
- Dirección elegida: **B) «Terciopelo nocturno»**, como un estuche de joyería.
  - Colores: terciopelo azul noche `#0b1033` → `#05060f`, filos plateados
    `#c0c6d4`, detalles dorados `#d4af37`, brillo zafiro `#3355ff`.
  - Tipografía: **Cinzel** (títulos, como grabado en metal) y **Lato** (textos).
  - Tablero: casillas de terciopelo hundidas (sombra interna) con borde
    plateado fino; las fichas "flotan" sin fondo.
  - Usuario 1 = piezas de **plata**, Usuario 2 = piezas de **oro**: las tarjetas
    de cada usuario usan su metal como acento.

## Distribución en 3 columnas (boceto en `originales/boceto.png`)
- **Arriba al centro:** título TRIKI y selector de temática.
- **Izquierda:** tarjeta de Usuario 1 con sus rondas ganadas debajo.
- **Centro:** "Turno de...", el tablero y debajo Empates y Total de juegos.
- **Derecha:** tarjeta de Usuario 2 con sus rondas ganadas debajo.
- **Abajo al centro:** botones Nueva ronda y Reiniciar marcador.
- En el computador todo debe caber en la pantalla **sin scroll**.
- En pantallas pequeñas (celular) se acomoda en **una sola columna**.
- Se hace con **CSS Grid**.

## Fichas
- Las fichas son **imágenes PNG** de la carpeta `img/` (piezas realistas de
  plata/oro grabado con zafiros azules), en lugar de emojis.
- Deben verse **completas y sin deformarse**, tanto en las casillas del tablero
  como en las tarjetas de los usuarios.
- Las imágenes ya están preparadas: **fondo transparente**, recortadas al
  contenido y reducidas a máx. 400 px (de ~29 MB a ~2 MB en total).
- Los originales en alta resolución se guardan en `originales/` (ignorada por
  git en `.gitignore`).

## Dinamismo
- En el fondo de la página, **X y O que aparecen y desaparecen suavemente**.
- **Brillo** en las casillas al pasar el mouse.
- La ficha **aparece con una animación** al ponerla.
- **Celebración visual al ganar**: la línea ganadora brilla.
- **Corona al ganar**: cuando un usuario gana una ronda, aparece una corona
  dorada (`img/corona.png`, oro con zafiros) sobre su nombre durante 2 a 3
  segundos, con animación de entrada y de salida.

## Jugadores y temáticas
- Dos jugadores: **Usuario 1** y **Usuario 2**.
- Se elige una temática y cada usuario recibe su ficha automáticamente:

| Temática     | Usuario 1          | Usuario 2             |
|--------------|--------------------|-----------------------|
| Clásico      | `img/x.png`        | `img/o.png`           |
| Mascotas     | `img/gato.png`     | `img/perro.png`       |
| Vehículos    | `img/carro.png`    | `img/moto.png`        |
| Día y noche  | `img/luna.png`     | `img/sol.png`         |
| Deportes     | `img/futbol.png`   | `img/basketball.png`  |

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
