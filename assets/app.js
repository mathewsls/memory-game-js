/**
 * Selecciona el contenedor donde se mostrarán las cartas en la cuadrícula.
 */
const gridContainer = document.querySelector(".grid-container");

/**
 * Array que contendrá las cartas del juego.
 */
let cards = [];

/**
 * Variables para almacenar la primera y segunda carta seleccionadas.
 */
let firstCard, secondCard;

/**
 * Variable para bloquear el tablero y evitar interacciones mientras se procesan las cartas.
 */
let lockBoard = false;

/**
 * Puntaje del jugador, incrementa con cada par de cartas volteadas.
 */
let score = 0;

/**
 * Selecciona el elemento HTML donde se mostrará el puntaje.
 * Asegúrate de que este elemento exista en tu HTML, por ejemplo: <span class="score"></span>
 */
let scoreElementHtml = document.querySelector(".score");
if (scoreElementHtml) {
  scoreElementHtml.textContent = score; // Inicializa el puntaje en el HTML
}

/**
 * Carga las cartas desde un archivo JSON, duplica las cartas para formar pares,
 * luego baraja y genera las cartas en el tablero.
 */
fetch("./assets/data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]; // Duplicar las cartas para los pares
    shuffleCards(); // Barajar las cartas
    generateCards(); // Generar las cartas en el tablero
  })
  .catch(error => console.error("Error cargando las cartas:", error)); // Manejo de errores en fetch

/**
 * Función para barajar las cartas usando el algoritmo de Fisher-Yates.
 */
function shuffleCards() {
  let currentIndex = cards.length;
  let randomIndex;
  let temporaryValue;

  // Mientras queden elementos por barajar...
  while (currentIndex !== 0) {
    // Escoge un elemento restante...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // Decrementar currentIndex

    // E intercámbialo con el elemento actual.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

/**
 * Genera los elementos HTML para cada carta y los añade al contenedor de la cuadrícula.
 */
function generateCards() {
  // Limpia el contenedor antes de generar nuevas cartas (útil para reiniciar)
  gridContainer.innerHTML = "";
  for (let card of cards) {
    const cardElement = document.createElement("div"); // Crea un div para la carta
    cardElement.classList.add("card"); // Añade la clase "card"
    cardElement.setAttribute("data-name", card.name); // Añade un atributo con el nombre de la carta
    cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src=${card.image} alt="${card.name}" />
            </div>
            <div class="back"></div>
        `; // Estructura interna de la carta (frontal y trasera)
    gridContainer.appendChild(cardElement); // Añade la carta al contenedor
    cardElement.addEventListener("click", flipCard); // Añade el evento para voltear la carta al hacer clic
  }
}

// --- Funciones del juego (movidas fuera de generateCards) ---

/**
 * Función que se ejecuta al hacer clic en una carta para voltearla.
 */
function flipCard() {
  if (lockBoard) return; // Si el tablero está bloqueado, no hacer nada
  if (this === firstCard) return; // Si se hace clic en la misma carta, no hacer nada

  this.classList.add("flipped"); // Voltear la carta (añadir clase CSS)

  if (!firstCard) {
    // Es la primera carta volteada
    firstCard = this;
    return;
  }

  // Es la segunda carta volteada
  secondCard = this;
  score++; // Incrementar el puntaje
  if (scoreElementHtml) { // Asegurarse de que el elemento exista antes de actualizar
    scoreElementHtml.textContent = score; // Actualizar el puntaje en el HTML
  }
  lockBoard = true; // Bloquear el tablero para evitar más clics

  checkForMatch(); // Comprobar si las cartas coinciden
}

/**
 * Comprueba si las dos cartas volteadas son iguales.
 */
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name; // Comparación estricta de nombres

  isMatch ? disableCards() : unflipCards(); // Si coinciden, deshabilitar; si no, voltear de nuevo
}

/**
 * Deshabilita las cartas que coinciden para que no puedan ser volteadas nuevamente.
 */
function disableCards() {
  // Las cartas coinciden, remover los event listeners para que no se puedan volver a voltear
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard(); // Reiniciar el estado del tablero
}

/**
 * Voltea las cartas que no coinciden después de un breve retraso.
 */
function unflipCards() {
  // Las cartas no coinciden, voltearlas de nuevo después de un tiempo
  setTimeout(() => {
    firstCard.classList.remove("flipped"); // Quitar clase para voltear la carta
    secondCard.classList.remove("flipped");
    resetBoard(); // Reiniciar el estado del tablero
  }, 1000); // Esperar 1 segundo antes de voltearlas
}

/**
 * Reinicia las variables que controlan el estado del tablero para la siguiente ronda.
 */
function resetBoard() {
  // Restablecer las variables para la próxima ronda
  [firstCard, secondCard, lockBoard] = [null, null, false];
  // También podríamos verificar si todas las cartas están volteadas para una condición de victoria
  checkWinCondition();
}

/**
 * Comprueba si todas las cartas han sido volteadas para determinar si el jugador ha ganado.
 */
function checkWinCondition() {
    const allCards = document.querySelectorAll(".card"); // Todas las cartas
    const flippedCards = document.querySelectorAll(".card.flipped"); // Cartas volteadas
    if (flippedCards.length === allCards.length && allCards.length > 0) {
        setTimeout(() => {
            alert("¡Felicidades, has ganado el juego!"); // Mensaje de victoria
            // Opcional: podrías llamar a restart() aquí o mostrar un botón de "jugar de nuevo"
        }, 500); // Pequeño retraso para que el usuario vea la última carta volteada
    }
}

/**
 * Reinicia el juego: reinicia el estado, el puntaje, baraja y genera las cartas nuevamente.
 */
function restart() {
  resetBoard(); // Restablecer el estado del tablero
  score = 0; // Reiniciar el puntaje
  if (scoreElementHtml) {
    scoreElementHtml.textContent = score; // Actualizar el puntaje en el HTML
  }
  shuffleCards(); // Barajar las cartas de nuevo
  generateCards(); // Generar un nuevo tablero con las cartas barajadas
}

