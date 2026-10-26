# Instrucciones para Claude

Estoy aprendiendo desarrollo web (HTML, CSS, JS básico) y construyo un triki
**paso a paso** para aprender. Los requisitos del juego están en `REQUISITOS.md`.

## Reglas para ayudarme
- Vamos **un paso a la vez** y espera mi confirmación antes de avanzar.
- Explícame cada parte del código y por qué se hace así.
- Cada vez que me des un comando de terminal, explícame para qué sirve y qué hace cada parte.
- Al terminar cada paso, hacemos `git add`, `commit` y `push`, explicándome cada uno.
- Usa HTML, CSS y JavaScript puro (sin React ni librerías), en 3 archivos separados:
  `index.html`, `styles.css`, `script.js`.
- Responde en español.

## Plan de pasos
1. Estructura en `index.html`.
2. Estilos en `styles.css` (diseño, colores, animaciones).
3. Lógica básica en `script.js` (turnos, poner fichas).
4. Detectar ganador/empate y resaltar casillas ganadoras.
5. Contadores y botones (Nueva ronda / Reiniciar marcador).
6. Temáticas (cambiar fichas sin borrar contadores) + fichas como imágenes PNG
   de joyería (plata/oro con zafiros) en `img/`.
7. Rediseño «Terciopelo nocturno»: colores, tipografía (Cinzel + Lato) y tablero.
8. Dinamismo: X y O en el fondo, brillo al pasar el mouse, animación al poner
   ficha y celebración de la línea ganadora (`@keyframes`).
9. Distribución en 3 columnas con CSS Grid (sin scroll en computador, una
   columna en celular), según `originales/boceto.png`.
10. Corona dorada sobre el nombre del ganador (2–3 s, entrada y salida).

## Progreso
- [x] Paso 1 — Estructura HTML (commit 4816f98)
- [x] Paso 2 — Estilos CSS
- [x] Paso 3 — Lógica básica JS (turnos, poner fichas)
- [x] Paso 4 — Detectar ganador/empate y resaltar casillas ganadoras + estilo gamer
- [x] Paso 5 — Contadores y botones (Nueva ronda / Reiniciar marcador)
- [x] Paso 6 — Temáticas + fichas como imágenes PNG
- [x] Paso 7 — Rediseño «Terciopelo nocturno»
- [x] Paso 8 — Dinamismo y animaciones
- [x] Paso 9 — Distribución en 3 columnas (CSS Grid)
- [x] Paso 10 — Corona al ganar
