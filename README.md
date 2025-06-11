# Guía Detallada para Crear un Juego de Memoria en JavaScript (Para Principiantes)

Esta guía explica paso a paso cómo crear un juego de memoria desde cero, explicando cada concepto y línea de código para que cualquier persona, incluso sin experiencia previa en JavaScript, pueda entender y seguirla.

---

## Paso 1: ¿Qué es un Juego de Memoria?

Un juego de memoria consiste en un conjunto de cartas boca abajo. El jugador voltea dos cartas a la vez tratando de encontrar pares iguales. Si las cartas coinciden, permanecen volteadas; si no, se vuelven a voltear. El objetivo es encontrar todos los pares.

---

## Paso 2: Estructura Básica del Proyecto

Vamos a crear una carpeta llamada `memory-game` con estos archivos y carpetas:

- `index.html`: archivo principal donde estará la estructura de la página.
- `assets/`: carpeta que contendrá los archivos de estilos, scripts y datos.
  - `styles.css`: archivo con los estilos CSS para que el juego se vea bonito.
  - `app.js`: archivo con la lógica del juego en JavaScript.
  - `data/cards.json`: archivo con los datos de las cartas (nombre e imagen).

---

## Paso 3: Crear el Archivo HTML (`index.html`)

Este archivo define la estructura visible de la página web.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Juego de Memoria</title>
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
  <h1>Juego de Memoria</h1>

  <!-- Contenedor para mostrar el puntaje -->
  <div class="score-container">
    Puntaje: <span class="score">0</span>
  </div>

  <!-- Contenedor donde se mostrarán las cartas -->
  <div class="grid-container"></div>

  <!-- Botón para reiniciar el juego -->
  <button id="restart-button">Reiniciar Juego</button>

  <!-- Carga el archivo JavaScript con la lógica del juego -->
  <script src="assets/app.js"></script>
</body>
</html>
```

- `<div class="grid-container"></div>` es donde aparecerán las cartas.
- `<span class="score">0</span>` muestra el puntaje actual.
- El botón con id `restart-button` permitirá reiniciar el juego.

---

## Paso 4: Crear el Archivo JSON con las Cartas (`assets/data/cards.json`)

Este archivo contiene un arreglo de objetos, cada uno representando una carta con un nombre y la ruta a su imagen.

```json
[
  { "name": "cereza", "image": "assets/images/cherries.png" },
  { "name": "limon", "image": "assets/images/lemon.png" },
  { "name": "fresa", "image": "assets/images/strawberry.png" },
  { "name": "uva", "image": "assets/images/grapes.png" },
  { "name": "naranja", "image": "assets/images/orange.png" },
  { "name": "piña", "image": "assets/images/pineapple.png" }
]
```

Cada objeto tiene dos propiedades:
- `name`: un identificador único para la carta.
- `image`: la ruta a la imagen que se mostrará en la carta.

---

## Paso 5: Estilos CSS Básicos (`assets/styles.css`)

Los estilos hacen que el juego se vea organizado y atractivo.

```css
/* Estilo general del cuerpo */
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f0f0f0;
}

/* Contenedor de la cuadrícula de cartas */
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 100px); /* 4 columnas de 100px */
  grid-gap: 15px; /* Espacio entre cartas */
  justify-content: center;
  margin: 20px auto;
}

/* Estilo de cada carta */
.card {
  width: 100px;
  height: 140px;
  perspective: 600px; /* Para efecto 3D */
  cursor: pointer;
  position: relative;
}

/* Parte frontal y trasera de la carta */
.card .front, .card .back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden; /* Oculta la parte trasera cuando está volteada */
  border-radius: 10px;
}

/* Parte frontal visible inicialmente */
.card .front {
  background: white;
  transform: rotateY(0deg);
  z-index: 2;
}

/* Parte trasera oculta inicialmente */
.card .back {
  background: #333;
  transform: rotateY(180deg);
}

/* Cuando la carta está volteada, se intercambian las caras */
.card.flipped .front {
  transform: rotateY(180deg);
}

.card.flipped .back {
  transform: rotateY(0deg);
}

/* Contenedor del puntaje */
.score-container {
  font-size: 1.2em;
  margin-bottom: 10px;
}

/* Estilo del botón reiniciar */
#restart-button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
}
```

---

## Paso 6: Lógica JavaScript Paso a Paso (`assets/app.js`)

### 6.1 Seleccionar elementos del DOM

```js
// Selecciona el contenedor donde se mostrarán las cartas
const gridContainer = document.querySelector(".grid-container");

// Array para guardar las cartas
let cards = [];

// Variables para la primera y segunda carta seleccionadas
let firstCard, secondCard;

// Variable para bloquear el tablero mientras se procesan cartas
let lockBoard = false;

// Puntaje inicial
let score = 0;

// Selecciona el elemento donde se mostrará el puntaje
let scoreElementHtml = document.querySelector(".score");
if (scoreElementHtml) {
  scoreElementHtml.textContent = score; // Inicializa el puntaje en 0
}
```

### 6.2 Cargar las cartas desde el archivo JSON

```js
fetch("./assets/data/cards.json")
  .then((res) => res.json()) // Convierte la respuesta a JSON
  .then((data) => {
    cards = [...data, ...data]; // Duplica las cartas para formar pares
    shuffleCards(); // Baraja las cartas
    generateCards(); // Genera las cartas en el tablero
  })
  .catch(error => console.error("Error cargando las cartas:", error)); // Manejo de errores
```

### 6.3 Función para barajar las cartas (algoritmo Fisher-Yates)

```js
function shuffleCards() {
  let currentIndex = cards.length, randomIndex, temporaryValue;

  // Mientras queden cartas por barajar
  while (currentIndex !== 0) {
    // Escoge una carta aleatoria
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Intercambia la carta actual con la aleatoria
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}
```

### 6.4 Generar las cartas en el DOM

```js
function generateCards() {
  gridContainer.innerHTML = ""; // Limpia el contenedor

  // Por cada carta en el array
  for (let card of cards) {
    const cardElement = document.createElement("div"); // Crea un div
    cardElement.classList.add("card"); // Añade clase "card"
    cardElement.setAttribute("data-name", card.name); // Añade atributo con nombre

    // Estructura interna de la carta (frontal y trasera)
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} alt="${card.name}" />
      </div>
      <div class="back"></div>
    `;

    gridContainer.appendChild(cardElement); // Añade la carta al contenedor

    // Añade evento para voltear la carta al hacer clic
    cardElement.addEventListener("click", flipCard);
  }
}
```

### 6.5 Función para voltear cartas

```js
function flipCard() {
  if (lockBoard) return; // Si el tablero está bloqueado, no hacer nada
  if (this === firstCard) return; // Si se hace clic en la misma carta, no hacer nada

  this.classList.add("flipped"); // Voltea la carta

  if (!firstCard) {
    firstCard = this; // Guarda la primera carta
    return;
  }

  secondCard = this; // Guarda la segunda carta
  score++; // Incrementa el puntaje

  if (scoreElementHtml) {
    scoreElementHtml.textContent = score; // Actualiza el puntaje en pantalla
  }

  lockBoard = true; // Bloquea el tablero para evitar más clics

  checkForMatch(); // Comprueba si las cartas coinciden
}
```

### 6.6 Comprobar si las cartas coinciden

```js
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name; // Compara nombres

  if (isMatch) {
    disableCards(); // Si coinciden, deshabilita las cartas
  } else {
    unflipCards(); // Si no, las voltea de nuevo
  }
}
```

### 6.7 Deshabilitar cartas coincidentes

```js
function disableCards() {
  firstCard.removeEventListener("click", flipCard); // Quita evento clic
  secondCard.removeEventListener("click", flipCard);

  resetBoard(); // Reinicia variables para siguiente turno
}
```

### 6.8 Voltear cartas no coincidentes

```js
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped"); // Quita clase para voltear
    secondCard.classList.remove("flipped");

    resetBoard(); // Reinicia variables
  }, 1000); // Espera 1 segundo antes de voltear
}
```

### 6.9 Reiniciar variables para siguiente turno

```js
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false]; // Resetea variables
  checkWinCondition(); // Comprueba si el juego terminó
}
```

### 6.10 Comprobar condición de victoria

```js
function checkWinCondition() {
  const allCards = document.querySelectorAll(".card"); // Todas las cartas
  const flippedCards = document.querySelectorAll(".card.flipped"); // Cartas volteadas

  if (flippedCards.length === allCards.length && allCards.length > 0) {
    setTimeout(() => {
      alert("¡Felicidades, has ganado el juego!"); // Mensaje de victoria
      // Aquí podrías reiniciar el juego o mostrar opciones
    }, 500); // Pequeño retraso para que se vea la última carta
  }
}
```

### 6.11 Función para reiniciar el juego

```js
function restart() {
  resetBoard(); // Reinicia variables
  score = 0; // Reinicia puntaje

  if (scoreElementHtml) {
    scoreElementHtml.textContent = score; // Actualiza puntaje en pantalla
  }

  shuffleCards(); // Baraja cartas
  generateCards(); // Genera cartas nuevas
}

// Añade evento al botón reiniciar
document.querySelector("#restart-button").addEventListener("click", restart);
```

---