/**
@author Armando Rojas <armando.develop@gmail.com>
@github rojasarmando
*/

export class Sopatizador {
  abc: any[];
  availability: any[];
  position: any[];
  alphabet_soup: any[];
  private n: number;
  private m: number;
  // inicializa el array del ABC
  constructor(m = 12, n = 12) {
    this.abc = [];

    // disponibilidad de positions en la tabla
    this.availability = [];
    this.position = [];

    this.alphabet_soup = [];

    this.n = n;
    this.m = m;

    this._initAbc();

    this._initTable(m, n);
  }

  // devuelve la sopa de letras
  getalphabet_soup() {
    return this.alphabet_soup;
  }

  // agregar una palabra a la sopa de letras

  addalphabet_soup(text: string) {
    let control = false;

    while (!control) {
      let position = this.generatorOfPositions(text.length);

      if (this.verifyAvailability(position)) {
        control = true;

        this.assignSpace(text, position);
      }
    }
  }

  // genera un objecto de positions para ser usados posteriormente
  generatorOfPositions(size: number) {
    let control = false;
    let positions = [];

    while (!control) {
      let orientacion = this._random(1, 8);

      let posX = this._random(0, this.n - 1);
      let posY = this._random(0, this.m - 1);

      positions[0] = { x: posX, y: posY };

      for (let i = 1; i < size; i++) {
        switch (orientacion) {
          case 1: // horizontal hacia la derecha
            positions[i] = { x: ++posX, y: posY };

            break; //case 1

          case 2: // horizontal hacia la izquierda
            positions[i] = { x: --posX, y: posY };

            break; //case 2

          case 3: // vertical hacia arriba
            positions[i] = { x: posX, y: ++posY };

            break; //case 3

          case 4: // vertical hacia arriba
            positions[i] = { x: posX, y: --posY };

            break; //case 4

          case 5: // diagonal descendente hacia la derecha
            positions[i] = { x: ++posX, y: ++posY };

            break;

          case 6: // diagonal ascendente hacia la izquierda
            positions[i] = { x: --posX, y: --posY };

            break;

          case 7: // diagonal descendente hacia la izquierda
            positions[i] = { x: ++posX, y: --posY };

            break;

          case 8: // diagonal ascendente hacia la derecha
            positions[i] = { x: --posX, y: ++posY };

            break;
        } //switch
      } //for

      if (
        positions[positions.length - 1].y < this.m &&
        positions[positions.length - 1].x < this.n &&
        positions[positions.length - 1].y > -1 &&
        positions[positions.length - 1].x > -1
      ) {
        control = true;
      } // if
    } // while

    return positions;
  }

  //asignar espacion dentro del array dispònibilidad y dentro de el array tabla
  assignSpace(text: string, positions: string | any[]) {
    for (let i = 0; i < positions.length; i++) {
      // obtener puntos x & y
      let x = positions[i].x;
      let y = positions[i].y;

      // quitar disponibilidad al espacio
      this.availability[y][x] = false;

      // asignar la letra de la palabra
      this.alphabet_soup[y][x] = { text: text[i], decorar: true };
    }
  }

  //verifica si se encuentra disponible el espacio en la matriz
  verifyAvailability(positions: any[]): boolean {
    let control: boolean = true;

    for (let i = 0; i < positions.length; i++) {
      let x = positions[i].x;
      let y = positions[i].y;

      if (!this.availability[y][x]) control = false;
    }

    return control;
  }

  //obtener un array bidimencional de letras al azar
  // m es el numero de columnas
  // n el numero de filas
  private _initTable(m: number, n: number) {
    let array: any = [];

    for (let i = 0; i < m; i++) {
      array[i] = [];
      this.availability[i] = [];

      for (let k = 0; k < n; k++) {
        array[i][k] = { text: this.getLetter(), decorar: false };
        this.availability[i][k] = true;
      }
    }

    this.alphabet_soup = array;
  }

  //obtener una letra del ABC aleatoriamente
  getLetter(): String {
    return this.abc[this._random(0, 24)];
  }

  // funcion para obtener numeros aleatorios
  private _random(inferior: number, superior: number): number {
    let numPosibilidades = superior - inferior;

    let aleat = Math.random() * numPosibilidades;
    aleat = Math.round(aleat);

    return inferior + aleat;
  }

  //funcion para obtener el abc en un array
  private _initAbc() {
    let i = 0;

    this.abc[i] = 'A';
    this.abc[++i] = 'B';
    this.abc[++i] = 'C';
    this.abc[++i] = 'D';
    this.abc[++i] = 'E';
    this.abc[++i] = 'F';
    this.abc[++i] = 'G';
    this.abc[++i] = 'H';
    this.abc[++i] = 'I';
    this.abc[++i] = 'J';
    this.abc[++i] = 'K';
    this.abc[++i] = 'L';
    this.abc[++i] = 'M';
    this.abc[++i] = 'N';
    this.abc[++i] = 'Ñ';
    this.abc[++i] = 'O';
    this.abc[++i] = 'P';
    this.abc[++i] = 'Q';
    this.abc[++i] = 'R';
    this.abc[++i] = 'S';
    this.abc[++i] = 'T';
    this.abc[++i] = 'U';
    this.abc[++i] = 'V';
    this.abc[++i] = 'W';
    this.abc[++i] = 'X';
    this.abc[++i] = 'Y';
    this.abc[++i] = 'Z';
  }
}
