// ===== Estado del juego =====
// Las 5 temáticas. Cada una tiene la ficha del Usuario 1 y la del Usuario 2:
// src = ruta de la imagen, alt = texto que la describe
const tematicas = {
  clasico: {
    1: { src: 'img/x.png', alt: 'X de plata con zafiros' },
    2: { src: 'img/o.png', alt: 'O de oro con zafiros' }
  },
  mascotas: {
    1: { src: 'img/gato.png', alt: 'Gato de plata con zafiros' },
    2: { src: 'img/perro.png', alt: 'Perro de oro con zafiros' }
  },
  vehiculos: {
    1: { src: 'img/carro.png', alt: 'Carro de plata con zafiros' },
    2: { src: 'img/moto.png', alt: 'Moto de oro con zafiros' }
  },
  dianoche: {
    1: { src: 'img/luna.png', alt: 'Luna de plata con zafiros' },
    2: { src: 'img/sol.png', alt: 'Sol de oro con zafiros' }
  },
  deportes: {
    1: { src: 'img/futbol.png', alt: 'Balón de fútbol de plata con zafiros' },
    2: { src: 'img/basketball.png', alt: 'Balón de baloncesto de oro con zafiros' }
  }
};

// Fichas de la temática elegida (empieza en clásico)
let fichas = tematicas.clasico;

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

// "Recordatorio" pendiente para quitar la corona (lo devuelve setTimeout)
let temporizadorCorona = null;

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
const selectorTematica = document.getElementById('selector-tematica');
const ficha1HTML = document.getElementById('ficha-1');
const ficha2HTML = document.getElementById('ficha-2');
const fondoDecorativo = document.getElementById('fondo-decorativo');

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

// Muestra la corona sobre la tarjeta del ganador durante 2,6 segundos
function mostrarCorona(usuario) {
  const tarjeta = usuario === 1 ? jugador1 : jugador2;

  // Si había una corona en camino, la cancelamos para empezar de cero
  clearTimeout(temporizadorCorona);
  jugador1.classList.remove('coronado');
  jugador2.classList.remove('coronado');

  // Truco para repetir la animación: leer offsetWidth obliga al navegador a
  // "notar" que la clase se quitó antes de volver a ponerla
  void tarjeta.offsetWidth;

  // Poner la clase dispara la animación del CSS...
  tarjeta.classList.add('coronado');

  // ...y 2600 ms después (lo que dura la animación) la quitamos
  temporizadorCorona = setTimeout(function () {
    tarjeta.classList.remove('coronado');
  }, 2600);
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
    // posicion = 0, 1, 2: el CSS la usa para que el brillo vaya casilla tras casilla
    combinacion.forEach(function (i, posicion) {
      casillas[i].style.setProperty('--orden', posicion);
      casillas[i].classList.add('ganadora');
    });
    estado.textContent = `¡Ganó Usuario ${turno}! 🎉`;
    victorias[turno]++;
    mostrarCorona(turno);
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

// Usa las fichas de la temática elegida en el menú y empieza una ronda nueva
// (el marcador NO se toca)
function cambiarTematica() {
  fichas = tematicas[selectorTematica.value];

  ficha1HTML.src = fichas[1].src;
  ficha1HTML.alt = fichas[1].alt;
  ficha2HTML.src = fichas[2].src;
  ficha2HTML.alt = fichas[2].alt;

  nuevaRonda();
}

// Crea las X y O del fondo, cada una con posición, tamaño y ritmo al azar
function crearAdornos() {
  for (let i = 0; i < 14; i++) {
    const adorno = document.createElement('img');
    adorno.src = i % 2 === 0 ? 'img/x.png' : 'img/o.png';  // pares X, impares O
    adorno.alt = '';                                         // decorativa: sin descripción
    adorno.className = 'adorno';

    adorno.style.left = Math.random() * 100 + '%';
    adorno.style.top = Math.random() * 100 + '%';
    adorno.style.width = 40 + Math.random() * 70 + 'px';            // entre 40 y 110 px
    adorno.style.animationDuration = 6 + Math.random() * 6 + 's';   // entre 6 y 12 s
    adorno.style.animationDelay = -Math.random() * 12 + 's';        // negativo: ya empezada

    fondoDecorativo.appendChild(adorno);
  }
}

// ===== Inicio =====
casillas.forEach(function (casilla) {
  casilla.addEventListener('click', jugar);
});

btnNuevaRonda.addEventListener('click', nuevaRonda);
btnReiniciar.addEventListener('click', reiniciarMarcador);
selectorTematica.addEventListener('change', cambiarTematica);

// Al cargar la página usamos la temática que muestre el menú
// (algunos navegadores recuerdan la última opción elegida al recargar)
cambiarTematica();
crearAdornos();
