import { Cell } from "./types/cell";
import { Position } from "./types/position";

export class Sopatizador {
  private readonly abc: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  private alphabetSoup: Cell[][];
  private readonly width: number;
  private readonly height: number;

  constructor(width = 12, height = 12) {
    this.width = width;
    this.height = height;
    this.alphabetSoup = [];
    
    this.initializeAlphabetSoup();
  }

  getAlphabetSoup(): Cell[][] {
    return this.alphabetSoup;
  }

  addWord(word: string): void {
    const upperWord = word.toUpperCase();
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      const positions = this.generatePositions(upperWord.length);
      
      if (this.canPlaceWord(upperWord, positions)) {
        this.placeWord(upperWord, positions);
        return;
      }
      
      attempts++;
    }

    throw new Error(`No se pudo colocar la palabra "${word}" después de ${maxAttempts} intentos`);
  }

  public generatePositions(size: number): Position[] {
    const directions = [
      (x: number, y: number, i: number) => ({ x: x + i, y }),      // Derecha
      (x: number, y: number, i: number) => ({ x: x - i, y }),      // Izquierda
      (x: number, y: number, i: number) => ({ x, y: y + i }),      // Abajo
      (x: number, y: number, i: number) => ({ x, y: y - i }),      // Arriba
      (x: number, y: number, i: number) => ({ x: x + i, y: y + i }), // Diagonal inferior derecha
      (x: number, y: number, i: number) => ({ x: x - i, y: y - i }), // Diagonal superior izquierda
      (x: number, y: number, i: number) => ({ x: x + i, y: y - i }), // Diagonal superior derecha
      (x: number, y: number, i: number) => ({ x: x - i, y: y + i })  // Diagonal inferior izquierda
    ];

    let positions: Position[] = [];
    let isValid = false;

    while (!isValid) {
      const startX = this.getRandomInt(0, this.width - 1);
      const startY = this.getRandomInt(0, this.height - 1);
      const direction = this.getRandomInt(0, directions.length - 1);

      positions = Array.from({ length: size }, (_, i) => 
        directions[direction](startX, startY, i)
      );

      // Verificar que todas las posiciones estén dentro de los límites
      isValid = positions.every(pos => 
        pos.x >= 0 && pos.x < this.width && 
        pos.y >= 0 && pos.y < this.height
      );
    }

    return positions;
  }

  private canPlaceWord(word: string, positions: Position[]): boolean {
    for (let i = 0; i < positions.length; i++) {
      const { x, y } = positions[i];
      const cell = this.alphabetSoup[y][x];
      
      // Si la celda ya tiene una letra y no coincide con la palabra actual
      if (cell.decorate && cell.text !== word[i]) {
        return false;
      }
    }
    return true;
  }

  private placeWord(word: string, positions: Position[]): void {
    for (let i = 0; i < positions.length; i++) {
      const { x, y } = positions[i];
      this.alphabetSoup[y][x] = { 
        text: word[i], 
        decorate: true 
      };
    }
  }

  private initializeAlphabetSoup(): void {
    for (let y = 0; y < this.height; y++) {
      this.alphabetSoup[y] = [];
      
      for (let x = 0; x < this.width; x++) {
        this.alphabetSoup[y][x] = { 
          text: this.getRandomLetter(), 
          decorate: false 
        };
      }
    }
  }

  private getRandomLetter(): string {
    return this.abc[this.getRandomInt(0, this.abc.length - 1)];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}