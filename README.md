# Guía para Crear una Aplicación de Clima para Principiantes

Esta guía está diseñada para ayudarte a crear una aplicación web sencilla de clima paso a paso, explicada de forma clara para quienes están comenzando en el desarrollo web.

---

## Estructura del Proyecto

- `index.html`: Archivo principal con la estructura HTML.
- `assets/app.js`: Archivo con la lógica en JavaScript.
- `assets/styles.css`: Archivo con los estilos CSS.
- `assets/data/cards.json`: Archivo JSON con datos de ejemplo (opcional).
- `assets/images/`: Carpeta con imágenes usadas en la aplicación.

---

## Paso 1: Crear el Archivo HTML (`index.html`)

1. Abre tu editor de código y crea un archivo llamado `index.html`.
2. Copia y pega la siguiente estructura básica:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aplicación de Clima</title>
    <link rel="stylesheet" href="assets/styles.css" />
    <script src="assets/app.js" defer></script>
</head>
<body>
    <h1>Aplicación de Clima</h1>
    <input type="text" id="inputCiudad" placeholder="Ingresa una ciudad" />
    <button id="btnBuscar">Buscar Clima</button>
    <div id="resultado"></div>
</body>
</html>
```

---

## Paso 2: Crear el Archivo de Estilos (`assets/styles.css`)

1. Crea la carpeta `assets` si no existe.
2. Dentro de `assets`, crea un archivo llamado `styles.css`.
3. Añade estos estilos básicos para que la aplicación se vea bien:

```css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f0f8ff;
}
h1 {
    color: #333;
}
input, button {
    padding: 10px;
    margin: 5px 0;
    font-size: 16px;
}
#resultado {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    max-width: 400px;
}
```

---

## Paso 3: Crear la Lógica en JavaScript (`assets/app.js`)

1. En la carpeta `assets`, crea un archivo llamado `app.js`.
2. Copia y pega el siguiente código:

```javascript
// Obtener referencias a los elementos del DOM
const inputCiudad = document.getElementById('inputCiudad');
const btnBuscar = document.getElementById('btnBuscar');
const resultado = document.getElementById('resultado');

// Función para obtener el clima (simulada para principiantes)
function obtenerClima(ciudad) {
    // Aquí normalmente harías una llamada a una API externa
    // Para este ejemplo, simularemos una respuesta
    return {
        ciudad: ciudad,
        temperatura: '25°C',
        descripcion: 'Soleado',
        humedad: '40%'
    };
}

// Función para mostrar el resultado en la página
function mostrarResultado(datos) {
    resultado.innerHTML = `
        <h2>Clima en ${datos.ciudad}</h2>
        <p>Temperatura: ${datos.temperatura}</p>
        <p>Descripción: ${datos.descripcion}</p>
        <p>Humedad: ${datos.humedad}</p>
    `;
}

// Evento para el botón de buscar
btnBuscar.addEventListener('click', () => {
    const ciudad = inputCiudad.value.trim();
    if (ciudad === '') {
        alert('Por favor, ingresa una ciudad válida.');
        return;
    }
    const datosClima = obtenerClima(ciudad);
    mostrarResultado(datosClima);
});
```

3. Explicación: En un proyecto real, usarías una API externa para obtener datos reales, pero aquí simulamos la respuesta para facilitar el aprendizaje.

---

## Paso 4: Probar la Aplicación

1. Abre el archivo `index.html` en tu navegador.
2. Escribe el nombre de una ciudad en el campo de texto.
3. Haz clic en "Buscar Clima".
4. Verifica que aparezca la información simulada del clima.
5. Prueba ingresar un campo vacío para ver que el sistema muestra un mensaje de error.