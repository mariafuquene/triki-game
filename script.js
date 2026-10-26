// ===== Estado del juego =====
// Ficha de cada usuario (por ahora, solo la temática clásica):
// src = ruta de la imagen, alt = texto que la describe
const fichas = {
  1: { src: 'img/x.png', alt: 'X de plata con zafiros' },
  2: { src: 'img/o.png', alt: 'O de oro con zafiros' }
};

// Qué hay en cada casilla: null = vacía, 1 = Usuario 1, 2 = Usuario 2
let tablero = [null, null, null, null, null, null, null, null, null];

// De quién es el turno: 1 o 2
let turno = 1;

// Se vuelve true cuando alguien gana o hay empate
let juegoTerminado = false;

// Marcador: rondas ganadas por cada usuario, empates y total de juegos
let victorias = { 1: 0, 2: 0 };
let empates = 0;
let totalJuegos = 0;

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
const victorias1HTML = document.getElementById('victorias-1');
const victorias2HTML = document.getElementById('victorias-2');
const empatesHTML = document.getElementById('empates');
const totalJuegosHTML = document.getElementById('total-juegos');
const btnNuevaRonda = document.getElementById('btn-nueva-ronda');
const btnReiniciar = document.getElementById('btn-reiniciar');

// ===== Funciones =====

// Muestra de quién es el turno y resalta su tarjeta
function actualizarTurno() {
  estado.textContent = `Turno de Usuario ${turno}`;
  jugador1.classList.toggle('activo', turno === 1);
  jugador2.classList.toggle('activo', turno === 2);
}

// Copia los números del marcador a la pantalla
function actualizarMarcador() {
  victorias1HTML.textContent = victorias[1];
  victorias2HTML.textContent = victorias[2];
  empatesHTML.textContent = empates;
  totalJuegosHTML.textContent = totalJuegos;
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

// Termina la ronda: bloquea el tablero, quita el resaltado de turno y actualiza el marcador
function terminarJuego() {
  juegoTerminado = true;
  tableroHTML.classList.add('terminado');
  jugador1.classList.remove('activo');
  jugador2.classList.remove('activo');
  totalJuegos++;
  actualizarMarcador();
}

// Se ejecuta cada vez que se hace clic en una casilla
function jugar(evento) {
  // currentTarget = el botón que tiene el "escuchador" (no la imagen de adentro)
  const casilla = evento.currentTarget;
  const indice = Number(casilla.dataset.indice);

  // Si la ronda terminó o la casilla ya tiene ficha, no hacemos nada
  if (juegoTerminado || tablero[indice] !== null) {
    return;
  }

  // Guardamos la jugada y la mostramos creando una imagen <img> dentro de la casilla
  tablero[indice] = turno;
  const imagen = document.createElement('img');
  imagen.src = fichas[turno].src;
  imagen.alt = fichas[turno].alt;
  imagen.className = 'ficha';
  casilla.appendChild(imagen);
  casilla.classList.add('ocupada');

  // ¿Ganó alguien?
  const combinacion = buscarGanador();
  if (combinacion !== null) {
    combinacion.forEach(function (i) {
      casillas[i].classList.add('ganadora');
    });
    estado.textContent = `¡Ganó Usuario ${turno}! 🎉`;
    victorias[turno]++;
    terminarJuego();
    return;
  }

  // ¿Se llenó el tablero sin ganador?
  if (!tablero.includes(null)) {
    estado.textContent = '¡Empate! 🤝';
    empates++;
    terminarJuego();
    return;
  }

  // Pasamos el turno al otro usuario
  turno = turno === 1 ? 2 : 1;
  actualizarTurno();
}

// Limpia el tablero para jugar otra ronda (el marcador se conserva)
function nuevaRonda() {
  tablero = [null, null, null, null, null, null, null, null, null];
  turno = 1;
  juegoTerminado = false;
  tableroHTML.classList.remove('terminado');

  casillas.forEach(function (casilla) {
    casilla.textContent = '';
    casilla.classList.remove('ocupada', 'ganadora');
  });

  actualizarTurno();
}

// Pone todo el marcador en cero y empieza una ronda nueva
function reiniciarMarcador() {
  victorias = { 1: 0, 2: 0 };
  empates = 0;
  totalJuegos = 0;
  actualizarMarcador();
  nuevaRonda();
}

// ===== Inicio =====
casillas.forEach(function (casilla) {
  casilla.addEventListener('click', jugar);
});

btnNuevaRonda.addEventListener('click', nuevaRonda);
btnReiniciar.addEventListener('click', reiniciarMarcador);

actualizarTurno();
