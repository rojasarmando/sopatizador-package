# Sopatizador 🧩🔍

[![npm version](https://img.shields.io/npm/v/sopatizador.svg?style=flat-square)](https://www.npmjs.com/package/sopatizador)
[![License](https://img.shields.io/npm/l/sopatizador.svg?style=flat-square)](https://github.com/rojasarmando/sopatizador/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rojasarmando/sopatizador.svg?style=social)](https://github.com/rojasarmando/sopatizador)

Generador avanzado de sopas de letras en TypeScript para Node.js y navegadores, con soporte para cruce inteligente de palabras.

## Características ✨

- ✅ Generación de sopas de letras con dimensiones personalizables
- ✅ Colocación inteligente de palabras (horizontal, vertical y diagonal)
- ✅ Cruce de palabras cuando las letras coinciden
- ✅ Generación de letras aleatorias para espacios vacíos
- ✅ Totalmente escrito en TypeScript
- ✅ Configuración flexible y fácil de usar

## Instalación

```bash
npm install sopatizador
# o
yarn add sopatizador
```

## Uso básico

```typescript
import { Sopatizador } from 'sopatizador';

// Crear una sopa de letras 15x15
const sopatizador = new Sopatizador(15, 15);

// Agregar palabras
sopatizador.addWord("JAVASCRIPT");
sopatizador.addWord("TYPESCRIPT");
sopatizador.addWord("NODEJS");

// Obtener la sopa de letras generada
const sopaDeLetras = sopatizador.getAlphabetSoup();

// Imprimir la sopa de letras
sopaDeLetras.forEach(fila => {
  console.log(fila.map(celda => celda.text).join(' '));
});
```

## API

### `Sopatizador(width: number = 12, height: number = 12)`
Constructor que crea una nueva instancia del generador.

### `addWord(word: string): void`
Agrega una palabra a la sopa de letras.

### `getAlphabetSoup(): Cell[][]`
Devuelve la sopa de letras generada como matriz bidimensional.

## Tipos

```typescript
interface Cell {
  text: string;    // Letra de la celda
  decorate: boolean; // Indica si es parte de una palabra
}

interface Position {
  x: number;       // Posición horizontal (columna)
  y: number;       // Posición vertical (fila)
}
```

## Ejemplo avanzado

```typescript
import { Sopatizador } from 'sopatizador';

// Crear una sopa de letras 20x20
const sopa = new Sopatizador(20, 20);

// Lista de palabras para incluir
const palabrasTecnologia = [
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "ANGULAR",
  "VUE",
  "NODEJS",
  "EXPRESS",
  "MONGODB",
  "WEBSOCKET",
  "GRAPHQL"
];

// Agregar todas las palabras
palabrasTecnologia.forEach(palabra => {
  try {
    sopa.addWord(palabra);
  } catch (error) {
    console.error(`No se pudo agregar: ${palabra}`);
  }
});

// Función para imprimir la sopa de letras
function imprimirSopa(sopa: Cell[][]) {
  console.log('\nSOPA DE LETRAS:\n');
  sopa.forEach(fila => {
    console.log(fila.map(c => c.decorate ? `[${c.text}]` : ` ${c.text} `).join(''));
  });
  console.log('\nPalabras incluidas:', palabrasTecnologia.join(', '));
}

imprimirSopa(sopa.getAlphabetSoup());
```

## Contribuciones 🛠️

Las contribuciones son bienvenidas. Sigue estos pasos:

1. Haz fork del proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia 📄

MIT © [Armando Rojas](https://github.com/rojasarmando)

## Contacto 📧

- GitHub: [@rojasarmando](https://github.com/rojasarmando)
- LinkedIn: [Armando Rojas](https://www.linkedin.com/in/rojasarmando)
- Email: [armando.develop@gmail.com](mailto:armando.develop@gmail.com)

---

✨ ¡Diviértete generando sopas de letras! ✨