// ===== Estado del juego =====
// Ficha de cada usuario (por ahora, solo la temática clásica)
const fichas = { 1: '❌', 2: '⭕' };

// Qué hay en cada casilla: null = vacía, 1 = Usuario 1, 2 = Usuario 2
let tablero = [null, null, null, null, null, null, null, null, null];

// De quién es el turno: 1 o 2
let turno = 1;

// ===== Elementos del HTML =====
const casillas = document.querySelectorAll('.casilla');
const estado = document.getElementById('estado');
const jugador1 = document.getElementById('jugador-1');
const jugador2 = document.getElementById('jugador-2');

// ===== Funciones =====

// Muestra de quién es el turno y resalta su tarjeta
function actualizarTurno() {
  estado.textContent = `Turno de Usuario ${turno}`;
  jugador1.classList.toggle('activo', turno === 1);
  jugador2.classList.toggle('activo', turno === 2);
}

// Se ejecuta cada vez que se hace clic en una casilla
function jugar(evento) {
  const casilla = evento.target;
  const indice = Number(casilla.dataset.indice);

  // Si la casilla ya tiene ficha, no hacemos nada
  if (tablero[indice] !== null) {
    return;
  }

  // Guardamos la jugada y la mostramos
  tablero[indice] = turno;
  casilla.textContent = fichas[turno];
  casilla.classList.add('ocupada');

  // Pasamos el turno al otro usuario
  turno = turno === 1 ? 2 : 1;
  actualizarTurno();
}

// ===== Inicio =====
casillas.forEach(function (casilla) {
  casilla.addEventListener('click', jugar);
});

actualizarTurno();
