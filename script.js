// ===== Estado del juego =====
// Ficha de cada usuario (por ahora, solo la temática clásica)
const fichas = { 1: '❌', 2: '⭕' };

// Qué hay en cada casilla: null = vacía, 1 = Usuario 1, 2 = Usuario 2
let tablero = [null, null, null, null, null, null, null, null, null];

// De quién es el turno: 1 o 2
let turno = 1;

// Se vuelve true cuando alguien gana o hay empate
let juegoTerminado = false;

// Las 8 formas de hacer 3 en línea (posiciones del tablero)
const combinacionesGanadoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6]             // diagonales
];

// ===== Elementos del HTML =====
const casillas = document.querySelectorAll('.casilla');
const estado = document.getElementById('estado');
const jugador1 = document.getElementById('jugador-1');
const jugador2 = document.getElementById('jugador-2');
const tableroHTML = document.getElementById('tablero');

// ===== Funciones =====

// Muestra de quién es el turno y resalta su tarjeta
function actualizarTurno() {
  estado.textContent = `Turno de Usuario ${turno}`;
  jugador1.classList.toggle('activo', turno === 1);
  jugador2.classList.toggle('activo', turno === 2);
}

// Devuelve la combinación ganadora (ej. [0, 4, 8]) o null si nadie ha ganado
function buscarGanador() {
  for (const combinacion of combinacionesGanadoras) {
    const [a, b, c] = combinacion;
    if (tablero[a] !== null && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return combinacion;
    }
  }
  return null;
}

// Termina la ronda: bloquea el tablero y quita el resaltado de turno
function terminarJuego() {
  juegoTerminado = true;
  tableroHTML.classList.add('terminado');
  jugador1.classList.remove('activo');
  jugador2.classList.remove('activo');
}

// Se ejecuta cada vez que se hace clic en una casilla
function jugar(evento) {
  const casilla = evento.target;
  const indice = Number(casilla.dataset.indice);

  // Si la ronda terminó o la casilla ya tiene ficha, no hacemos nada
  if (juegoTerminado || tablero[indice] !== null) {
    return;
  }

  // Guardamos la jugada y la mostramos
  tablero[indice] = turno;
  casilla.textContent = fichas[turno];
  casilla.classList.add('ocupada');

  // ¿Ganó alguien?
  const combinacion = buscarGanador();
  if (combinacion !== null) {
    combinacion.forEach(function (i) {
      casillas[i].classList.add('ganadora');
    });
    estado.textContent = `¡Ganó Usuario ${turno}! 🎉`;
    terminarJuego();
    return;
  }

  // ¿Se llenó el tablero sin ganador?
  if (!tablero.includes(null)) {
    estado.textContent = '¡Empate! 🤝';
    terminarJuego();
    return;
  }

  // Pasamos el turno al otro usuario
  turno = turno === 1 ? 2 : 1;
  actualizarTurno();
}

// ===== Inicio =====
casillas.forEach(function (casilla) {
  casilla.addEventListener('click', jugar);
});

actualizarTurno();
