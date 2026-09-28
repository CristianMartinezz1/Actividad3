# 🐾 UIComponents — Carrusel dinámico y barras de progreso animadas

> Librería JavaScript **sin frameworks** para crear, con muy poco código, un **carrusel de imágenes** y **barras de progreso animadas** que reaccionan entre sí.

**Actividad 3 · Componentes Visuales** — Ingeniería en Sistemas Computacionales, Instituto Tecnológico de Oaxaca
**Autor:** Cristian

---

## 📑 Tabla de contenido

1. [¿Qué problema resuelve?](#-qué-problema-resuelve)
2. [Componentes incluidos](#-componentes-incluidos)
3. [Estructura del proyecto](#-estructura-del-proyecto)
4. [Instalación](#-instalación)
5. [Uso](#-uso)
   - [Carrusel](#1-carrusel-initanimalcarousel)
   - [Barra de progreso](#2-barra-de-progreso-animateprogressbar)
   - [Carrusel + barras sincronizados](#3-carrusel--barras-sincronizados-ejemplo-completo)
   - [Reutilización con otro contenido](#4-reutilización-con-otro-contenido)
6. [Referencia de la API](#-referencia-de-la-api)
7. [Personalización](#-personalización)
8. [Tecnologías](#-tecnologías)

---

## 🎯 ¿Qué problema resuelve?

Mostrar una galería de imágenes con información asociada (por ejemplo, datos o estadísticas de cada elemento) normalmente implica:

- Escribir a mano el HTML de cada diapositiva.
- Programar la lógica de navegación (siguiente / anterior / volver al inicio).
- Mantener sincronizados los indicadores visuales con la imagen que se está viendo.
- Depender de librerías pesadas como jQuery, React o Vue.

**UIComponents** resuelve esto con una clase de JavaScript puro que:

- ✅ **Genera las diapositivas dinámicamente** a partir de un arreglo de objetos.
- ✅ **Navega en bucle infinito** (después de la última imagen vuelve a la primera y viceversa).
- ✅ **Avisa cuando cambia la diapositiva** mediante un *callback*, para actualizar cualquier otra parte de la página.
- ✅ **Anima barras de progreso** con transición suave y etiquetas actualizables.
- ✅ **No requiere dependencias**: solo un archivo `.css` y un archivo `.js`.
- ✅ **Es reutilizable**: cambia el arreglo de datos y obtienes otro carrusel completamente distinto.

---

## 🧩 Componentes incluidos

| Componente | Método | Descripción |
|---|---|---|
| 🎠 Carrusel | `UIComponents.initAnimalCarousel()` | Genera las diapositivas desde un arreglo de datos, con botones anterior/siguiente, bucle infinito y callback al cambiar de slide. |
| 📊 Barra de progreso | `UIComponents.animateProgressBar()` | Anima una barra desde 0 % hasta el valor indicado y actualiza su texto y su etiqueta. |

---

## 📁 Estructura del proyecto

```text
Actividad3/
├── css/
│   ├── componente.css   ← estilos de la librería (obligatorio)
│   └── estilo.css       ← estilos de la página de demostración (opcional)
├── img/
│   ├── capibara.jpg
│   ├── gato.jpg
│   ├── mapache.jpg
│   └── perro.jpg
├── js/
│   ├── componente.js    ← la librería UIComponents (obligatorio)
│   └── main.js          ← código de la demostración (opcional)
├── index.html           ← página de demostración
└── README.md
```

> Solo necesitas **`css/componente.css`** y **`js/componente.js`** para usar la librería. `estilo.css` y `main.js` pertenecen a la demo.

---

## ⚙️ Instalación

### 1. Descarga o clona el repositorio

```bash
git clone https://github.com/<tu-usuario>/<tu-repositorio>.git
```

O bien descarga el `.zip` desde GitHub y descomprímelo.

### 2. Copia los archivos a tu proyecto

Copia estos dos archivos dentro de tu proyecto:

```text
css/componente.css
js/componente.js
```

### 3. Incluye el CSS y el JS en tu HTML

Agrega el CSS dentro de `<head>` y el JS **al final del `<body>`**, antes de tu propio script:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi proyecto</title>

    <!-- 1. Estilos de la librería -->
    <link rel="stylesheet" href="css/componente.css">
</head>
<body>

    <!-- Aquí va el HTML de tus componentes -->

    <!-- 2. Librería (siempre ANTES de tu propio script) -->
    <script src="js/componente.js"></script>

    <!-- 3. Tu código que usa la librería -->
    <script src="js/main.js"></script>
</body>
</html>
```

> ⚠️ **El orden importa.** `componente.js` debe cargarse antes que tu script, de lo contrario `UIComponents` no estará definido.

---

## 🚀 Uso

### 1. Carrusel: `initAnimalCarousel()`

#### Paso 1 — Agrega el HTML base

El carrusel necesita esta estructura mínima. El `<ul>` del track queda **vacío**: las diapositivas las genera la librería.

```html
<div class="ui-carousel" id="animalCarousel">
    <button class="ui-carousel-btn ui-carousel-prev">&#10094;</button>

    <div class="ui-carousel-track-container">
        <ul class="ui-carousel-track" id="carouselTrack"></ul>
    </div>

    <button class="ui-carousel-btn ui-carousel-next">&#10095;</button>
</div>
```

#### Paso 2 — Define tus datos

Cada objeto del arreglo representa una diapositiva. Los campos **`img`** y **`caption`** son los que usa el carrusel; puedes añadir los campos extra que necesites.

```javascript
const animals = [
    { img: "img/mapache.jpg",  caption: "Mapache" },
    { img: "img/gato.jpg",     caption: "Gatito" },
    { img: "img/perro.jpg",    caption: "Perro" },
    { img: "img/capibara.jpg", caption: "Capibara" }
];
```

#### Paso 3 — Inicializa el componente

```javascript
document.addEventListener('DOMContentLoaded', () => {
    UIComponents.initAnimalCarousel('#animalCarousel', animals);
});
```

Con esas tres piezas ya tienes un carrusel funcional con botones **‹ ›** y navegación en bucle.

#### Paso 4 (opcional) — Reacciona al cambio de diapositiva

El tercer parámetro es un *callback* que recibe **el objeto completo** de la diapositiva actual. Se ejecuta una vez al iniciar (con la primera diapositiva) y cada vez que el usuario avanza o retrocede.

```javascript
UIComponents.initAnimalCarousel('#animalCarousel', animals, (animalActual) => {
    console.log('Ahora se muestra:', animalActual.caption);
});
```

---

### 2. Barra de progreso: `animateProgressBar()`

#### Paso 1 — Agrega el HTML base

```html
<div class="ui-progress-wrapper">
    <div class="ui-progress-info">
        <span id="labelStat1">Agilidad / Velocidad</span>
        <span id="textStat1">0%</span>
    </div>
    <div class="ui-progress-bar-container">
        <div class="ui-progress-bar" id="barStat1"></div>
    </div>
</div>
```

#### Paso 2 — Anímala desde JavaScript

```javascript
UIComponents.animateProgressBar(
    '#barStat1',        // barra que se va a rellenar
    70,                 // porcentaje (0 a 100)
    '#textStat1',       // elemento donde se escribe el valor
    '25 km/h',          // texto del valor
    '#labelStat1',      // elemento con el nombre de la estadística
    'Agilidad / Velocidad' // nuevo nombre (opcional)
);
```

La barra se reinicia a `0%` y luego crece con una transición suave hasta el valor indicado.

---

### 3. Carrusel + barras sincronizados (ejemplo completo)

Este es el ejemplo de la demostración: al cambiar de animal, las dos barras de estadísticas se actualizan automáticamente con los datos del animal actual.

**`index.html`**

```html
<div class="ui-carousel" id="animalCarousel">
    <button class="ui-carousel-btn ui-carousel-prev">&#10094;</button>
    <div class="ui-carousel-track-container">
        <ul class="ui-carousel-track" id="carouselTrack"></ul>
    </div>
    <button class="ui-carousel-btn ui-carousel-next">&#10095;</button>
</div>

<div class="ui-progress-wrapper">
    <div class="ui-progress-info">
        <span id="labelStat1">Agilidad / Velocidad</span>
        <span id="textStat1">0%</span>
    </div>
    <div class="ui-progress-bar-container">
        <div class="ui-progress-bar" id="barStat1"></div>
    </div>
</div>

<div class="ui-progress-wrapper">
    <div class="ui-progress-info">
        <span id="labelStat2">Esperanza de Vida</span>
        <span id="textStat2">0%</span>
    </div>
    <div class="ui-progress-bar-container">
        <div class="ui-progress-bar" id="barStat2"></div>
    </div>
</div>
```

**`js/main.js`**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const animals = [
        {
            img: "img/mapache.jpg",
            caption: "Mapache",
            stat1Label: "Agilidad / Velocidad", stat1Val: 70, stat1Text: "25 km/h",
            stat2Label: "Esperanza de Vida",    stat2Val: 50, stat2Text: "3 a 5 años"
        },
        {
            img: "img/gato.jpg",
            caption: "Gatito",
            stat1Label: "Agilidad / Velocidad", stat1Val: 90, stat1Text: "48 km/h",
            stat2Label: "Esperanza de Vida",    stat2Val: 80, stat2Text: "12 a 15 años"
        },
        {
            img: "img/perro.jpg",
            caption: "Perro",
            stat1Label: "Agilidad / Velocidad", stat1Val: 75, stat1Text: "40 km/h",
            stat2Label: "Esperanza de Vida",    stat2Val: 70, stat2Text: "10 a 13 años"
        },
        {
            img: "img/capibara.jpg",
            caption: "Capibara relajado y descansando",
            stat1Label: "Velocidad en el Agua", stat1Val: 60, stat1Text: "35 km/h",
            stat2Label: "Esperanza de Vida",    stat2Val: 85, stat2Text: "8 a 10 años"
        }
    ];

    UIComponents.initAnimalCarousel('#animalCarousel', animals, (currentAnimal) => {
        UIComponents.animateProgressBar(
            '#barStat1',
            currentAnimal.stat1Val,
            '#textStat1',
            currentAnimal.stat1Text,
            '#labelStat1',
            currentAnimal.stat1Label
        );

        UIComponents.animateProgressBar(
            '#barStat2',
            currentAnimal.stat2Val,
            '#textStat2',
            currentAnimal.stat2Text,
            '#labelStat2',
            currentAnimal.stat2Label
        );
    });
});
```

**Resultado:** cada clic en **‹** o **›** desliza la imagen, y las barras vuelven a cero y se llenan con los valores del nuevo animal, mostrando también su texto (`25 km/h`, `3 a 5 años`, etc.).

---

### 4. Reutilización con otro contenido

El mismo componente sirve para cualquier tema; solo cambia los datos. Por ejemplo, un carrusel de **destinos turísticos** con una sola barra de "popularidad":

```html
<div class="ui-carousel" id="destinosCarousel">
    <button class="ui-carousel-btn ui-carousel-prev">&#10094;</button>
    <div class="ui-carousel-track-container">
        <ul class="ui-carousel-track"></ul>
    </div>
    <button class="ui-carousel-btn ui-carousel-next">&#10095;</button>
</div>

<div class="ui-progress-wrapper">
    <div class="ui-progress-info">
        <span id="etiquetaPop">Popularidad</span>
        <span id="textoPop">0%</span>
    </div>
    <div class="ui-progress-bar-container">
        <div class="ui-progress-bar" id="barraPop"></div>
    </div>
</div>
```

```javascript
const destinos = [
    { img: "img/monte-alban.jpg", caption: "Monte Albán",       popularidad: 92 },
    { img: "img/hierve.jpg",      caption: "Hierve el Agua",    popularidad: 85 },
    { img: "img/zipolite.jpg",    caption: "Playa Zipolite",    popularidad: 78 }
];

UIComponents.initAnimalCarousel('#destinosCarousel', destinos, (destino) => {
    UIComponents.animateProgressBar(
        '#barraPop',
        destino.popularidad,
        '#textoPop',
        destino.popularidad + '%'
    );
});
```

> Puedes tener **varios carruseles en la misma página** siempre que cada uno tenga un `id` distinto y lo pases como selector.

---

## 📖 Referencia de la API

### `UIComponents.initAnimalCarousel(carouselSelector, animalsData, onSlideChange)`

| Parámetro | Tipo | Requerido | Descripción |
|---|---|:---:|---|
| `carouselSelector` | `string` | ✅ | Selector CSS del contenedor `.ui-carousel` (ej. `'#animalCarousel'`). Si no existe, la función no hace nada. |
| `animalsData` | `Array<Object>` | ✅ | Arreglo de objetos, uno por diapositiva. Cada objeto debe tener `img` (ruta de la imagen) y `caption` (texto que aparece sobre la imagen y como `alt`). |
| `onSlideChange` | `function(Object)` | ❌ | Se ejecuta al iniciar y en cada cambio de diapositiva. Recibe el objeto de datos de la diapositiva actual. |

**Comportamiento:** limpia el `<ul>` del track, crea un `<li>` por cada elemento, activa los botones anterior/siguiente con navegación circular y muestra la primera diapositiva.

---

### `UIComponents.animateProgressBar(barSelector, percentage, labelTextSelector, textValue, labelNameSelector, newLabelName)`

| Parámetro | Tipo | Requerido | Descripción |
|---|---|:---:|---|
| `barSelector` | `string` | ✅ | Selector CSS de la barra `.ui-progress-bar` que se rellena. |
| `percentage` | `number` | ✅ | Ancho final de la barra, de `0` a `100`. |
| `labelTextSelector` | `string` | ❌ | Selector del elemento donde se escribe el valor (ej. `'25 km/h'`). |
| `textValue` | `string` | ❌ | Texto a mostrar en `labelTextSelector`. |
| `labelNameSelector` | `string` | ❌ | Selector del elemento con el nombre de la estadística. |
| `newLabelName` | `string` | ❌ | Nuevo nombre para `labelNameSelector`. Si se omite, la etiqueta no cambia. |

**Comportamiento:** pone la barra en `0%`, espera 50 ms y la lleva al porcentaje indicado con la transición definida en CSS.

---

### Clases CSS disponibles

| Clase | Elemento |
|---|---|
| `.ui-carousel` | Contenedor principal del carrusel |
| `.ui-carousel-track-container` | Ventana visible del carrusel (altura fija) |
| `.ui-carousel-track` | Lista `<ul>` que se desplaza horizontalmente |
| `.ui-carousel-slide` | Cada diapositiva (generada por JS) |
| `.ui-carousel-caption` | Texto inferior sobre la imagen (generado por JS) |
| `.ui-carousel-btn`, `.ui-carousel-prev`, `.ui-carousel-next` | Botones de navegación |
| `.ui-progress-wrapper` | Contenedor de una barra con su etiqueta |
| `.ui-progress-info` | Fila con nombre y valor |
| `.ui-progress-bar-container` | Riel gris de la barra |
| `.ui-progress-bar` | Relleno animado |

---

## 🎨 Personalización

Todo el estilo vive en `css/componente.css`, así que puedes sobrescribirlo desde tu propia hoja de estilos (cárgala **después** de `componente.css`).

**Cambiar la altura del carrusel:**

```css
.ui-carousel-track-container {
    height: 250px;
}
```

**Cambiar el color y la velocidad de la barra de progreso:**

```css
.ui-progress-bar {
    background: #22c55e;            /* verde */
    transition: width 0.6s ease-out; /* más rápida */
}
```

**Cambiar el fondo y las esquinas del carrusel:**

```css
.ui-carousel {
    background: #1e293b;
    border-radius: 24px;
}
```

---

## 🛠️ Tecnologías

- **HTML5**
- **CSS3** (Flexbox, transiciones, variables CSS)
- **JavaScript ES6+** (clases, métodos estáticos, *arrow functions*, template literals)

Sin frameworks ni dependencias externas.

---

## 📜 Licencia

Proyecto académico desarrollado con fines educativos.
